
const functions = require('firebase-functions');
const express = require('express');
const impCtrls = require ('./api/functions.js');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const cors = require('cors');


//Middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  console.log('Entro a routeador..')
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({origin:true}));


//Enrutamiento
app.get('/', impCtrls.test);
app.get('/medicamentos', impCtrls.getMedicamentos);
app.post('/medicamentos', impCtrls.createMedicamento);
app.del('/medicamentos:id', impCtrls.getMedicamentos);
app.get('/medicos', impCtrls.getMedicos);
app.get('/asignaciones', impCtrls.getAsignaciones);
app.post('/asignaciones', impCtrls.setAsignation);


app.listen(app.get('port'), () => {console.log("La API se Incio...", app.get('port'))});

exports.app = functions.https.onRequest(app);