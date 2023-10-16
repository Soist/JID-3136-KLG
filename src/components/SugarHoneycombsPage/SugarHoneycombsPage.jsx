import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SugarHoneycombsPage.css';
import sound from '../../audios/words/3-1 음식.mp3'
import winOverlay from './resources/win_honeycombs.png';
import loseOverlay from './resources/lose_honeycombs.png';
import startOverlay from './resources/honeycombs.png';
import backgroundImg from './resources/test8.png';
import {getProgress} from "../../ProgressDummyData";
import {GRAMMAR_OPTIONS_PATH} from '../../constants';

// SugarHoneycombsPage function is a React component.
// JSX Rendering & Event handling: returned JSX defines the structure and appearance of the UI and event handlers such as 
// onClick and  onKeyDown that are defined to specify what functions/methods should be called: startGame(), submitAnswer() 
// And within these methods: startGame(), submitAnswer(), user inputs are accessed/modified by using document with input 
// id. ***Therefore, there is a separation of user input tracking between JSX and methods***, where the former focus on 
// clicked button or pressed enter key, while the later focus on value inputted
// The intuition is JSX always delegate jobs to methods.



function SugarHoneycombsPage() { 
    const location = useLocation();
    const unit = location.state;
    const audio = new Audio(sound);

    // useState() hook from React used to initialize the component's state object, 
    // here useState is called with an object{} having answerLanguage propery initailized with string 'korean', and etc.
    const [state, setState] = useState({
        answerLanguage: 'korean',
        currentOverlay: startOverlay
    });
    // state is a variable that holds the current state. You can access the values in the state by using 
    // state.answerLanguage and state.currentOverlay.
    // setState is a function that you can call to update the state. When you call setState, 
    // you pass in a new object that will update the current state.

    // New state to manage the visibility of the error message
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    });
    // state is a variable that holds the current state. You can access the values in the state by using state.answerLanguage and state.currentImg.
    // setState is a function that you can call to update the state. When you call setState, you pass in a new object that will update the current state.



    useEffect(() => {
        audio.load();
      }, [])

    const playSound = () => {
        audio.play();
    }

    function startGame() {

        const languageRadioButton = document.querySelector('input[name="answer-language"]:checked');
        if (languageRadioButton === null) {
            return;
        }
        
    
        const answerLanguage = languageRadioButton.value;

        document.getElementById('game').style.display = 'flex';

        document.getElementById('pregame').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('win-text').style.display = 'none';
        document.getElementById('lose-text').style.display = 'none';
    
        setState({ ...state, answerLanguage: answerLanguage, currentOverlay: startOverlay});
        
        document.getElementById('tutorial').style.display = 'none';


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
        const answers = {'korean': '음식', 'english': 'food'}

        // This function takes a unitNumber(current location.state) as an argument and 
        // returns the corresponding progress data from the DummyProgress object. 
        // The DummyProgress object is a dictionary (or in JavaScript terms, an object)
        // where each key represents a unit number, 
        // and each value is a list of dictionaries that used track the progress of different mini-games within each unit.
        getProgress(unit.number)[1].sugar++
        // in that list of dictionaries, [1] represent total attempts, [0] represent correct attempts 
        
        if (submission === answers[answerLanguage]) {
            getProgress(unit.number)[0].sugar++
            document.getElementById('answer-input').value = ''; //Clears the answer input field in JSX
            document.getElementById('game').style.display = 'none'; //Hides all elements/ids in the game container of JSX
            document.getElementById('postgame').style.display = 'flex'; //Displays elements/ids in postgame section
            document.getElementById('win-text').style.display = 'flex'; //Displays the id=win-text 
            setState({ ...state, currentOverlay: winOverlay}); // Updates the state and the displayed image to a winning overlay
        } else {
            document.getElementById('answer-input').value = '';
            document.getElementById('question').style.display = 'none'; // hide the question container in JSX
            document.getElementById('answer-input').style.display = 'none'; 
            document.getElementById('audio-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'none'; // add an id to the button to make this work!


            // document.getElementById('postgame').style.display = 'flex';
            // document.getElementById('lose-text').style.display = 'flex';
            
            setShowErrorMessage(true); // Show the error message
            // Set a timeout to hide the error message after 2 seconds (2000 milliseconds)

            setTimeout(() => {
                setShowErrorMessage(false);
                document.getElementById('question').style.display = 'flex';
                document.getElementById('answer-input').style.display = 'flex';
                document.getElementById('audio-btn').style.display = 'flex';
                document.getElementById('submit-btn').style.display = 'flex';
                // loadNextQuestion(); // Load the next question
            }, 2000);


            // using the spread operator (...) to take all existing state properties and their values 
            // and spread them into the new state object. it keeps the existing state unchanged
            setState({ ...state, currentOverlay: loseOverlay});
        }
    }
    return (
        <div id='sugar-honeycombs-full-container'>
            <img id='background' src={backgroundImg} alt='SugarHoneycombs' />
            <img id='overlay-image' src={state.currentOverlay} alt='Overlay' />
            <img id='background' src={state.currentImg} alt='SugarHoneycombs' />
            {/* <img id='background' src={state.currentImg} alt='SugarHoneycombs' /> */}
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
                        <div id='question'>
                            <h2>What does this audio say in {state.answerLanguage.charAt(0).toUpperCase() + state.answerLanguage.slice(1)}?</h2>
                        </div>
                        <div id='answer'>
                            {/* Conditional Rendering within JSX: display error message if showErrorMessage is true */}
                            {showErrorMessage && 
                                <div id='error'>
                                    <h2 id='error-message'>Incorrect answer! Try again!</h2>
                                </div>
                            }
                            <input id='answer-input' type='text' autoComplete='off' onKeyDown={(event) => { if (event.key === 'Enter') submitAnswer(); }} />
                            <button id='submit-btn' className='btn btn-primary' onClick={submitAnswer}>Submit</button>
                        </div>
                        <div> 
                            <button id='audio-btn'className='btn btn-primary' onClick={playSound}>Play audio</button>
                        </div>
                    </div>
                    <div id='postgame'>
                        <h2 id='win-text'>You win!</h2>
                        <h2 id='lose-text'>You lose!</h2>
                        <button className='btn btn-primary' onClick={startGame}>Play Again</button>
                    </div>
                </div>
                <div id="tutorial">
                    <p> <b>How to win:</b> listen to the pronunciation of a Korean word and enter <br></br>
                    its translation. You have three lives, each incorrect answer costs one life, <br></br> 
                    and losing all lives ends the game. <b>Good Luck!</b> </p>
                </div>
                <Link to={GRAMMAR_OPTIONS_PATH} state={unit} >
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