import React, { Component } from 'react';
import {Container,Row,Col,CardColumns} from 'react-bootstrap';
import CreateMedic from './CreateMedic';
import ShowMedic from './ShowMedic';

class ViewLoads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos',
      medicamentos: []
    };
    this.handleChanges=this.handleChanges.bind(this)
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
        .then((medicamentos) => {
          this.setState({medicamentos})
        })
  }
  
  handleChanges(){
    this.getDataFromAPI()
  }

  render() {
    console.log("Procesando");
    console.log(this.state.medicamentos);
    const medicamentos = this.state.medicamentos.map((medic) => {
      return (
        <ShowMedic key={medic.refId} onCRUD={this.handleChanges} refId={medic.refId} accessMethod="loadMed" data={medic.data}/>
      )
    });

    // RETURN THE COMPONENT
    return (
        <Container className="mt-4">
          <Row>
            <Col lg={4}>
              <CreateMedic onCRUD={this.handleChanges}/>
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
