import React, { useState } from 'react';
import './ForgotPassword.css';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity,View} from 'react-native';
import { Link } from 'react-router-dom';
import { ABOUT_PATH, REGISTER_PATH } from '../../constants';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { HOME_PATH } from '../../constants';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [theEmail, setTheEmail]= useState('');
    // const [thePassword, setThePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH
    const navigate = useNavigate()
    
    const signIn = async () => {
        setLoading(true)
        try {
            alert(theEmail);
            // const response = await signInWithEmailAndPassword(auth,theEmail,thePassword)
        } catch (error){
            alert("login failed " + error.message)
            
        }finally{
            setLoading(false)
            // navigate('/')
        }

    }

    return (
        <div className='about-container' >
            <h1
            style={{paddingBottom:40}}
            >Forgot Password</h1>
            <div className="student-box-container">
                <div className="student-box">
                    <p>If you do not have an account, <a href={REGISTER_PATH}>click here</a> to set up a new account. Type the email address associated with your account in the field below to recieve a validation code by email.</p>
                    <h3>Email Address</h3>
                    <TextInput
                    style = {{borderWidth:2}}
                    value = {theEmail}
                    placeholder='Email'
                    onChangeText={(text) => setTheEmail(text)}
                    />
                    <TouchableOpacity
                    onPress={signIn}
                    >
                        <View
                        style={{borderWidth:2, marginTop:13,width:150, height:30, justifyContent:"center",alignItems:"center"}}
                        >
                            <h4>Send Email</h4>
                        </View>
                    </TouchableOpacity>
                </div>
                <div className="student-box">
                    {/* <Link to={REGISTER_PATH} className="nav-links">
                        Forgot Password?
                    </Link>
                    <Link to={REGISTER_PATH} className="nav-links">
                        Create Account
                    </Link>
                    {/* <TouchableOpacity>
                        <View
                        style={{borderWidth:2, marginTop:13,width:"auto", height:30, justifyContent:"center",alignItems:"center"}}
                        >
                            <h4
                            >or Go to Register</h4>
                        </View>
                    </TouchableOpacity> */}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword