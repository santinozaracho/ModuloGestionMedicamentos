import React, {Component} from 'react';
import { Button,Card,Badge,Table,ListGroup} from 'react-bootstrap';
// import SendingButton from './sendingButton.js';


class ShowAssign extends Component{
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {

        const partida = this.props.data.partList.map( (medicamento) => {
                return(<tr><td> {medicamento.codigo}</td>
                            <td>{medicamento.cantidad}</td></tr>)
        })
        
        // footer = <Button variant="danger">Borrar</Button>;
        return(
            <Card className="text-center">
                <Card.Header>
                    <Card.Title className="text-uppercase">{this.props.data.medicId}</Card.Title>
                </Card.Header>
                
                <Card.Body>
                    <Badge variant="danger">{Date(this.props.data.partDate).substring(0,21)}</Badge>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <th>Codigo</th>
                            <th>Cantidad</th>
                        </thead>
                        <tbody>
                            {partida}
                        </tbody>      
                    </Table>          
                </Card.Body>
                <Card.Footer><Button variant="primary">CopyKey</Button></Card.Footer>
            </Card>
          )
        }
}
export default ShowAssign;
