import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity,View,Text, FlatList} from 'react-native';
import { Link } from 'react-router-dom';
import { ABOUT_PATH, FORGOT_PASSWORD_PATH, REGISTER_PATH } from '../../constants';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { HOME_PATH } from '../../constants';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const Feedback = () => {
    return (
        <View style={{backgroundColor:"white",alignItems:"center", flexDirection:'column'}}>
            <View 
            style={{backgroundColor:"white",width:500,height:250, flexDirection:"column",alignItems:'center', justifyContent:'center'}}
            >
                <Text style={{fontSize:40}}>SUBMIT FEEDBACK</Text>
                <TextInput
                placeholder='Type feedback to be addressed ...'
                placeholderTextColor={'rgb(0,0,0,.15'}
                style={{backgroundColor:"white", height:60,width:"55%",borderWidth:2,borderRadius:10}}
                ></TextInput>
            </View>
            <View
            style={{backgroundColor:"white",width:700, height: 400, flexDirection:"column",alignItems:"center"}}
            >
                <Text style={{fontSize:40}}>CURRENT FEEDBACKS</Text>
                <FlatList
                style={{paddingTop:20}}
                data={[
                {key: "- Please increase the color contrast on the game because it's difficult to see "},
                {key: '- The chat bot is a little repetitive.'},
                {key: '- The cookie game is fun'},
                
                ]}
                renderItem={({item}) => <Text style={{fontSize:20}}>{item.key}</Text>}
                />
            </View>
            
        </View>
    )
}

export default Feedback