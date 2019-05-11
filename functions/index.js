
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const cors = require('cors');
//Conexion a bd
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

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
};
var getAsignaciones = function (req, res, next) {  
	let datos = [];
    asignacionesRef.get().then((querySnapshot) => {
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
};
var getMedicos = function (req, res, next) {  
	let datos = [];
    medicosRef.get().then((querySnapshot) => {
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
};
var setAsignation = function (req, res, next) {
	var newAssign = {};
	newAssign.medicMat = req.body.medicMat;
	newAssign.partList = req.body.partList;
	//Validating Info..
	if ( newAssign.medicMat && newAssign.partList.length > 0 ) {
		//Descontando Stock y capturamos estado
		var sDstatus = stockDisscount(newAssign.partList);
		
		if (sDstatus) {
			//Generamos la Partida y capturamos su estado
			var cAstatus = createAssign(newAssign);
			res.json(cAstatus);
		}else{
			res.json({error:"Error en Validacion de Stock."});
		}
		

	}else{
		res.json({error:"Error en Validacion de Datos."});
	}
};

var stockDisscount = function(array) {
	for (let item = 0; item < array.partList.length; item++) {
		var medRef = array[item].key;
		//Verificamos exsitencia de pedido.
		if ( array[item].cantidad > 0) {
			//Preparando el Decremento de Stock
			const decreaseBy = admin.firestore.FieldValue.increment( -array[item].cantidad);
			//Busqueda y Actaulizacion
			medicamentosRef.doc(medRef).update({cantidad:decreaseBy}).then((doc) => {
				if (doc.exists) {
				} else {
				console.log("No such document!");
				}
			})
		}
	}
};
var createAssign = function(newAssign){
	asignacionesRef.add(newAssign).then((docRef) => {
		console.log('Success!!',docRef);
		return {idReturn:docRef};  
		}).catch((err) => {
			console.log('Error getting documents', err);
			return {error:err}; 
      });
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
// router.get('/api/medicamentos', getMedicamentos );
// router.delete('/medicamentos:id', getMedicamentos );
// router.get('/medicos', test );
// router.get('/medi', test );

//Middlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({origin:true}));


//Enrutamiento
app.get('/medicamentos', getMedicamentos);
app.get('/medicos', getMedicos);
app.get('/asignaciones', getAsignaciones);
app.post('/asignaciones', setAsignation);
// app.use('/api', function (req, res, next) {
// 	console.log('Prueba');
// 	next();
//   });

app.listen(app.get('port'), () => {console.log("La API se Incio...", app.get('port'))});

exports.app = functions.https.onRequest(app);