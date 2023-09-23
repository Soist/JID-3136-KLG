import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SUGAR_HONEYCOMBS, STUDY_OPTIONS_PATH } from '../../constants';
import './StudyOptionsPage.css';

function GrammarOptionsPage() {
    const location = useLocation();
    const unit = location.state;

    return (
        <div id='study-options-page-container'>
            <h1>{unit.name} Vocabulary</h1>
            <Link to={SUGAR_HONEYCOMBS} state={unit}>
                <button className='btn btn-primary'>
                    {'Sugar Honeycombs'}
                </button>
            </Link>
            <Link to={STUDY_OPTIONS_PATH} state={unit}>
                <button className='btn btn-primary'>
                    {'Back'}
                </button>
            </Link>
        </div>
    );
}

export default GrammarOptionsPage;