import React, { useState } from 'react';
import './Login.css';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity,View,Text} from 'react-native';
import { Link } from 'react-router-dom';
import { ABOUT_PATH, FORGOT_PASSWORD_PATH, REGISTER_PATH } from '../../constants';
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
       
        <View
        style={{backgroundColor:"white",width:"100%",height:"100%",alignItems:'center',justifyContent:'center'}}
        >
            <View
            style={{backgroundColor:"white",width:"30%"}}
            >
                <h1
                style={{paddingBottom:60}}
                >LOGIN</h1>
                <h5
                style={{}}
                >EMAIL</h5>
                <TextInput
                style = {{borderWidth:1, width:"80%",height:40,color:'rgb(0,0,0,.15'}}
                value = {theEmail}
                inputMode='email'
                textAlign='center'
                placeholder='  fakeEmail@gatech.edu'
                placeholderTextColor={'rgb(0,0,0,.15'}
                
                onChangeText={(text) => setTheEmail(text)}
                />
                <h5
                style={{}}
                >PASSWORD</h5>
                <TextInput
                style = {{borderWidth:1, width:"80%",height:40,color:'rgb(0,0,0,.15'}}
                textAlign='center'
                value ={thePassword}
                placeholder='  Password'
                placeholderTextColor={'rgb(0,0,0,.15'}
                onChangeText={(text)=>setThePassword(text)}
                secureTextEntry={true}
                />
                <View
                style={{backgroundColor:"white",width:"100%",height:"30%",flexDirection:'row',alignItems:"center",paddingTop:20}}
                >
                    <TouchableOpacity
                    onPress={signIn}
                    style={{backgroundColor:"white",width:"20%",justifyContent:'center',alignItems:'center'}}
                    >
                        <View
                        style={{borderWidth:0, width:"100%", justifyContent:"center",alignItems:"center",backgroundColor:'rgb(227,9,103)'}}
                        >
                            <h5
                            style={{color:"white",marginTop:"3%"}}
                            >LOGIN</h5>
                        </View>
                    </TouchableOpacity>
                    <View 
                    style={{backgroundColor:"white", width:"30%",height:"10%",marginLeft:"20%"}}
                    >
                        <Link to={FORGOT_PASSWORD_PATH} className="forgot-password-link">
                            Forgot Password?
                        </Link>
                    </View>
                </View>
                <View
                style={{backgroundColor:"white",width:"100%",height:50,flexDirection:'row',alignItems:"center"}}
                >
                    <Text
                    style={{paddingRight:20}}
                    >
                        Don't have an account?
                    </Text>
                    <Link to={REGISTER_PATH} className="register-link">
                        Register
                    </Link>
                </View>
            </View>
        </View>
    )
}

export default Login