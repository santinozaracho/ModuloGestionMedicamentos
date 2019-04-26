var config = {
    apiKey: "AIzaSyChQ6N90t8UWHJJ8kF1PxRC1Tk2OXg62XQ",
    authDomain: "modulogestionmedicamentos.firebaseapp.com",
    databaseURL: "https://modulogestionmedicamentos.firebaseio.com",
    projectId: "modulogestionmedicamentos",
    storageBucket: "modulogestionmedicamentos.appspot.com",
    messagingSenderId: "51202560735"
};
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
// const engines = engine('consolidate');
const app = express();
const gestionMedicamentos = firebase.initializeApp(config);
// const base = gestionMedicamentos.firestore();
// Datos
// const asignaciones = base.child('asignaciones');
// const medicamentos = base.child('medicamentos');

//app.engine('hbs', engines.handlebars);
// app.set('views', '/.views');
// app.set('view engine', 'hbs');

app.get('/firstGet', (request, response) => {
    response.json({ text: "Medicamentossssssssssssssssssssssssss Debrita" });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);