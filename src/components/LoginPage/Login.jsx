import React, { useState } from 'react';
import './Login.css';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity,View} from 'react-native';
import { Link } from 'react-router-dom';
import { ABOUT_PATH, REGISTER_PATH } from '../../constants';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { HOME_PATH } from '../../constants';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";


const Login = () => {
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
            
        }finally{
            setLoading(false)
            navigate('/')
        }

    }

    return (
        <div className='about-container' >
            <h1
            style={{paddingBottom:40}}
            >Login</h1>
            <div className="student-box-container">
                <div className="student-box">
                    <h3>Email</h3>
                    <TextInput
                    style = {{borderWidth:2}}
                    value = {theEmail}
                    placeholder='Email'
                    onChangeText={(text) => setTheEmail(text)}
                    />
                    <h3>Password</h3>
                    <TextInput
                    style = {{borderWidth:2}}
                    value ={thePassword}
                    placeholder='Password'
                    onChangeText={(text)=>setThePassword(text)}
                    secureTextEntry={true}
                    />
                    <TouchableOpacity
                    onPress={signIn}
                    >
                        <View
                        style={{borderWidth:2, marginTop:13,width:80, height:30, justifyContent:"center",alignItems:"center"}}
                        >
                            <h4>Login</h4>
                        </View>
                    </TouchableOpacity>
                </div>
                <div className="student-box">
                    <Link to={REGISTER_PATH} className="nav-links">
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

export default Login