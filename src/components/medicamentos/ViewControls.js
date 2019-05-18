import React, { Component } from 'react';
import {Container,Row,CardColumns} from 'react-bootstrap';
import firebase from '../../DataBase';

import ShowMedic from './ShowMedic';

class ViewControls extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('medicamentos');
    this.unsubscribe = null;
    this.state = {
      url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos',
      medicamentos: []
  };
  this.handleChanges=this.handleChanges.bind(this)
}


  componentDidMount() {
    // this.unsubscribe = this.ref.onSnapshot(this.onUpdateCollection);
    this.getDataFromAPI()
    
  }

  getDataFromAPI = async () => {
    await fetch(this.state.url)
        .then((response) => {
          return response.json()
        })
        .then((medicamentos) => {
          this.setState({medicamentos})
        })
  }
  
  handleChanges(){
    this.getDataFromAPI()
  }

  render() {
    console.log("Procesando");
    const medicamentos = this.state.medicamentos.map((medic) => {
      return (
        <ShowMedic key={medic.refId} onCRUD={this.handleChanges} docRef={medic.refId} accessMethod="controlMed" data={medic.data}/>
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

export default ViewControls;
