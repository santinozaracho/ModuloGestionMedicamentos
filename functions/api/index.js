const express = require('express');
const router = express.Router();

//Conexion a bd
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Example de usar where y orderby
// var biggest = citiesRef.where('population', '>', 2500000).orderBy('population').limit(2);
//Referencias a las tablas..
var medicamentosRef =  admin.firestore().collection('medicamentos');
var asignacionesRef =  admin.firestore().collection('asignaciones');
var medicosRef =  admin.firestore().collection('medicos');

//Funciones de respuesta
var getMedicamentos = function (req, res, next) {  
	let datos = [];
    medicamentosRef.get().then((querySnapshot) => {
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
  next()
};
var test = function (req, res, next) {
  res.json({test:"Testeando Rutas"});
  next()
};

//Middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  console.log('Entro a routeador..')
  next()
})
// router.use('/medicamentos', function(req, res, next) {
//   console.log('Request URL:', req.originalUrl);
//   next();
// }, function (req, res, next) {
//   console.log('Request Type:', req.method);
//   next();
// });

//Enroutamiento
router.get('/medicamentos', getMedicamentos );
// router.delete('/medicamentos:id', getMedicamentos );
// router.get('/medicos', test );
// router.get('/medi', test );

//export
module.export = router;