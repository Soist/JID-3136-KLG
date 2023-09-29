import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FLASHCARD_STUDY_PATH, VOCAB_OPTIONS_PATH,
    GRAMMAR_OPTIONS_PATH, LISTEN_OPTIONS_PATH,
    UNITS_LIST_PATH } from '../../constants';
import './StudyOptionsPage.css';

function StudyOptionsPage() {
    const location = useLocation();
    const unit = location.state;

    return (
        <div id='study-options-page-container'>
            <h1>{unit.name}</h1>
            <Link to={FLASHCARD_STUDY_PATH} state={unit}>
                <button className='btn btn-primary'>
                    {'Flashcards'}
                </button>
            </Link>
            <Link to={VOCAB_OPTIONS_PATH} state={unit}>
                <button className='btn btn-primary'>
                    {'Vocabulary Game'}
                </button>
            </Link>
            <Link to={GRAMMAR_OPTIONS_PATH} state={unit}>
                <button className='btn btn-primary'>
                    {'Grammar Game'}
                </button>
            </Link>
            <Link to={LISTEN_OPTIONS_PATH} state={unit}>
                <button className='btn btn-primary'>
                    {'Listening Game'}
                </button>
            </Link>
            <Link to={UNITS_LIST_PATH}>
                <button className='btn btn-primary'>
                    {'Back'}
                </button>
            </Link>
        </div>
    );
}

export default StudyOptionsPage;