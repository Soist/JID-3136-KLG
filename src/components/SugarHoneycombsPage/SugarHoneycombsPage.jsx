import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SugarHoneycombsPage.css';
import winOverlay from './resources/win_honeycombs.png';
import loseOverlay from './resources/lose_honeycombs.png';
import startOverlay from './resources/honeycombs.png';
import gameoverWinOverlay from './resources/win.png'
import gameoverLoseOverlay from './resources/lose.png'
import backgroundImg from './resources/test8.png';
import gameoverImg from './resources/win_background.png'
import {getProgress} from "../../ProgressDummyData";
import { getQuestionAnswer } from '../../listeningData';
import {LISTEN_OPTIONS_PATH} from '../../constants';
import { ReactComponent as CircleSvg } from '../../SharedImages/Circle.svg'
import { ReactComponent as SkullSvg } from '../../SharedImages/Skull.svg'

// SugarHoneycombsPage function is a React component.
// JSX Rendering & Event handling: returned JSX defines the structure and appearance of the UI and event handlers such as 
// onClick and  onKeyDown that are defined to specify what functions/methods should be called: startGame(), submitAnswer() 
// And within these methods: startGame(), submitAnswer(), user inputs are accessed/modified by using document with input 
// id. ***Therefore, there is a separation of user input tracking between JSX and methods***, where the former focus on 
// clicked button or pressed enter key, while the later focus on value inputted
// The intuition is JSX always delegate jobs to methods.



function ScoreView() {
    return (
        <>
            <CircleSvg />
            <SkullSvg />
        </>
    );
}

//features to complete: load different questions set based on locaiton

