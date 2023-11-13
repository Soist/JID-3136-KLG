import React,{useState} from 'react';
import './Register.css';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity,View} from 'react-native';
import { Link } from 'react-router-dom';
import { ABOUT_PATH, REGISTER_PATH } from '../../constants';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";


function Register() {
    const [theEmail, setTheEmail]= useState('');
    const [thePassword, setThePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH
    const nav = useNavigate()
    const signUp = async () => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth,theEmail,thePassword)
            nav('/')
        } catch (error){
            alert("Registration failed " + error.message)
        }finally{
            setLoading(false)
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
                style={{paddingBottom:40}}>
                    REGISTER
                </h1>
                <h5>NAME</h5>
                <TextInput
                style = {{borderWidth:1, width:"80%",height:40,color:'rgb(0,0,0,.15'}}
                placeholder='  John Doe'
                placeholderTextColor={'rgb(0,0,0,.15'}
                />
                <h5
                style={{paddingBottom:0,paddingTop:10}}
                >EMAIL</h5>
                <TextInput
                style = {{borderWidth:1, width:"80%",height:40,color:'rgb(0,0,0,.15'}}
                value = {theEmail}
                placeholder='  Email'
                onChangeText={(text) => setTheEmail(text)}
                placeholderTextColor={'rgb(0,0,0,.15'}
                />
                <h5
                style={{paddingBottom:0,paddingTop:10}}
                >PASSWORD</h5>
                <TextInput
                style = {{borderWidth:1, width:"80%",height:40,color:'rgb(0,0,0,.15'}}
                value ={thePassword}
                placeholder='  Password'
                onChangeText={(text)=>setThePassword(text)}
                secureTextEntry={true}
                placeholderTextColor={'rgb(0,0,0,.15'}
                />
                <View
                style={{backgroundColor:"white",width:"100%",height:"26%",justifyContent:"center",paddingTop:20,paddingBottom:20}}
                >
                    <TouchableOpacity
                    onPress={signUp}
                    style={{backgroundColor:"white",width:"20%",justifyContent:'center',alignItems:'center'}}
                    >
                        <View
                        style={{borderWidth:0, width:"100%", justifyContent:"center",alignItems:"center",backgroundColor:'rgb(227,9,103)'}}
                        >
                            <h5
                            style={{color:"white",marginTop:"3%"}}
                            >FINISH</h5>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Register