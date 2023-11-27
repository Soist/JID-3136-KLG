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
        <View style={{backgroundColor:"green",alignItems:"center", flexDirection:'column'}}>
            <View 
            style={{backgroundColor:"orange",width:500,height:250, flexDirection:"column",alignItems:'center'}}
            >
                <Text>SUBMIT FEEDBACK</Text>
                <TextInput
                style={{backgroundColor:"blue", height:40,width:"55%"}}
                ></TextInput>
            </View>
            <View
            style={{backgroundColor:"red",width:700, height: 400, flexDirection:"column",alignItems:"center"}}
            >
                <Text>CURRENT FEEDBACKS</Text>
                <FlatList
                data={[
                {key: 'Devin'},
                {key: 'Dan'},
                {key: 'Dominic'},
                {key: 'Jackson'},
                {key: 'James'},
                {key: 'Joel'},
                {key: 'John'},
                {key: 'Jillian'},
                {key: 'Jimmy'},
                {key: 'Julie'},
                ]}
                renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
            
        </View>
    )
}

export default Feedback