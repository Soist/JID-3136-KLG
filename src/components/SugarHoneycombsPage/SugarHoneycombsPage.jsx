import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SugarHoneycombsPage.css';
import sound from '../../audios/words/3-1 음식.mp3'
import winImg from './resources/win_honeycombs.png';
import loseImg from './resources/lose_honeycombs.png';
import startImg from './resources/honeycombs.png';
import {getProgress} from "../../ProgressDummyData";

function SugarHoneycombsPage() {
    const location = useLocation();
    const unit = location.state;
    const audio = new Audio(sound);

    const [state, setState] = useState({
        answerLanguage: 'korean',
        currentImg: startImg
    });
    


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

        document.getElementById('pregame').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('win-text').style.display = 'none';
        document.getElementById('lose-text').style.display = 'none';
    
        setState({ ...state, answerLanguage: answerLanguage, currentImg: startImg});

        document.getElementById('game').style.display = 'flex';

    }

    function submitAnswer() {
        
        const answerLanguage = state.answerLanguage;
        const submission = document.getElementById('answer-input').value.toLowerCase();
        const answers = {'korean': '음식', 'english': 'food'}
        getProgress(unit.number)[1].sugar++

        if (submission === answers[answerLanguage]) {
            getProgress(unit.number)[0].sugar++
            document.getElementById('answer-input').value = '';
            document.getElementById('game').style.display = 'none';
            document.getElementById('postgame').style.display = 'flex';
            document.getElementById('win-text').style.display = 'flex';
            setState({ ...state, currentImg: winImg});
        } else {
            document.getElementById('answer-input').value = '';
            document.getElementById('game').style.display = 'none';
            document.getElementById('postgame').style.display = 'flex';
            document.getElementById('lose-text').style.display = 'flex';
            setState({ ...state, currentImg: loseImg});
        }
    }
    return (
        <div id='sugar-honeycombs-full-container'>
            <img id='background' src={state.currentImg} alt='SugarHoneycombs' />
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
                            <input id='answer-input' type='text' autoComplete='off' onKeyDown={(event) => { if (event.key === 'Enter') submitAnswer(); }} />
                            <button className='btn btn-primary' onClick={submitAnswer}>Submit</button>
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

            </div>
        </div>
    );
}




export default SugarHoneycombsPage;