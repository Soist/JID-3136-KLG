import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RED_LIGHT_GREEN_LIGHT_PATH, TUG_OF_WAR_PATH, STUDY_OPTIONS_PATH } from '../../constants';
import './StudyOptionsPage.css';

function VocabOptionsPage() {
    const location = useLocation();
    const unit = location.state;

    return (
        <div id='study-options-page-container'>
            <h1>{unit.name} Vocabulary</h1>
            <Link to={RED_LIGHT_GREEN_LIGHT_PATH} state={unit}>
                <button className='btn btn-primary'>
                    {'Red Light Green Light'}
                </button>
            </Link>
            <Link to={TUG_OF_WAR_PATH} state={unit}>
                <button className='btn btn-primary'>
                    {'Tug of War'}
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

export default VocabOptionsPage;