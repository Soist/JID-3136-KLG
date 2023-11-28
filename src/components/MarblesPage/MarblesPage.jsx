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
import {getProgress} from "../../ProgressDummyData";
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
    const EASY_QUESTION_RESPONSE_TIME = 300000;
    const MEDIUM_QUESTION_RESPONSE_TIME = 20000;
    const HARD_QUESTION_RESPONSE_TIME = 10000;
    const location = useLocation();
    const unit = location.state;

    const [state, setState] = useState({
        questions: getGrammar(unit.number),
        currQuestionIndex: 0,
        score: 3,
        radioButton: null,
        showErrorMessage: false,
        showCorrectMessage: false,
    });

    const [remainingTime, setRemainingTime] = useState(state.questionResponseTime);

    const handleOptionChange = (event) => {
        setState({ ...state, radioButton: event.target.value});
    };

    function startGame() {
        const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        document.getElementById('pregame').style.display = 'none';
        document.getElementById('tutorial').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('win-text').style.display = 'none';
        document.getElementById('lose-text').style.display = 'none';

        const questions = state.questions;
        shuffleArray(questions);
        setState({ ...state, questions: questions,});

        let initialQuestionResponseTime;
        if (difficulty === "easy") {
            initialQuestionResponseTime = EASY_QUESTION_RESPONSE_TIME;
        } else if (difficulty === "medium") {
            initialQuestionResponseTime = MEDIUM_QUESTION_RESPONSE_TIME;
        } else {
            initialQuestionResponseTime = HARD_QUESTION_RESPONSE_TIME;
        }
        setState({ ...state, questionResponseTime: initialQuestionResponseTime});
        setRemainingTime(initialQuestionResponseTime);

        const scoreChildren = document.getElementById('score').childNodes;
        for (let i = 0; i < scoreChildren.length; i++) {
            scoreChildren[i].classList.remove('red', 'green');
        }

        document.getElementById('score').style.display = 'flex';
        document.getElementById('game').style.display = 'flex';
    }

    useEffect(() => {
        let timer;
        const startTimer = () => {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
            }, 1000);
        };

        startTimer();

        return () => {
            clearInterval(timer);
        }
    }, [state.currQuestionIndex, state.questionResponseTime]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currScore = state.score;

            if (document.getElementById("game").style.display === "flex") {
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

                setState({
                    ...state,
                    radioButton: '',
                    score: newScore,
                    currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length,
                });
            
                setRemainingTime(state.questionResponseTime);
            }
        }, state.questionResponseTime);

        return () => clearTimeout(timeout);
    }, [state.currQuestionIndex, state.score, state.questionResponseTime]);

    function submitAnswer() {
        getProgress(unit.number)[1].marble++

        const questions = state.questions;
        const currQuestionIndex = state.currQuestionIndex;
        const isTrueFalse = questions[currQuestionIndex].choices.length > 0 ? false: true;
        const currScore = state.score;
        const submissionRadioButton = isTrueFalse ? 
                                    document.querySelector('input[name="true_false"]:checked')
                                    : document.querySelector('input[name="multi_choice"]:checked');
        const submission = submissionRadioButton.value;

        if (submission === questions[currQuestionIndex].answer) {
            getProgress(unit.number)[0].marble++
            const newScore = currScore + 1;
            setState({...state, showCorrectMessage: true,});
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
            setTimeout(() => {
                setState({ ...state, radioButton: '', score: newScore,
                    currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length,
                    showCorrectMessage: false});
            }, 2000);
            
            
        } else {
            const newScore = currScore - 1;
            setState({...state, showErrorMessage: true,});
            setTimeout(() => {
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
                    currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length,
                    showErrorMessage: false});
            }, 3500);
        }
        setRemainingTime(state.questionResponseTime);
    }

    function playAgain() {
        setState({
            ...state,
            currQuestionIndex: 0,
            score: 3,
            radioButton: '',
          });
        document.getElementById("pregame").style.display = "flex";
        document.getElementById('tutorial').style.display = 'flex';
        document.getElementById("game").style.display = "none";
        document.getElementById("postgame").style.display = "none";
        document.getElementById('win-text').style.display = 'none';
        document.getElementById('lose-text').style.display = 'none';
    }

    return (
        <div id="marbles-full-container">
            <img id="background" src={BACKGROUND_IMAGES[state.score]} alt="Marbles" />
            <div id="empty-div"></div>
            <div id='marbles-container' style={{paddingTop: '5em'}}>
                <div id='header'>
                    <h1>{unit.name}</h1>
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
                        <div id='score'>
                            <ScoreView />
                        </div>
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
                        <div id='timer-bar'>
                            <progress value={state.questionResponseTime - remainingTime} max={state.questionResponseTime}></progress>
                        </div>
                        {/* Conditional Rendering within JSX: display error message if showErrorMessage is true */}
                        {state.showErrorMessage && 
                            <div id='error'>
                                <h2 id='error-message'>Incorrect answer!</h2>
                                <h3 id='error-message'>
                                    The right answer is : {state.questions[state.currQuestionIndex].answer}
                                </h3>
                            </div>
                        }
                        {state.showCorrectMessage && 
                            <div id='correct'>
                                <h2 id='correct-message'>Correct answer! Good job!</h2>
                            </div>
                        }
                    </div>
                    <div id='postgame'>
                        <h2 id='win-text'>Congratulations, you win!</h2>
                        <h2 id='lose-text'>Sorry, you lose. Better luck next time!</h2>
                        <button className='btn btn-primary' onClick={playAgain}>Play Again</button>
                    </div>
                </div>
                <div id="tutorial">
                    <p> <b>How to win:</b> Read a grammar question and determine which choice to select. <br></br>
                    You win when the score board has 5 green dots and lose when it has 3 red dots. <br></br> 
                    The more difficult the level you select, the shorter time limit you have for each<br></br>
                    question. The time limit will be shown in the progress bar at the bottom. <br></br> 
                    <b>Good Luck!</b> </p>
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