
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
// const engines = engine('consolidate');
const app = express();

//Obtenemos las rutas de Medicamento

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// This is the router which will be imported in our
// middleware that is specific to this router
// medicRouter.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
//   });
// api hub (the index.ts which will be sent to Firebase Functions).

var medicamentos =  admin.firestore().collection('medicamentos');

app.get('/api', function (req, res) {
    console.log("Consutla");
	let datos = [{test:"Hola es TEST"}];
    medicamentos.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            datos.push({
                key: doc.id,
                data: doc.data()
				});
			
            });
		res.json(datos);  
		}).catch((err) => {
			console.log('Error getting documents', err);
			res.send(err); 
		  });
    
});

// const medicamentos = require("./api/medicamentos/index.js");

//app.engine('hbs', engines.handlebars);
// app.set('views', '/.views');
// app.set('view engine', 'hbs');

//Config

//Middlers


app.use(express.json());
app.use(express.urlencoded({extended:false}));
//bd

app.listen(app.get('port'), () => {console.log("La API se Incio...")});

// Any requests to /api/users will be routed to the user router!
// app.use("/medicamentos", medicamentos);

// Again, lets be nice and help the poor wandering servers, any requests to /api
// that are not /api/users will result in 404.
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);