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
        <View
        style={{backgroundColor:"white",width:"100%",height:"100%",alignItems:'center',justifyContent:'center'}}
        >
            <View
            style={{backgroundColor:"white",width:"30%"}}
            >
                <h1
                style={{paddingBottom:40,paddingTop:10}}
                >FORGOT PASSWORD</h1>
                {!sent? <div className="student-box">
                    <p>If you do not have an account, <a style={{textDecoration:'none', color:"rgb(227,9,103)"}}href={REGISTER_PATH}>click here</a> to set up a new account. Type the email address associated with your account in the field below to recieve a validation code by email.</p>
                    <View
                    style={{width:"133%", backgroundColor:"white"}}
                    >
                        <h5>EMAIL ADDRESS</h5>
                        <TextInput
                        style = {{borderWidth:1, height:40,width:"70%"}}
                        value = {theEmail}
                        placeholder='  fakeEmail@gatech.edu'
                        placeholderTextColor={'rgb(0,0,0,.15'}
                        onChangeText={(text) => setTheEmail(text)}
                        />
                        <TouchableOpacity
                        onPress={sendEmail}
                        style={{backgroundColor:"white",width:"35%",height:"3%",justifyContent:'center',alignItems:'center'}}
                        >
                            <View
                            style={{borderWidth:0, width:"100%",height:31,justifyContent:"center",alignItems:"center",backgroundColor:'rgb(227,9,103)',marginTop:10}}
                            >
                                <h5
                                style={{color:"white",marginTop:"3%"}}
                                >SEND EMAIL</h5>
                            </View>
                        </TouchableOpacity>
                    </View>
                </div> :
                <div className="student-box">
                    <p>Please check your {theEmail} inbox for a link to reset your password.</p>
                </div>}
            </View>
        </View>
    )
}

export default ForgotPassword