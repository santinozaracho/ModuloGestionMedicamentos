var admin = require("firebase-admin");

// var serviceAccount = require("../../serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://modulogestionmedicamentos.firebaseio.com"
// });

// const express = require("express");
// // This is the router which will be imported in our
// let medicRouter = express();
// // middleware that is specific to this router
// // medicRouter.use(function timeLog(req, res, next) {
// //     console.log('Time: ', Date.now());
// //     next();
// //   });
// // api hub (the index.ts which will be sent to Firebase Functions).

// var medicamentos =  admin.firestore().collection('medicamentos');

// medicRouter.get('/', function (req, res) {
    
//     let datos = []
//     medicamentos.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             datos.push({
//                 key: doc.id,
//                 data: doc.data()
//                 });
//             });
//         });
//     res.json(datos);  
// });

module.export = medicRouter;