function SugarHoneycombsPage() {
    const EASY_QUESTION_RESPONSE_TIME = 100000;
    const MEDIUM_QUESTION_RESPONSE_TIME = 8000;
    const HARD_QUESTION_RESPONSE_TIME = 5000;

    const location = useLocation();
    const unit = location.state; //this unit is not a int causing problems when indexing

    // useState() hook from React used to initialize the component's state object, 
    // here useState is called with an object{} having currentOverlay propery initailized with startOverlay, and etc.
    const [state, setState] = useState({
        currentOverlay: startOverlay,
        gameoverOverlay: gameoverWinOverlay,
        radioButton: null, 
    });
    // state is a variable that holds the current state. You can access the values in the state by using 
    // state.currentOverlay.listening
    // setState is a function that you can call to update the state. When you call setState, 
    // you pass in a new object that will update the current state.

    const [remainingTime, setRemainingTime] = useState(0);
    const [questionResponseTime, setQuestionResponseTime] = useState(0);

    const handleOptionChange = (event) => {
        setState({ ...state, radioButton: event.target.value});
    };

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showCorrectMessage, setCorrectMessage] = useState(false);
    
    const [audios, setAudios] = useState([])

    const [currentBackground, setCurrentBackground] = useState(backgroundImg);
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [currIncorrectScore, setCurrIncorrectScore] = useState(0);

    
    const total_questions = 4
    const question_answer = getQuestionAnswer(unit.number)

    let choices_array = [];
    for (let i = 1; i <= total_questions; i++) {
        choices_array.push(question_answer[`question${i}`]);
    }
    const answers = getQuestionAnswer(unit.number)['answers'];
    const [gameIsEnded, setGameIsEnded] = useState(false);

    
    // The useEffect hook is used in React to perform side effects in function components. 
    // Side effects could be data-fetching, subscriptions, manual DOM manipulations, and so on.
    // Here it pre-loads the audio after the inital render to be ready to play as soon as needed
    useEffect(() => {
        const loadAudio = (num) => {
            //put audio files in the public folder to access them directly via the path 
            const src = `/audios/listening/${unit.number}-${num}.m4a`; // Using template literal here, `` instead of ''
            const audio = new Audio(src);
            return audio;
        };
        
        let loadedAudios = [];

        for (let i = 0; i < 4; i++) {
            const audio = loadAudio(i+1);
            loadedAudios.push(audio);
        }

        setAudios(loadedAudios);
        //// Remove an element from the array will shorten the length of the array, 
        //// Hence mess up the indexing for the loop
        // for (let i=0; i<koreanParts.length; i++) {
        //     const audio = loadAudio(koreanParts[i]);
        //     if (audio === null) {
        //         koreanParts.pop(i)
        //         englishParts.pop(i)
        //         total_questions--
        //     }
        //     loadedAudios.push(audio);
        // }
        // for (let i = 0; i < koreanParts.length; i++) {
        //     const audio = loadAudio(koreanParts[i]);
        //     loadedAudios.push(audio);
        // }    
        //// Now, let's filter out the null/non-existing audios and corresponding koreanParts and englishParts
        // koreanParts = koreanParts.filter((_, index) => loadedAudios[index] !== null);
        // englishParts = englishParts.filter((_, index) => loadedAudios[index] !== null);
        // loadedAudios = loadedAudios.filter(audio => audio !== null);
    }, []);

    
    

    const playSound = (number) => {
        // ?. is called the optional chaining operator. This operator allows you to access the properties of objects 
        // without worry about if the object is null or undefined. 
        // If audios[number - 1] is null or undefined, the optional chaining operator 
        // will prevent a runtime error from occurring by not calling the play() method,
        // and the expression will return undefined instead.
        audios[number]?.play();
    };

    
    function playAgain() {
        setState({...state, radioButton: ''});
        setCurrIncorrectScore(0)
        setCurrentQuestionId(0)
        document.getElementById("pregame").style.display = "flex";
        document.getElementById("game").style.display = "none";
        document.getElementById("postgame").style.display = "none";
        document.getElementById('win-text').style.display = 'none';
        document.getElementById('lose-text').style.display = 'none';
    }
    // function pre_start_Game() { // delay rendering when unit is changed so no overflow 
    //     setTimeout(() => {
    //         startGame()
    //     }, 1500)
    // }
    function startGame() {
        if (isInitializing) {
            return;
        }
        const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        let initialQuestionResponseTime;
        if (difficulty === "easy") {
            initialQuestionResponseTime = EASY_QUESTION_RESPONSE_TIME;
        } else if (difficulty === "medium") {
            initialQuestionResponseTime = MEDIUM_QUESTION_RESPONSE_TIME;
        } else {
            initialQuestionResponseTime = HARD_QUESTION_RESPONSE_TIME;
        }
        setQuestionResponseTime(initialQuestionResponseTime);
        setRemainingTime(questionResponseTime);
        setCurrentQuestionId(0);
        setCurrIncorrectScore(0);
        setGameIsEnded(false);
        setCurrentBackground(backgroundImg)
        setState({ ...state, currentOverlay: startOverlay, gameoverOverlay: gameoverWinOverlay, radioButton: ''});

        document.getElementById('game').style.display = 'flex';
        document.getElementById('overlay-image').style.display = 'flex';
        document.getElementById('pregame').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('tutorial').style.display = 'none';
        
        for (let i = 0; i < 3; i++) {
            document.getElementById("score-view").childNodes[i].classList.remove("red");
        }
    }
    


    

    useEffect(() => {
        if (currIncorrectScore >= 2) {
            lose()
        }
        if (currIncorrectScore >= 2 && currentQuestionId >= 4) {
            lose()
        }
        if (currentQuestionId >= 4 && currIncorrectScore < 2) {
            win()
        }
    }, [currIncorrectScore, currentQuestionId]);
    function lose() {
        setCurrIncorrectScore(0)
        setCurrentQuestionId(0)
        setGameIsEnded(true)
        document.getElementById('overlay-image').style.display = 'none';
        document.getElementById('pregame').style.display = 'none';
        document.getElementById('game').style.display = 'none';
        document.getElementById('tutorial').style.display = 'none';
        setCurrentBackground(gameoverImg)
        setState({...state, gameoverOverlay: gameoverLoseOverlay, radioButton: ''})
        document.getElementById('postgame').style.display = 'flex';
        document.getElementById('lose-text').style.display = 'flex';
        document.getElementById('win-text').style.display = 'none';
    }
    function win() {
        setCurrIncorrectScore(0)
        setCurrentQuestionId(0)
        setGameIsEnded(true)
        document.getElementById('overlay-image').style.display = 'none';
        document.getElementById('pregame').style.display = 'none';
        document.getElementById('game').style.display = 'none';
        document.getElementById('tutorial').style.display = 'none';
        setCurrentBackground(gameoverImg)
        setState({...state, gameoverOverlay: gameoverWinOverlay, radioButton: ''})
        document.getElementById('postgame').style.display = 'flex';
        document.getElementById('win-text').style.display = 'flex';
        document.getElementById('lose-text').style.display = 'none';
    }






    const [remainingTimeIsZero, setRemainingTimeIsZero] = useState(false);
    useEffect(() => {   // this hook starts a timer whenever question index changed
        if (gameIsEnded || currentQuestionId >= 4) {
            return;
        }
        setRemainingTimeIsZero(false)
        let timer;
        const startTimer = () => {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
            }, 1000);};
        startTimer();
        return () => { // If any of the dependencies change, React first runs the cleanup function from the previous effect before running the effect again.
            clearInterval(timer);
        }
    }, [currentQuestionId]);
    useEffect(() => { // intermediate hook
        if (remainingTime === 0) {
            setRemainingTimeIsZero(true)
        }
    }, [remainingTime]);
    useEffect(() => {  // this hook counting wrong whenever a ongoing timer becomes zero
        if (remainingTimeIsZero === true) {
            wrong_submission();
        }
    }, [remainingTimeIsZero]);
                        // Let's thing about some edge cases: in the last question id 3 (correspond toquestion 4) when answered, 
                        // current question id becomes 4 and will be deteced by a hook which will run win, but since the  
                        // question id is changed, there is a lingering timer started for the non-existing question 5
                        // question 5, and when that timer expires it will trigger wrong submission which then trigger a new timer
                        // that's why we can see some component still change after the even when the screen  
                        // is already directly to the gameover page, luckily we already setup cleanup function previously 
                        // in the timer to make sure this error doesn't spread when question id is changed again
                        // however it's still possible to trigger wrong submission on question 5, despite we have 
                        // if (currIncorrectScore >= 3) {lose()} where current question id is set to 0, it seems there
                        // is a time lap delay, to fix this we add 
                        // - an additional condition to the thrid hook
                        // - an condiation to the first hook
                        // update: also found there wrong submission is triggered when swiching units, wrong submission
                        // is controlled by submitAnser and this hook in this case should be due to the remainingTime
                        // we can add a useEffect hook to track change in location too
    const [isInitializing, setIsInitializing] = useState(false);
    useEffect(() => {
        setIsInitializing(true);
        document.getElementById("initialization_msg").style.display = "flex";
    
        const timer = setTimeout(() => {
            setIsInitializing(false);
            document.getElementById("initialization_msg").style.display = "none";
        }, 2000);
    
        return () => clearTimeout(timer);
    }, [unit])





    function next_question() {
        setCurrentQuestionId(currentQuestionId + 1);
        setRemainingTime(questionResponseTime);
    }
    function correct_submission() {
        getProgress(unit.number)[0].sugar++
        document.getElementById('question').style.display = 'none'; // Hide all elements/ids in the question container in JSX
        document.getElementById('audio-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'none'; // Add an id to the class button to make this work!
        // set display: none; on an element, it is completely removed from the document flow. 
        // Then, setting it back to display: flex; reintroduces it
        // Use visibility Instead of display
        document.getElementById('choices').style.visibility = 'hidden';
        setCorrectMessage(true); // Show the correct message
        setState({ ...state, currentOverlay: winOverlay, radioButton: ''}); // Updates the state and the displayed image to a winning overlay
        // Set a timeout to hide the error message after 1 seconds (1000 milliseconds)
        // () => {} arrow function, left put parameters, right put function code
        // In JavaScript, setTimeout is an asynchronous function, meaning it runs independently of the main thread of execution.
        // When you call setTimeout, it schedules the provided function to run after the specified delay, 
        // but the main thread continues executing the next lines of code immediately without waiting for the timeout to complete.
        setTimeout(() => {
            document.getElementById('question').style.display = 'flex';
            document.getElementById('audio-btn').style.display = 'flex';
            document.getElementById('submit-btn').style.display = 'flex';
            document.getElementById('choices').style.visibility = 'visible';
            setCorrectMessage(false)
            setState({ ...state, currentOverlay: startOverlay, radioButton: ''});
            next_question();
        }, 1000);
    }
    function wrong_submission() {
        document.getElementById('score-view').childNodes[currIncorrectScore].classList.add('red');
        document.getElementById('question').style.display = 'none'; 
        document.getElementById('audio-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'none';
        document.getElementById('choices').style.visibility = 'hidden';
        setShowErrorMessage(true); 
        setState({ ...state, currentOverlay: loseOverlay, radioButton: ''});
        setTimeout(() => {
            document.getElementById('question').style.display = 'flex';
            document.getElementById('audio-btn').style.display = 'flex';
            document.getElementById('submit-btn').style.display = 'flex';
            document.getElementById('choices').style.visibility = 'visible';
            setShowErrorMessage(false);
            // using the spread operator (...) to take all existing state properties and their values 
            // and spread them into the new state object. it keeps the existing state unchanged
            setState({ ...state, currentOverlay: startOverlay, radioButton: ''});
            setCurrIncorrectScore(currIncorrectScore + 1);
            next_question();
        }, 2500);
    }
    function submitAnswer() {
        // Submission Value Acquisition and Modification:
        // Fetches the value inputted in the HTML element with the ID 'answer-input', 
        // converts it to lowercase, and stores it in the variable submission.
        const submission = document.querySelector('input[name="multi_choice"]:checked').value;
        // const submission = document.getElementById('answer-input').value.toLowerCase();
        // document.getElementById('answer-input') This part targets and accesses an HTML element on the webpage.
        // Explanation: document refers to the webpage .getElementById('answer-input') fetches the HTML element that has 
        // an id attribute of 'answer-input' and .value retrieves the value/content from the targeted element.

        // This function takes a unit.number (current location.state) as an argument and 
        // returns the corresponding progress data from the DummyProgress object. 
        // The DummyProgress object is a dictionary (not Primitive Data Types so in JavaScript terms, an object)
        // where each key represents a unit number, 
        // and each value is a list of dictionaries that used track the progress of different mini-games within each unit.
        getProgress(unit.number)[1].sugar++
        // in that list of dictionaries, [1] represent total attempts, [0] represent correct attempts 
        
        if (submission === answers[currentQuestionId]) {
            correct_submission();
        } else {
            wrong_submission();
        }
    }

    
    return (
        <div id='sugar-honeycombs-full-container'>
            <img id='background' src={currentBackground} alt='SugarHoneycombs' />
            <img id='overlay-image' src={state.currentOverlay} alt='Overlay' />
            <div id="empty-div"></div>
            <div id='sugar-honeycombs-container'>
                <div id='header'>
                    <h1>{unit.name}</h1>
                    <div id='initialization_msg'>
                        Initializing, please wait for 2 seconds...
                    </div>
                    <div id='pregame'>
                        <div id='settings'>
                        <b>Difficulty Level:</b>
                            <input type="radio" id="easy" name="difficulty" value="easy"></input>
                            <label for="easy">Easy</label>
                            <input type="radio" id="medium" name="difficulty" value="medium"></input>
                            <label for="medium">Medium</label>
                            <input type="radio" id="hard" name="difficulty" value="hard"></input>
                            <label for="hard">Hard</label>
                            <br></br>
                        </div>
                        <button className='btn btn-primary' onClick={startGame}>Start Game</button>
                    </div>
                    <div id='game'>
                        <div id="score-view">
                            <ScoreView />
                        </div>
                        <br />
                        <div id='question'>             
                            <h2>Choose an option according to the audio.</h2>
                        </div>
                        <div id='choices'>
                            {
                                currentQuestionId <= 3 ? // blank page most likely due to conditional rendering
                                choices_array[currentQuestionId].map(function(choice, i) {
                                    return (
                                        <div key={i} style={{ display: 'block', marginBottom: '20px' }}>
                                            <input
                                                type="radio"
                                                name="multi_choice"
                                                value={choice}
                                                id={`choice-${i}`}
                                                checked={state.radioButton === choice}
                                                onChange={handleOptionChange}
                                            />
                                            <label htmlFor={`choice-${i}`}>{choice}</label>
                                        </div>
                                    );
                                })
                                : (currIncorrectScore < 2 && win())
                            }
                        </div>

                        <div id='answer'>
                            {/* Conditional Rendering within JSX: display error message if showErrorMessage is true */}
                            {showErrorMessage && 
                                <div id='error'>
                                    <h2 id='error-message'>Incorrect answer!</h2>
                                    <h3 id='error-message'>
                                        The right answer is : {answers[currentQuestionId]}
                                    </h3>
                                </div>
                            }
                            {showCorrectMessage && 
                                <div id='correct'>
                                    <h2 id='correct-message'>Correct answer! Good job!</h2>
                                </div>
                            }
                            <button id='submit-btn' className='btn btn-primary' onClick={submitAnswer}>Submit</button>
                        </div>
                        <div> 
                            {/* Generally, onClick={playSound}: assigns the function to be called when the button is clicked
                            onClick={playSound()}: call immediately. But in our case, our playSound function have parameter 
                            so use onClick={() => playSound(1)}
                            */}
                            <button id='audio-btn'className='btn btn-primary' onClick={() => playSound(currentQuestionId)}>Play audio</button>
                        </div>
                        <div id='timer-bar'>
                            <progress value={questionResponseTime - remainingTime} max={questionResponseTime}></progress>
                        </div>
                    </div>
                    <div id='postgame'>
                        <h2 id='win-text'>"Congratulations, you win"</h2>
                        <h2 id='lose-text'>"You lose, better luck next time!"</h2>
                        <img id='gameover-overlay' src={state.gameoverOverlay} alt='Gameover'/>
                        <button className='btn btn-primary' onClick={playAgain}>Play Again</button>
                    </div>
                </div>
                <div id="tutorial">
                    <p> <b>How to win:</b> listen carefully to the pronunciation of each Korean phrase <br></br>
                    and select the word or phrase that aligns most closely with its context. <br></br>
                    You have two lives, each incorrect answer costs one life. To win, <br></br> 
                    make it to the end of all the questions before using up all your lives. <b>Good Luck!</b> </p>
                </div>
                <Link to={LISTEN_OPTIONS_PATH} state={unit} >
                    <button className='btn btn-back'>
                        {'Back'}
                    </button> 
                </Link>
            </div>
        </div>
    );
}



// this line at the end is exporting this component, making it available for being imported in another file like App.js
export default SugarHoneycombsPage;