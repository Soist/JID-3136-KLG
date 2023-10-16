import React, { useState } from 'react';
import './ForgotPassword.css';
import { TextInput, TouchableOpacity, View} from 'react-native';
import { REGISTER_PATH } from '../../constants';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    const [theEmail, setTheEmail]= useState('');
    // const [thePassword, setThePassword] = useState('');
    const [sent, setSent] = useState(false);
    const auth = FIREBASE_AUTH;
    
    const sendEmail = async () => {
        try {
            await sendPasswordResetEmail(auth, theEmail);
            setSent(true);
        } catch (error) {
            alert("Firebase failure: " + error.message)
        }
    }

    return (
        <div className='about-container' >
            <h1
            style={{paddingBottom:40}}
            >Forgot Password</h1>
            <div className="student-box-container">
                {!sent? <div className="student-box">
                    <p>If you do not have an account, <a href={REGISTER_PATH}>click here</a> to set up a new account. Type the email address associated with your account in the field below to recieve a validation code by email.</p>
                    <h3>Email Address</h3>
                    <TextInput
                    style = {{borderWidth:2}}
                    value = {theEmail}
                    placeholder='Email'
                    onChangeText={(text) => setTheEmail(text)}
                    />
                    <TouchableOpacity
                    onPress={sendEmail}
                    >
                        <View
                        style={{borderWidth:2, marginTop:13,width:150, height:30, justifyContent:"center",alignItems:"center"}}
                        >
                            <h4>Send Email</h4>
                        </View>
                    </TouchableOpacity>
                </div> :
                <div className="student-box">
                    <p>Please check your {theEmail} inbox for a link to reset your password.</p>
                </div>}
            </div>
        </div>
    )
}

export default ForgotPassword