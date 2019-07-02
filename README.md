#TP Grupo 02, React.js - Firebase - Node.js - Express
Dejo a disposición un prototipo de la aplicación en la siguiente [dirección](https://modulogestionmedicamentos.firebaseapp.com) En el archivo "Index.js" se encuentra codigo en Node.js con Express, donde se ven definidas las siguientes rutas, que son para compartir con otro grupo. //Enrutamiento INICIO app.get('/', impCtrls.test);

//Enrutamiento Medicamentos.. app.get('/medicamentos', impCtrls.getMedicamentos); https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos //Devuelve la Lista de Medicamentos y su Stock con el siguiente formato .Json:
```json
{
    "id": "W9bwSKgaUt096j6kGQgI",
    "name": "Actron 400",
    "drug": {
      "name": "Ibuprofeno 400"
    },
    "laboratory": "Bayer",
    "presentation": "10 Comprimidos",
    "stock": 47,
    "loadDate": "2019-6-26 02:26:07"
  }
```


//Enrutamiento Asignaciones app.post('/asignaciones', impCtrls.setAsignation); https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/asignaciones //Permite pasar un .Json que debe tener: medicId y el partList, la cual contiene un array con los medicamentos seleccionados, su respectiva "key" y cantidad. Como respuesta del POST se devuelve codigo 201 (de Creacion) y la respectiva "key" para almacenar en el espacio asignado a la consulta clinica..

EJEMPLO DE POST: 
```json
{
    "medicId": 4,
    "date": "2019-06-14 16:45:00",
    "medicinePrescriptions": [
      {
        "quantity": 3,
        "medicineId": "bhaLUPjvNDiloz0J2Qsw"
      },
      {
        "quantity": 1,
        "medicineId": "tPRXYfUpRmCVRlAR4ncJ"
      }
    ]
  }
```
