
const functions = require('firebase-functions');
const express = require('express');
const impCtrls = require ('./api/functions.js');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const cors = require('cors');


//Middlewares
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({origin:true}));


//Enrutamiento INICIO
app.get('/', impCtrls.test);

//Enrutamiento Medicamentos..
app.get('/medicamentos', impCtrls.getMedicamentos);
app.get('/medicamentos/:refId', impCtrls.getMedicamento);
app.post('/medicamentos', impCtrls.createMedicamento);
app.put('/medicamentos/control/:refId', impCtrls.putControlMedicamento);
app.put('/medicamentos/load/:refId', impCtrls.putLoadMedicamento);
app.delete('/medicamentos/:refId', impCtrls.delMedicamento);

//Enrutamiento Controles y Cargas
// app.get('/controles', impCtrls.getMedicos);
// app.get('/cargas', impCtrls.getMedicos);

//Enrutamiento Asignaciones
app.get('/asignaciones', impCtrls.getAsignaciones);
app.get('/asignaciones/:refId', impCtrls.getAsignacion);
app.post('/asignaciones', impCtrls.setAsignation);
app.delete('/asignaciones/:refId', impCtrls.delAsignaciones);


app.listen(app.get('port'), () => {console.log("La API se Incio...", app.get('port'))});

exports.app = functions.https.onRequest(app);