import React, { useState } from 'react';
import './Logout.css';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity,View} from 'react-native';
import { Link } from 'react-router-dom';
import { ABOUT_PATH, REGISTER_PATH } from '../../constants';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { HOME_PATH } from '../../constants';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";


const Logout = () => {
    const [theEmail, setTheEmail]= useState('');
    const [thePassword, setThePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH
    const navigate = useNavigate()
    
    const signIn = async () => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth,theEmail,thePassword)
        } catch (error){
            alert("login failed " + error.message)
            navigate('/')
        }finally{
            setLoading(false)
            
        }

    }

    const signOut = async () =>{
        setLoading(true)
        try {
            const response = await FIREBASE_AUTH.signOut()
        } catch (error){
            alert("signout failed " + error.message)
            
        }finally{
            setLoading(false)
            navigate('/')
        }
    }
    return (
        <div className='about-container' >
            <h1
            style={{paddingBottom:40}}
            >ARE YOU SURE YOU WISH TO LOGOUT?</h1>
            <div className="student-box-container">
                <div className="student-box">
                    <TouchableOpacity
                    onPress={()=>signOut()}
                    >
                        <h2>
                            YES
                        </h2>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{paddingTop:30}}
                    onPress={()=>navigate('/')}
                    >
                        <h2>
                            NO
                        </h2>
                    </TouchableOpacity>
                </div>
            </div>
        </div>
    )
}

export default Logout