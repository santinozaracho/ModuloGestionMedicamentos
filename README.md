#TP Grupo 02, React.js - Firebase - Node.js - Express
Dejo a disposición un prototipo de la aplicación en la siguiente [dirección](https://modulogestionmedicamentos.firebaseapp.com) En el archivo "Index.js" se encuentra codigo en Node.js con Express, donde se ven definidas las siguientes rutas, que son para compartir con otro grupo. //Enrutamiento INICIO app.get('/', impCtrls.test);

//Enrutamiento Medicamentos.. app.get('/medicamentos', impCtrls.getMedicamentos); https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos //Devuelve la Lista de Medicamentos y su Stock en formato .Json como un array de un objeto que contiene key y data; dentro de data se encuentra todo lo necesario.

//Enrutamiento Asignaciones app.post('/asignaciones', impCtrls.setAsignation); https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/asignaciones //Permite pasar un .Json que debe tener: medicId y el partList, la cual contiene un array con los medicamentos seleccionados, su respectiva "key" y cantidad. Como respuesta del POST se devuelve codigo 201 (de Creacion) y la respectiva "key" para almacenar en el espacio asignado a la consulta clinica..

EJEMPLO DE POST: 
```json
{ "medicId": "MNXXX",**OBLIGATORIO "partList":[ { "key": "XXXXXXXXXXX",**OBLIGATORIO "cantidad": "XX",**OBLIGATORIO "codigo": "XXXXXX" }, { "key": "XXXXXXXXXXX",**OBLIGATORIO "cantidad": "XX",**OBLIGATORIO "codigo": "XXXXXX" }, { "key": "XXXXXXXXXXX",**OBLIGATORIO "cantidad": "XX",**OBLIGATORIO "codigo": "XXXXXX" } ] }
