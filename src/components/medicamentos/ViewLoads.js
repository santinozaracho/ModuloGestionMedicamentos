import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import CreateMedic from './CreateMedic';
import ViewMedicines from './ViewMedicines';
class ViewLoads extends Component {
  constructor(props) {
    super(props);
    this.state = {update:0};
  }

  handleChanges = () => this.setState({update:this.state.update+1})

  render() {
    let {update} = this.state;
    // RETURN THE COMPONENT
    return (
        <Container className="mt-4">
          <Row>
            <Col lg={3}>
              <CreateMedic onCRUD={this.handleChanges}/>
            </Col>
            <Col lg={9}>
              <ViewMedicines update={update} access='loadMed'/>
            </Col>     
          </Row>
         </Container>
    );
  }
}

export default ViewLoads;
