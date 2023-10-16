import React from 'react';
import { Link } from 'react-router-dom';
import { CHATBOX_PATH, HOME_PATH, UNITS_LIST_PATH, ABOUT_PATH, PROGRESS_PATH, LOGIN_PATH, LOGOUT_PATH } from '../../constants';
import KLGLogo from './klglogo.png'
import './Navbar.css';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function Navbar() {
    // const click = useState(false);
    // const [click, setClick] = useState(false);
    // const handleClick = () => setClick(!click);
    //const [user, setUser] = useState<User | null>(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) =>{
            console.log("fresh")
            console.log(user)
            setUser(user)
        });
    })
    
    return (
        <nav className="navbar">

            <div className="logo">
                <Link to={HOME_PATH} className="navbar-logo">
                    <img src={KLGLogo} alt="KLG" width="50" height="50"/>
                </Link>
            </div>
            
            <div className="other-links">
                <ul className='nav-menu'>
                    <li className="nav-item">
                        <Link to={UNITS_LIST_PATH} className="nav-links">
                            Units
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={ABOUT_PATH} className="nav-links">
                            About
                         </Link>
                        
                    
                    </li>
                    <li className="nav-item">
                        <Link to={CHATBOX_PATH} className="nav-links">
                            Chat
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={PROGRESS_PATH} className='nav-links'>
                            Progress
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li className='nav-item'>
                        {user ? (
                        <Link to={LOGOUT_PATH} className='nav-links'>
                            Log out
                        </Link>) 
                        : 
                        (
                        <Link to={LOGIN_PATH} className='nav-links'>
                            Login
                        </Link>
                        )}
                        
                    </li>
                    <li>
                        {user ? (
                            <h4
                            style={{color:"pink" }}
                            >{user.email}</h4>
                        ) : (
                            <h2></h2>
                        )}
                    </li>
                </ul>
            </div>
            
        </nav>
    )
}

export default Navbar
