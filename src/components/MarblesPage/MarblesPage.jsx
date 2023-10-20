import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import backgroundImg from './resouces/marbles_bg1.png';
import './MarblesPage.css';

function MarblesPage() { 
    const location = useLocation();
    const unit = location.state; 

    function startGame() {

    }

    return (
        <div id="marbles-full-container">
            <img id="background" src={backgroundImg} alt="Marbles" />
            <div id="empty-div"></div>
            <div id='marbles-container' style={{paddingTop: '5em'}}>
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
                        </div>
                        <button className='btn btn-primary' onClick={startGame} >Start Game</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarblesPage;