
//Conexion a bd
var admin = require("firebase-admin");
var FieldValue = admin.firestore.FieldValue;
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

var getMedicamentos = (req, res, next) => {  
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
var getAsignaciones = (req, res, next) => {  
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
var getMedicos = (req, res, next) => {  
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
let docId


var setAsignation = (req, res, next) => {
	var newAssign = {};
	newAssign.medicId = req.body.medicId;
	newAssign.partList = req.body.partList;
	//Validating Info..
	if ( newAssign.medicId && newAssign.partList.length > 0 ) {
		//Descontando Stock y capturamos estado
		var sDstatus = stockDisscount(newAssign.partList);
		
		if (sDstatus) {
			//Generamos la Partida y capturamos su estado
			let cAstatus = createAssign(newAssign);
			res.status(201).send("key "+ cAstatus +""+ docId);
		}else{
			res.end({error:"Error en Validacion de Stock."});
		}
	}else{
		res.end({error:"Error en Validacion de Datos.",newAssign});
	}
};


var stockDisscount = async (array) => {
	console.log(array);	
	for (let item = 0; item < array.length; item++) {
		var medKey = array[item].key;
		//Verificamos exsitencia de pedido.
		if (array[item].cantidad > 0 && medKey) {
			//Preparando el Decremento de Stock
			const decreaseBy = FieldValue.increment(-parseInt(array[item].cantidad));
			//Busqueda y Actaulizacion
			medicamentosRef.doc(medKey).update({"cantidad":decreaseBy,"updatedDate":FieldValue.serverTimestamp()})
			.then((doc) => {
				console.log("okay disscount");
				})
			.catch((error) => {
				console.error("Error updating document: ", error);
				return error
			});
		}else{
			return "un medicamento con valor negativo o no se recibio key."
		}
	}
	return true
};
let createAssign = async (newAssign) => {
	//Pegamos la Hora de creacion
	newAssign.partDate = FieldValue.serverTimestamp();
	//Añadimos
	asignacionesRef.add(newAssign)
	.then( (docRef) => {
		console.log("Success!!!"+ docRef.id);})
	.catch((err) => {
			console.log('Error getting documents', err);});
};
let createMedicamento = (req, res, next) => {
	let newMed = req.body
	//Pegamos la Hora de creacion
	newMed.LoadDate = FieldValue.serverTimestamp();
	newMed.cantidad=parseInt(newMed.cantidad);
	delete newMed.validated;
	//Añadimos
	medicamentosRef.add(newMed)
	.then( (docRef) => {
		res.status(201).send(docRef.id)
		console.log("Success!!!"+ docRef.id);})
	.catch((err) => {
		res.status(401).send(err)
		console.log('Error getting documents', err);});
};
let updateMedic =(req,res,next)=>{

};

var test = function (req, res, next) {
  res.json({test:"Testeando Rutas"});
  next()
};

module.exports = {getAsignaciones,getMedicamentos,getMedicos,setAsignation,test,createMedicamento}