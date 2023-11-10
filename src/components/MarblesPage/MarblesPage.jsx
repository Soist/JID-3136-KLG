import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shuffleArray } from '../../utils';
import Score0 from './resources/Score0.png';
import Score1 from './resources/Score1.png';
import Score2 from './resources/Score2.png';
import Score3 from './resources/Score3.png';
import Score4 from './resources/Score4.png';
import Score5 from './resources/Score5.png';
import Score6 from './resources/Score6.png';
import Score7 from './resources/Score7.png';
import Score8 from './resources/Score8.png';
import './MarblesPage.css';
import { ReactComponent as CircleSvg } from '../../SharedImages/Circle.svg'
import { ReactComponent as FlagSvg } from '../../SharedImages/Flag.svg'
import { ReactComponent as SkullSvg } from '../../SharedImages/Skull.svg'
import { getGrammar } from '../../grammarData';
import { GRAMMAR_OPTIONS_PATH } from '../../constants';

const BACKGROUND_IMAGES = [Score0, Score1, Score2, Score3, Score4, Score5, Score6, Score7, Score8];

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
    const EASY_QUESTION_RESPONSE_TIME = 20000;
    const MEDIUM_QUESTION_RESPONSE_TIME = 10000;
    const HARD_QUESTION_RESPONSE_TIME = 5000;
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
        const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        document.getElementById('pregame').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('win-text').style.display = 'none';
        document.getElementById('lose-text').style.display = 'none';

        const questions = state.questions;
        shuffleArray(questions);
        setState({ ...state, questions: questions,});

        if (difficulty === "easy") {
            setState({ ...state, questionResponseTime: EASY_QUESTION_RESPONSE_TIME,});
        } else if (difficulty === "medium") {
            setState({ ...state, questionResponseTime: MEDIUM_QUESTION_RESPONSE_TIME,});
        } else {
            setState({ ...state, questionResponseTime: HARD_QUESTION_RESPONSE_TIME,});
        }

        const scoreChildren = document.getElementById('score').childNodes;
        for (let i = 0; i < scoreChildren.length; i++) {
            scoreChildren[i].classList.remove('red', 'green');
        }

        document.getElementById('score').style.display = 'flex';
        document.getElementById('game').style.display = 'flex';
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const currScore = state.score;
            if (document.getElementById("game").style.display === "flex") { // only execute when game is active
                const newScore = currScore - 1;
                if (newScore === 0) {
                    document.getElementById('score').childNodes[newScore].classList.add('red');
                    document.getElementById('game').style.display = 'none';
                    document.getElementById('postgame').style.display = 'flex';
                    document.getElementById('lose-text').style.display = 'flex';
                } else {
                    if (newScore < 3) {
                        document.getElementById('score').childNodes[newScore].classList.add('red');
                    } else if (newScore >= 3) {
                        document.getElementById('score').childNodes[newScore + 1].classList.remove('green');
                    }
                }
                setState({ ...state, radioButton: '', score: newScore,
                currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length});
                }
        }, state.questionResponseTime);
        return () => clearInterval(interval);
    }, [state.score, state.questionResponseTime]);

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
            } else {
                if (newScore <= 3) {
                    document.getElementById('score').childNodes[newScore - 1].classList.remove('red');
                } else if (newScore > 3) {
                    document.getElementById('score').childNodes[newScore].classList.add('green');
                }
                
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
            } else {
                if (newScore < 3) {
                    document.getElementById('score').childNodes[newScore].classList.add('red');
                } else if (newScore >= 3) {
                    document.getElementById('score').childNodes[newScore + 1].classList.remove('green');
                }
            }
            setState({ ...state, radioButton: '', score: newScore,
            currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length});
        }
        
    }

    return (
        <div id="marbles-full-container">
            <img id="background" src={BACKGROUND_IMAGES[state.score]} alt="Marbles" />
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
                            <input type="radio" id="easy" value="easy" name="difficulty"></input>
                            <label for="easy">Easy</label>
                            <input type="radio" id="medium" value="medium" name="difficulty"></input>
                            <label for="medium">Medium</label>
                            <input type="radio" id="hard" value="hard" name="difficulty"></input>
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
                            <p style={{ color: 'gray' }}>answer for demo purpose: {state.questions[state.currQuestionIndex].answer}</p>
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
                <Link to={GRAMMAR_OPTIONS_PATH} state={unit} >
                    <button className='btn btn-back'>
                        {'Back'}
                    </button> 
                </Link>
            </div>
        </div>
    );
}

export default MarblesPage;