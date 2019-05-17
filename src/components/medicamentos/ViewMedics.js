import React, { Component } from 'react';
import {Container,Row,CardColumns,Alert} from 'react-bootstrap';

import ShowMedic from './ShowMedic';

class ViewMedics extends Component {
  constructor(props) {
    super(props);
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
    console.log("Solicitando...");
    console.log(this.state.medicamentos);
    let medicamentos = <Alert variant="info">No hay Medicamentos</Alert>
    if (this.state.medicamentos.length > 0) {
      medicamentos = this.state.medicamentos.map( assign => {
        return (<ShowMedic key={assign.key} onCRUD={this.handleChanges} docRef={assign.key} accessMethod="adminMed" data={assign.data}/>)
      });}

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
