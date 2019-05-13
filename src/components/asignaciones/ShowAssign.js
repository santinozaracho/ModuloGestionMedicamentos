import React, {Component} from 'react';
import { Button,Card,Badge,ListGroup} from 'react-bootstrap';
// import SendingButton from './sendingButton.js';


class ShowAssign extends Component{
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {

        const partida = this.props.data.partList.map( (medicamento) => {
                return(<ListGroup.Item key={medicamento.key} > {medicamento.codigo} : {medicamento.cantidad} </ListGroup.Item>)
        })
        
        // footer = <Button variant="danger">Borrar</Button>;
        return(
            <Card className="text-center">
                <Card.Header>
                    <h4 className="text-uppercase">{this.props.data.medicId}</h4>
                </Card.Header>
                
                <Card.Body>
                    <Badge variant="danger">{Date(this.props.data.partDate).substring(0,21)}</Badge>
                    
                        <ListGroup>
                            {partida}
                        </ListGroup>
                    
                </Card.Body>
                <Card.Footer><Button variant="primary">CopyKey</Button></Card.Footer>
            </Card>
          )
        }
}
export default ShowAssign;
