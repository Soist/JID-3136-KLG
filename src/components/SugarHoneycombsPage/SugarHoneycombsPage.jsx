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
import { getVocab } from '../../vocabData';
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
            <CircleSvg />
            <SkullSvg />
        </>
    );
}

//features to complete: load different questions set based on locaiton

function SugarHoneycombsPage() { 
    const location = useLocation();
    const unit = location.state; //this unit is not a int causing problems when indexing

    // useState() hook from React used to initialize the component's state object, 
    // here useState is called with an object{} having answerLanguage propery initailized with string 'korean', and etc.
    const [state, setState] = useState({
        answerLanguage: 'korean',
        currentOverlay: startOverlay,
        gameoverOverlay: gameoverWinOverlay
    });
    // state is a variable that holds the current state. You can access the values in the state by using 
    // state.answerLanguage and state.currentOverlay.
    // setState is a function that you can call to update the state. When you call setState, 
    // you pass in a new object that will update the current state.

    // New state to manage the visibility of the error message
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showCorrectMessage, setCorrectMessage] = useState(false);
    
    const [audios, setAudios] = useState([])

    const [currentBackground, setCurrentBackground] = useState(backgroundImg);
    const [currentQuestionId, setCurrentQuestionId] = useState(0);

    const [currIncorrectScore, setCurrIncorrectScore] = useState(0);

    let koreanParts = []
    let englishParts = []
    const vocab_list = getVocab(3) // return a list of dictionaries within that unit, where each dic having english as key and korean as value
    for (let i = 0; i < vocab_list.length; i++) {
        koreanParts.push(vocab_list[i]['korean']);  
        //can use dot operation vocab_list[i].english, but bracket is more powerful as if the property name is not a valid identifier ex: includes spaces
        englishParts.push(vocab_list[i]['english']);
    };
    let total_questions = koreanParts.length


    const text = getVocab(3)[currentQuestionId]
    const show = currentQuestionId
    // The useEffect hook is used in React to perform side effects in function components. 
    // Side effects could be data-fetching, subscriptions, manual DOM manipulations, and so on.
    // Here it pre-loads the audio after the inital render to be ready to play as soon as needed
    useEffect(() => {
        const loadAudio = (part) => {
            //put audio files in the public folder to access them directly via the path 
            const src = `/audios/words/3-1 ${part}.mp3`; // Using template literal here, `` instead of ''
            const audio = new Audio(src);
            audio.onerror = () => { //fetching error handling
                console.error(`Audio file not found: ${src}`);
                return null;
            };
            return audio;
        };
        
        let loadedAudios = [];
        //// Remove an element from the array will shorten the length of the array, 
        //// Hence mess up the indexing for the loop
        // for (let i=0; i<koreanParts.length; i++) {
        //     const audio = loadAudio(koreanParts[0]);
        //     if (audio === null) {
        //         koreanParts.pop(i)
        //         englishParts.pop(i)
        //         total_questions--
        //     }
        //     loadedAudios.push(audio);
        // }
        for (let i = 0; i < koreanParts.length; i++) {
            const audio = loadAudio(koreanParts[i]);
            loadedAudios.push(audio);
        }    
        //// Now, let's filter out the null/non-existing audios and corresponding koreanParts and englishParts
        koreanParts = koreanParts.filter((_, index) => loadedAudios[index] !== null);
        englishParts = englishParts.filter((_, index) => loadedAudios[index] !== null);
        loadedAudios = loadedAudios.filter(audio => audio !== null);
        
        
        setAudios(loadedAudios);
    }, []);

    const playSound = (number) => {
        // ?. is called the optional chaining operator. This operator allows you to access the properties of objects 
        // without worry about if the object is null or undefined. 
        // If audios[number - 1] is null or undefined, the optional chaining operator 
        // will prevent a runtime error from occurring by not calling the play() method,
        // and the expression will return undefined instead.
        audios[number]?.play();
    };


    
    function startGame() {
        
        const languageRadioButton = document.querySelector('input[name="answer-language"]:checked');
        if (languageRadioButton === null) {
            return;
        }
        
        const answerLanguage = languageRadioButton.value;
        
        
        document.getElementById('game').style.display = 'flex';
        document.getElementById('overlay-image').style.display = 'flex';
        document.getElementById('pregame').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('tutorial').style.display = 'none';
        
        setCurrentQuestionId(0)
        setCurrIncorrectScore(0)
        setCurrentBackground(backgroundImg)
        setState({ ...state, answerLanguage: answerLanguage, currentOverlay: startOverlay, gameoverOverlay: gameoverWinOverlay});


        for (let i = 0; i < 3; i++) {
            document.getElementById("score-view").childNodes[i].classList.remove("red");
        }

        startTimeout(5000);
    }

    function endGame() {
        document.getElementById('overlay-image').style.display = 'none';
        document.getElementById('pregame').style.display = 'none';
        document.getElementById('game').style.display = 'none';
        document.getElementById('tutorial').style.display = 'none';
        setCurrentBackground(gameoverImg)
        if (currIncorrectScore + 1 === 3) {
            setState({...state, gameoverOverlay: gameoverLoseOverlay})
            document.getElementById('postgame').style.display = 'flex';
            document.getElementById('lose-text').style.display = 'flex';
            document.getElementById('win-text').style.display = 'none';
        } else {
            setState({...state, gameoverOverlay: gameoverWinOverlay})
            document.getElementById('postgame').style.display = 'flex';
            document.getElementById('win-text').style.display = 'flex';
            document.getElementById('lose-text').style.display = 'none';
        }

    }

    function submitAnswer() {
        
        const answerLanguage = state.answerLanguage;

        // Submission Value Acquisition and Modification:
        // Fetches the value inputted in the HTML element with the ID 'answer-input', 
        // converts it to lowercase, and stores it in the variable submission.
        const submission = document.getElementById('answer-input').value.toLowerCase();
        // document.getElementById('answer-input') This part targets and accesses an HTML element on the webpage.
        // Explanation: document refers to the webpage .getElementById('answer-input') fetches the HTML element that has 
        // an id attribute of 'answer-input' and .value retrieves the value/content from the targeted element.


        // Answer Dictionary
        const answers = {'korean': koreanParts, 'english': englishParts}



        // This function takes a unitNumber(current location.state) as an argument and 
        // returns the corresponding progress data from the DummyProgress object. 
        // The DummyProgress object is a dictionary (not Primitive Data Types so in JavaScript terms, an object)

        // This function takes a unitNumber(current location.state) as an argument and 
        // returns the corresponding progress data from the DummyProgress object. 
        // The DummyProgress object is a dictionary (not Primitive Data Types so in JavaScript terms, an object)


        // where each key represents a unit number, 
        // and each value is a list of dictionaries that used track the progress of different mini-games within each unit.
        getProgress(unit.number)[1].sugar++
        // in that list of dictionaries, [1] represent total attempts, [0] represent correct attempts 
        

        
        // Instead of a while loop that only proceed when a correct message was detected, in JSX we reshow the UI button
        if (submission === answers[answerLanguage][currentQuestionId]) {
            getProgress(unit.number)[0].sugar++
            setCurrentQuestionId(currentQuestionId + 1)
            document.getElementById('answer-input').value = ''; //Clears the answer input field in JSX
            document.getElementById('question').style.display = 'none'; // Hide all elements/ids in the question container in JSX
            document.getElementById('answer-input').style.display = 'none'; 
            document.getElementById('audio-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'none'; // Add an id to the class button to make this work!
            

            setCorrectMessage(true); // Show the correct message
            setState({ ...state, currentOverlay: winOverlay}); // Updates the state and the displayed image to a winning overlay
            // Set a timeout to hide the error message after 1 seconds (1000 milliseconds)
            // () => {} arrow function, left put parameters, right put function code
            setTimeout(() => {
                setCorrectMessage(false)
                document.getElementById('question').style.display = 'flex';
                document.getElementById('answer-input').style.display = 'flex';
                document.getElementById('audio-btn').style.display = 'flex';
                document.getElementById('submit-btn').style.display = 'flex';
                setState({ ...state, currentOverlay: startOverlay});
                if (currentQuestionId + 1 === 10) {endGame()}
                // demo next sprint: three lives, timeout bar
                // @separation of function
                // different questions set based on units
                startTimeout(5000);
            }, 1000);
        } else {
            setCurrentQuestionId(currentQuestionId + 1)
            document.getElementById('score-view').childNodes[currIncorrectScore].classList.add('red');
            setCurrIncorrectScore(currIncorrectScore + 1);
            document.getElementById('answer-input').value = '';
            document.getElementById('question').style.display = 'none'; 
            document.getElementById('answer-input').style.display = 'none';
            document.getElementById('audio-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'none';
            
            
            setShowErrorMessage(true); 
            setState({ ...state, currentOverlay: loseOverlay});
            setTimeout(() => {
                setShowErrorMessage(false);
                document.getElementById('question').style.display = 'flex';
                document.getElementById('answer-input').style.display = 'flex';
                document.getElementById('audio-btn').style.display = 'flex';
                document.getElementById('submit-btn').style.display = 'flex';
                // using the spread operator (...) to take all existing state properties and their values 
                // and spread them into the new state object. it keeps the existing state unchanged
                setState({ ...state, currentOverlay: startOverlay});
                if (currIncorrectScore + 1 === 3 || currentQuestionId + 1 === 10) {
                    endGame();
                }
                startTimeout(5000);
            }, 2500);
        }
    }

    function startTimeout(duration) {
        const timeoutBar = document.getElementById('timeout-bar');
    
        let startTime = Date.now();
    
        const updateBar = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration - elapsed);
            const percentage = (remaining / duration) * 100;
    
            timeoutBar.style.width = `${percentage}%`;
    
            if (remaining > 0) {
                requestAnimationFrame(updateBar);
            }
        };
    
        updateBar();
    }
    
    
    return (
        <div id='sugar-honeycombs-full-container'>
            <img id='background' src={currentBackground} alt='SugarHoneycombs' />
            <img id='overlay-image' src={state.currentOverlay} alt='Overlay' />
            <div id="empty-div"></div>
            <div id='sugar-honeycombs-container'>
                <div id='header'>
                    <h1>{unit.name}</h1>
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
                            <b>Answer Language:</b>
                            <input type="radio" id="korean" name="answer-language" value="korean"></input>
                            <label for="korean">Korean</label>
                            <input type="radio" id="english" name="answer-language" value="english"></input>
                            <label for="english">English</label>
                        </div>
                        <button className='btn btn-primary' onClick={startGame}>Start Game</button>
                    </div>
                    <div id='game'>
                        <div id="score-view">
                            <ScoreView />
                        </div>
                        <br />
                        <div id="timeout-container">
                            <div id="timeout-bar"></div>
                        </div>
                        <div>
                            English: {text.english}
                            <br />
                            Korean: {text.korean}
                            <br />
                            ID: {show}
                            <br />
                            Total Questions: {total_questions}
                            <br />
                            Current Incorrect Score: {currIncorrectScore}
                        </div>
                        <div id='question'>
                            <h2>What does this audio say in {state.answerLanguage.charAt(0).toUpperCase() + state.answerLanguage.slice(1)}?</h2>
                        </div>
                        <div id='answer'>
                            {/* Conditional Rendering within JSX: display error message if showErrorMessage is true */}
                            {showErrorMessage && 
                                <div id='error'>
                                    <h2 id='error-message'>Incorrect answer! The right answer is </h2>
                                    <h3 id='error-message'>
                                        English: {text.english}
                                        <br />
                                        Korean: {text.korean}
                                    </h3>
                                </div>
                            }
                            {showCorrectMessage && 
                                <div id='correct'>
                                    <h2 id='correct-message'>Correct answer! Good job!</h2>
                                </div>
                            }
                            <input id='answer-input' type='text' autoComplete='off' onKeyDown={(event) => { if (event.key === 'Enter') submitAnswer(); }} />
                            <button id='submit-btn' className='btn btn-primary' onClick={submitAnswer}>Submit</button>
                        </div>
                        <div> 
                            {/* Generally, onClick={playSound}: assigns the function to be called when the button is clicked
                            onClick={playSound()}: call immediately. But in our case, our playSound function have parameter 
                            so use onClick={() => playSound(1)}
                            */}
                            <button id='audio-btn'className='btn btn-primary' onClick={() => playSound(currentQuestionId)}>Play audio</button>
                        </div>
                    </div>
                    <div id='postgame'>
                        <h2 id='win-text'>"Congratulations, you win"</h2>
                        <h2 id='lose-text'>"Sorry, you lose. Better luck next time!"</h2>
                        <img id='gameover-overlay' src={state.gameoverOverlay} alt='Gameover'/>
                        <button className='btn btn-primary' onClick={startGame}>Play Again</button>
                    </div>
                </div>
                <div id="tutorial">
                    <p> <b>How to win:</b> listen to the pronunciation of a Korean word and enter <br></br>
                    its translation. You have three lives, each incorrect answer costs one life, <br></br> 
                    and losing all lives ends the game. <b>Good Luck!</b> </p>
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