import React, { Component } from 'react';
import {Container,Row,Col,CardColumns} from 'react-bootstrap';
import firebase from '../../DataBase';

import CreateMedic from './CreateMedic';
import ShowMedic from './ShowMedic';

class ViewMedics extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('medicamentos');
    this.unsubscribe = null;
    this.state = {
      medicamentos: []
    };
    this.handleAddMedic = this.handleAddMedic.bind(this);
    this.removeMedic = this.removeMedic.bind(this);
    // this.onUpdateCollection = this.onUpdateCollection.bind(this);

  }

  // onCollectionUpdate = (querySnapshot) => {
  //   const medicamentos = [];
  //   querySnapshot.forEach((doc) => {
  //     medicamentos.push({
  //       key: doc.id,
  //       data: doc.data()
  //     });
  //   });
  //   this.setState({
  //     medicamentos
  //  });
  // }

  componentDidMount() {
    // this.unsubscribe = this.ref.onSnapshot(this.onUpdateCollection);
    fetch('http://localhost:5000/modulogestionmedicamentos/us-central1/app/medicamentos')
    .then((response) => {
      return response.json();})
    .then((myJson) => {
      let medicamentos = [];
      myJson.map( (item) => {
        medicamentos.push(item); 
      });
      this.setState({medicamentos})
    });
  }

  removeMedic(idData) {
    this.ref.doc(idData).delete().then( () => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  handleAddMedic(medic) {
    // this.setState({
    //   medicamentos: [...this.state.medicamentos, medic]
    // })
  }



  render() {
    console.log("Procesando");
    const medicamentos = this.state.medicamentos.map((medic) => {
      console.log(medic)
      return (
        <ShowMedic key={medic.key} data={medic.data}/>
      )
    });

    // RETURN THE COMPONENT
    return (
        <Container className="mt-4">
          <Row>
            <Col lg={4}>
              <CreateMedic onAddMedic={this.handleAddMedic}/>
            </Col>
            <Col lg={8}>
              <CardColumns>
                {medicamentos}
              </CardColumns>
            </Col>     
          </Row>
         </Container>

    );
  }
}

export default ViewMedics;
