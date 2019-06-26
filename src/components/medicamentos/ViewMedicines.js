import React from 'react';
import {Container,Row,Spinner,CardDeck} from 'reactstrap';
import ShowMedicine from './ShowMedicine';


class ViewMedicines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos',
      medicamentos: []
    };
  }

  componentDidMount() {
    this.getMedicines()
    
  }

  componentWillUpdate (prevProps) {
    if(prevProps!== this.props){
      this.getMedicines()
    }
  }

  handleChanges = e => this.getMedicines()

  getMedicines = async () => {
    await fetch(this.state.url)
        .then( response => response.json())
        .then( medicamentos => this.setState({medicamentos}))
        .catch( err => console.log(err))
        
  }
  
  render() {
    let {medicamentos} = this.state;
    let printMedicines = medicamentos.length > 0 && medicamentos.map( medicine => 
      <ShowMedicine key={medicine.id} 
      onCRUD={this.handleChanges} 
      accessMethod={this.props.access || 'adminMed'} 
      medicine={medicine}/>)
    
    // RETURN THE COMPONENT
    return (
        <Container>
          <Row>{!medicamentos.length && <Spinner className='mx-auto mt-5' style={{ width: '4rem', height: '4rem' }} type="grow"/>}</Row>
          <Row>
            <CardDeck className='mx-auto'>{printMedicines}</CardDeck>              
          </Row>
         </Container>

    );
  }
}

export default ViewMedicines;
