import React, { Component } from 'react';
import {Container,Row,CardColumns} from 'react-bootstrap';

import ShowAssign from './ShowAssign';

class ViewAssigns extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/asignaciones',
      asignaciones: []
    };

  }
  
  componentDidMount() {
    this.getDataFromAPI()
  }

  getDataFromAPI = async () => {
    await fetch(this.state.url,{headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': 0}})
        .then((response) => {
          return response.json()
        })
        .then((asignaciones) => {
          this.setState({asignaciones})
        })
  }
  
  handleChanges(){
    this.getDataFromAPI()
  }


  render() {
    console.log("Procesando");
    console.log(this.state.asignaciones);
    
    const asignaciones = this.state.asignaciones.map((assign) => {
      return (
        <ShowAssign key={assign.refId} onCRUD={this.handleChanges} refId={assign.refId} accessMethod="adminAss" data={assign.data}/>
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
