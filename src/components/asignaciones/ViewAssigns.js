import React, { Component } from 'react';
import {Container,Row,CardDeck,Spinner} from 'reactstrap';

import ShowAssign from './ShowAssign';

class ViewAssigns extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      urlAssigns:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/asignaciones',
      urlMedicines:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos',
      urlMedicos:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicos',
      asignaciones: [],
      medicines:[],
      medicos:[]
    };

  }
  
  componentDidMount() {
    this.getAssigns();
    this.getMedicines();
    this.getMedicos();
  }

  getAssigns = async () => {
    await fetch(this.state.urlAssigns)
        .then( response => response.json())
        .then( asignaciones => this.setState({asignaciones}))
        .catch( err => console.log(err))
  }
  getMedicos = async () => {
    await fetch(this.state.urlMedicos)
        .then( response => response.json())
        .then( medicos => this.setState({medicos}))
        .catch( err => console.log(err))
  }

  getMedicines = async () => {
    await fetch(this.state.urlMedicines)
        .then( response => response.json())
        .then( medicines => this.setState({medicines}))
        .catch( err => console.log(err))  
  }

  
  handleChanges = () => this.getAssigns()


  render() {
    let {asignaciones,medicines,medicos} = this.state;
    console.log(medicos);
    
    let printAssigns = asignaciones.length > 0 && asignaciones.map( assign => 
      <ShowAssign key={assign.id}
      medicines={medicines}
      medicos={medicos}
      onCRUD={this.handleChanges} 
      accessMethod={this.props.access || 'adminAss'} 
      assign={assign}/>)
  
    // RETURN THE COMPONENT
    return (
      <Container className="mt-4">
        <Row>{!asignaciones.length && <Spinner className='mx-auto mt-5' style={{ width: '4rem', height: '4rem' }} type="grow"/>}</Row>
        <Row>
          <CardDeck className='mx-auto'>{printAssigns}</CardDeck>              
        </Row>
     </Container>

    );
  }
}

export default ViewAssigns;
