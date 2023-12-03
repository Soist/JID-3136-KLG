import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shuffleArray } from '../../utils';
import { getVocab } from '../../vocabData';
import Score0 from './resources/score0.png';
import Score1 from './resources/score1.png';
import Score2 from './resources/score2.png';
import Score3 from './resources/score3.png';
import Score4 from './resources/score4.png';
import Score5 from './resources/score5.png';
import Score6 from './resources/score6.png';
import Score7 from './resources/score7.png';
import Score8 from './resources/score8.png';
import { ReactComponent as CircleSvg } from '../../SharedImages/Circle.svg'
import { ReactComponent as FlagSvg } from '../../SharedImages/Flag.svg'
import { ReactComponent as SkullSvg } from '../../SharedImages/Skull.svg'
import './TugOfWarPage.css'
import {getProgress} from "../../ProgressDummyData";
import {VOCAB_OPTIONS_PATH} from '../../constants';

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

function TugOfWarPage() {
    const location = useLocation();
    const unit = location.state;

    const [state, setState] = useState({
        questions: getVocab(unit.number),
        currQuestionIndex: 0,
        score: 3,
        answerLanguage: 'korean',
    });
    const questions = state.questions;
    const currQuestionIndex = state.currQuestionIndex;
    const answerLanguage = state.answerLanguage;
    const currScore = state.score;
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showCorrectMessage, setCorrectMessage] = useState(false);

    function startGame() {
        const languageRadioButton = document.querySelector('input[name="answer-language"]:checked');
        if (languageRadioButton === null) {
            return;
        }
        const answerLanguage = languageRadioButton.value === "korean" ? "korean": "english_literal";

        document.getElementById('pregame').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('win-text').style.display = 'none';
        document.getElementById('lose-text').style.display = 'none';

        const questions = state.questions;
        shuffleArray(questions);

        console.log(answerLanguage);

        setState({
            questions: questions,
            currQuestionIndex: 0,
            score: 3,
            answerLanguage: answerLanguage,
        });

        const scoreChildren = document.getElementById('score').childNodes;
        for (let i = 0; i < scoreChildren.length; i++) {
            scoreChildren[i].classList.remove('red', 'green');
        }

        document.getElementById('score').style.display = 'flex';
        document.getElementById('game').style.display = 'flex';
    }

    function submitAnswer() {
        
        const submission = document.getElementById('answer-input').value;

        getProgress(unit.number)[1].tug++

        let correctAnswers = questions[currQuestionIndex][answerLanguage]
        if (!Array.isArray(correctAnswers)){
            correctAnswers = [correctAnswers]
        }

        if (correctAnswers.includes(submission)) {
            document.getElementById('answer-input').value = '';
            getProgress(unit.number)[0].tug++
            setCorrectMessage(true);

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
            setTimeout(() => {
                setCorrectMessage(false);
                setState({ ...state, currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length, score: newScore });
            }, 2500);
            
        } else {
            setShowErrorMessage(true);
            document.getElementById('answer-input').value = '';
            const newScore = currScore - 1;
            setTimeout(() => {
                setShowErrorMessage(false);
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
                setState({ ...state, currQuestionIndex: (state.currQuestionIndex + 1) % state.questions.length, score: newScore });
            }, 6000);
            
        }
    }

    console.log(state.questions[state.currQuestionIndex]);

    return (
        <div id='tug-of-war-container'>
            <img className='background' src={BACKGROUND_IMAGES[state.score]} alt='Tug of War' />
            <div id='header'>
                <h1>{unit.name}</h1>
                <div id='score'>
                    <ScoreView />
                </div>
                <div id='pregame'>
                    <div id='settings'>
                        <b>Answer Language:</b>
                        <input type="radio" id="korean" name="answer-language" value="korean"></input>
                        <label for="korean">Korean</label>
                        <input type="radio" id="english" name="answer-language" value="english"></input>
                        <label for="english">English</label>
                    </div>
                    <button className='btn btn-primary' onClick={startGame}>Start Game</button>
                </div>
                <div id='game'>
                    {showErrorMessage && 
                        <div id='error'>
                            <h2 id='error-message'>Incorrect answer!</h2>
                            <h3 id='error-message'>
                                The right answer is : {
                                        Array.isArray(questions[currQuestionIndex][answerLanguage]) ?
                                        questions[currQuestionIndex][answerLanguage].map((item, idx) => (<li key={idx}>{item}</li>)) :
                                        questions[currQuestionIndex][answerLanguage]
                                    }
                            </h3>
                        </div>
                    }
                    {showCorrectMessage && 
                        <div id='correct'>
                            <h2 id='correct-message'>Correct answer! Good job!</h2>
                        </div>
                    }
                    <div id='question'>
                        <h2>What is <span id="question-text">{state.answerLanguage === 'korean' ? state.questions[state.currQuestionIndex].english : state.questions[state.currQuestionIndex].korean}</span> in {state.answerLanguage === 'korean' ? 'Korean':'English'}?</h2>
                    </div>
                    <div id='answer'>
                        <input id='answer-input' type='text' autoComplete='off' onKeyDown={(event) => { if (event.key === 'Enter') submitAnswer(); }} />
                        <button className='btn btn-primary' onClick={submitAnswer}>Submit</button>
                    </div>
                </div>
                <div id='postgame'>
                    <h2 id='win-text'>You win!</h2>
                    <h2 id='lose-text'>You lose!</h2>
                    <button className='btn btn-primary' onClick={startGame}>Play Again</button>
                </div>
            </div>
            <Link to={VOCAB_OPTIONS_PATH} state={unit} >
                    <button className='btn btn-back'>
                        {'Back'}
                    </button> 
            </Link>
        </div>
    );
}

export default TugOfWarPage;