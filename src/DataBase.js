import React, { Component } from 'react';
import firebase from 'firebase/app';
import firestore from 'firebase/firestore';


var config = {
    apiKey: "AIzaSyChQ6N90t8UWHJJ8kF1PxRC1Tk2OXg62XQ",
    authDomain: "modulogestionmedicamentos.firebaseapp.com",
    databaseURL: "https://modulogestionmedicamentos.firebaseio.com",
    projectId: "modulogestionmedicamentos",
    storageBucket: "modulogestionmedicamentos.appspot.com",
    messagingSenderId: "51202560735"
};

firebase.initializeApp(config);


export default firebase;
