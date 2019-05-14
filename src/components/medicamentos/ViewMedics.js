import React, { Component } from 'react';
import {Container,Row,CardColumns} from 'react-bootstrap';

import ShowMedic from './ShowMedic';

class ViewMedics extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      medicamentos: []
    };

  }

 


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
    const medicamentos = this.state.medicamentos.map((assign) => {
      return (
        <ShowMedic onChange={this.componentDidMount} key={assign.key} docRef={assign.key} accessMethod="adminMed" data={assign.data}/>
      )
    });

    // RETURN THE COMPONENT
    return (
        <Container className="mt-4">
          <Row> 
            <CardColumns className="w-75 mx-auto">
              {medicamentos}
            </CardColumns>     
          </Row>
         </Container>

    );
  }
}

export default ViewMedics;
