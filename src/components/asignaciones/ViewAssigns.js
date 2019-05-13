import React, { Component } from 'react';
import {Container,Row,CardColumns} from 'react-bootstrap';

import ShowAssign from './ShowAssign';

class ViewAssigns extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      asignaciones: []
    };

  }

 


  componentDidMount() {
    // this.unsubscribe = this.ref.onSnapshot(this.onUpdateCollection);
    fetch('https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/asignaciones')
    .then((response) => {
      return response.json();})
    .then((myJson) => {
      let asignaciones = [];
      myJson.map( (item) => {
        asignaciones.push(item); 
      });
      this.setState({asignaciones})
    });
  }

  render() {
    console.log("Procesando");
    console.log(this.state.asignaciones);
    
    const asignaciones = this.state.asignaciones.map((assign) => {
      return (
        <ShowAssign key={assign.key} docRef={assign.key} accessMethod="adminMed" data={assign.data}/>
      )
    });

    // RETURN THE COMPONENT
    return (
        <Container className="mt-4">
          <Row> 
            <CardColumns className="w-75 mx-auto">
              {asignaciones}
            </CardColumns>     
          </Row>
         </Container>

    );
  }
}

export default ViewAssigns;
