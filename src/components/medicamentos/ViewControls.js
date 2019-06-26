import React from 'react';
import {Container,Row,} from 'react-bootstrap';
import ViewMedicines from './ViewMedicines';

class ViewControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
}

  render() {
    // RETURN THE COMPONENT
    return (
        <Container className="mt-4">
          <Row>
            <ViewMedicines access='controlMed'/>
          </Row>
         </Container>
    );
  }
}

export default ViewControls;
