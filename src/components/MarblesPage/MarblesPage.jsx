import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shuffleArray } from '../../utils';
import backgroundImg from './resouces/marbles_bg1.png';
import './MarblesPage.css';
import { ReactComponent as CircleSvg } from '../../SharedImages/Circle.svg'
import { ReactComponent as FlagSvg } from '../../SharedImages/Flag.svg'
import { ReactComponent as SkullSvg } from '../../SharedImages/Skull.svg'
import { getGrammar } from '../../grammarData';

function ScoreView() {
    return (
        <>
            <SkullSvg />
            <CircleSvg />
            <CircleSvg />
            <CircleSvg className='gray' />
            <CircleSvg />
            <CircleSvg />
            <CircleSvg />
            <CircleSvg />
            <FlagSvg />
        </>
    );
}

function MarblesPage() { 
    const location = useLocation();
    const unit = location.state;

    const [state, setState] = useState({
        questions: getGrammar(unit.number),
        currQuestionIndex: 0,
        score: 3,
        radioButton: null,
    });
    const handleOptionChange = (event) => {
        setState({ ...state, radioButton: event.target.value});
    };

    function startGame() {
        document.getElementById('pregame').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('win-text').style.display = 'none';
        document.getElementById('lose-text').style.display = 'none';

        const questions = state.questions;
        shuffleArray(questions);

        setState({
            questions: questions,
            currQuestionIndex: 0,
            score: 3,
        });

        const scoreChildren = document.getElementById('score').childNodes;
        for (let i = 0; i < scoreChildren.length; i++) {
            scoreChildren[i].classList.remove('red', 'green');
        }

        document.getElementById('score').style.display = 'flex';
        document.getElementById('game').style.display = 'flex';
    }

    function submitAnswer() {
        const questions = state.questions;
        const currQuestionIndex = state.currQuestionIndex;
        const isTrueFalse = questions[currQuestionIndex].choices.length > 0 ? false: true;
        const currScore = state.score;
        const submissionRadioButton = isTrueFalse ? 
                                    document.querySelector('input[name="true_false"]:checked')
                                    : document.querySelector('input[name="multi_choice"]:checked');
        const submission = submissionRadioButton.value;

        if (submission === questions[currQuestionIndex].answer) {

            const newScore = currScore + 1;
            if (newScore === 8) {
                document.getElementById('score').childNodes[newScore].classList.add('green');
                document.getElementById('game').style.display = 'none';
                document.getElementById('postgame').style.display = 'flex';
                document.getElementById('win-text').style.display = 'flex';
            } else if (newScore <= 3) {
                document.getElementById('score').childNodes[newScore - 1].classList.remove('red');
            } else if (newScore > 3) {
                document.getElementById('score').childNodes[newScore].classList.add('green');
            }

            setState({ ...state, radioButton: '', score: newScore,
            currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length});
        } else {
            const newScore = currScore - 1;
            if (newScore === 0) {
                document.getElementById('score').childNodes[newScore].classList.add('red');
                document.getElementById('game').style.display = 'none';
                document.getElementById('postgame').style.display = 'flex';
                document.getElementById('lose-text').style.display = 'flex';
            } else if (newScore < 3) {
                document.getElementById('score').childNodes[newScore].classList.add('red');
            } else if (newScore >= 3) {
                document.getElementById('score').childNodes[newScore + 1].classList.remove('green');
            }

            setState({ ...state, radioButton: '', score: newScore,
            currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length});
        }
    }

    return (
        <div id="marbles-full-container">
            <img id="background" src={backgroundImg} alt="Marbles" />
            <div id="empty-div"></div>
            <div id='marbles-container' style={{paddingTop: '5em'}}>
                <div id='header'>
                    <h1>{unit.name}</h1>
                    <div id='score'>
                        <ScoreView />
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
                        <button className='btn btn-primary' onClick={startGame} >Start Game</button>
                    </div>
                    <div id='game'>
                        <div id='question'>
                            {
                                state.questions[state.currQuestionIndex].choices.length === 0 ?
                                <div>
                                    <h2>Is the following grammatically true?</h2>
                                </div>
                                : <h2>Choose an option to make it grammatically true</h2>
                            }
                            <h2><span id="question-text">{state.questions[state.currQuestionIndex].question}</span></h2>
                            <p style={{ color: 'gray' }}>answer for demo purpose:{state.questions[state.currQuestionIndex].answer}</p>
                        </div>
                        <div>
                        {
                            state.questions[state.currQuestionIndex].choices.length === 0 ?
                            <div>
                                <input type="radio" name="true_false" id="true" value="true" 
                                checked={state.radioButton === 'true'} onChange={handleOptionChange}></input>
                                <label for="true">True</label>
                                <input type="radio" name="true_false" id="false" value="false"
                                checked={state.radioButton === 'false'} onChange={handleOptionChange}></input>
                                <label for="false">False</label>
                            </div>
                            : <div>
                                {
                                state.questions[state.currQuestionIndex].choices.map(function(choice, i){
                                    return ([<input type="radio" name="multi_choice" value={choice} id={choice} key={i}
                                    checked={state.radioButton === choice} onChange={handleOptionChange}></input>
                                , <label for={choice}>{choice}</label>]);
                                })
                                }
                            </div>
                        }
                        </div>
                        <div id='answer'>
                            <button className='btn btn-primary' onClick={submitAnswer}>Submit</button>
                        </div>
                    </div>
                    <div id='postgame'>
                        <h2 id='win-text'>You win!</h2>
                        <h2 id='lose-text'>You lose!</h2>
                        <button className='btn btn-primary' onClick={startGame}>Play Again</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarblesPage;