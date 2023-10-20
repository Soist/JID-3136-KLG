import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { STUDY_OPTIONS_PATH, SUGAR_HONEYCOMBS } from '../../constants';
import './StudyOptionsPage.css';

function ListenOptionsPage() {
    const location = useLocation();
    const unit = location.state;

    return (
        <div id='study-options-page-container'>
            <h1>{unit.name} Listening</h1>
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

export default ListenOptionsPage;