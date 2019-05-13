import React, { Component } from 'react';
import {Container,Row,Col,CardColumns} from 'react-bootstrap';
import firebase from '../../DataBase';

import CreateMedic from './CreateMedic';
import ShowMedic from './ShowMedic';

class ViewLoads extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('medicamentos');
    this.unsubscribe = null;
    this.state = {
      medicamentos: []
    };
  
    // this.onUpdateCollection = this.onUpdateCollection.bind(this);

  }

  // onCollectionUpdate = (querySnapshot) => {
  //   const medicamentos = [];
  //   querySnapshot.forEach((doc) => {
  //     medicamentos.push({
  //       key: doc.id,
  //       data: doc.data()
  //     });0
  //   });
  //   this.setState({
  //     medicamentos
  //  });
  // }

  componentDidMount() {
    // this.unsubscribe = this.ref.onSnapshot(this.onUpdateCollection);
    fetch('https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos')
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

  render() {
    console.log("Procesando");
    const medicamentos = this.state.medicamentos.map((medic) => {
      return (
        <ShowMedic key={medic.key} docRef={medic.key} accessMethod="loadMed" data={medic.data}/>
      )
    });

    // RETURN THE COMPONENT
    return (
        <Container className="mt-4">
          <Row>
            <Col lg={4}>
              <CreateMedic/>
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

export default ViewLoads;
