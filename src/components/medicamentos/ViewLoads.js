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
      url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos',
      medicamentos: []
    };
    this.handleChanges=this.handleChanges.bind(this)
  }

  componentDidMount() {
    this.getDataFromAPI()
  }

  // componentWillUpdate(){
  //   setTimeout(() => {
  //     this.getDataFromAPI()
  //   }, 10000);
  // }
  

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
    // this.forceUpdate()
    this.getDataFromAPI()
  }

  render() {
    console.log("Procesando");
    console.log(this.state.medicamentos);
    const medicamentos = this.state.medicamentos.map((medic) => {
      return (
        <ShowMedic key={medic.refId} onCRUD={this.handleChanges} docRef={medic.refId} accessMethod="loadMed" data={medic.data}/>
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
