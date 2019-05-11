import React, {Component} from 'react';
import { Button,Card,Badge} from 'react-bootstrap';

class ShowMedic extends Component{
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
        return(
            <Card className="text-center">
                <Card.Header>
                    <h3>{this.props.data.nombre}</h3>
                    
                </Card.Header>
                
                <Card.Body>
                    <Badge variant="danger">{this.props.data.presentacion}</Badge>
                    <Card.Text>{this.props.data.drogas}</Card.Text>
                    <Card.Text>{this.props.data.cantidad}</Card.Text>
                </Card.Body>
                <Card.Footer><Button variant="danger">Borrar</Button></Card.Footer>
            </Card>
          )
        }
}
export default ShowMedic;
