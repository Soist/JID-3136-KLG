import React,{useState} from 'react';
import './Register.css';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity,View} from 'react-native';
import { Link } from 'react-router-dom';
import { ABOUT_PATH, REGISTER_PATH } from '../../constants';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


function Register() {
    const [theEmail, setTheEmail]= useState('');
    const [thePassword, setThePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH
    const signUp = async () => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth,theEmail,thePassword)
            alert("check email for verification!")
        } catch (error){
            alert("Registration failed " + error.message)
        }finally{
            setLoading(false)
        }
        
    }
    return (
        <div className='about-container' >
            <h1
            style={{paddingBottom:40}}
            >Register</h1>
            <div className="student-box-container">
                <div className="student-box">
                    <h3>Name</h3>
                    <TextInput
                    style = {{borderWidth:2}}
                    placeholder='John Doe'
                    />
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
                    onPress={signUp}
                    >
                        <View
                        style={{borderWidth:2, marginTop:13,width:80, height:30, justifyContent:"center",alignItems:"center"}}
                        >
                            <h4>Finish</h4>
                        </View>
                    </TouchableOpacity>
                </div>
                
            </div>
        </div>
    )
}

export default Register