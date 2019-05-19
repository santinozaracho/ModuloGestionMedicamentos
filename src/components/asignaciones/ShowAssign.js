import React, {Component} from 'react';
import {Card,Badge,Table} from 'react-bootstrap';
import SendingButton from '../medicamentos/SendingButton';
import Clock from '../Clock'

class ShowAssign extends Component{
    constructor(props) {
      super(props);
      this.state = {}
      this.handleReenv = this.handleReenv.bind(this)
    }

    handleReenv(e){
        this.props.onCRUD(e)
    }


    render() {

        const partida = this.props.data.partList.map( (medicamento) => {
                return(<tr key={medicamento.refId}><td> {medicamento.codigo}</td>
                            <td>{medicamento.cantidad}</td></tr>)
        })
        
        // footer = <Button variant="danger">Borrar</Button>;
        return(
            <Card className="text-center">
                <Card.Header>
                    <Card.Title className="text-uppercase">{this.props.data.medicId}</Card.Title>
                </Card.Header>
                
                <Card.Body>
                    <Badge variant="danger"><Clock date={this.props.data.partDate}/></Badge>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr><th>Codigo</th>
                            <th>Cantidad</th></tr>
                        </thead>
                        <tbody>
                            {partida}
                        </tbody>      
                    </Table>          
                </Card.Body>
                <Card.Footer><SendingButton refId={this.props.refId} onListenEv={this.handleReenv} accessMethod={"adminAss"}></SendingButton></Card.Footer>
            </Card>
          )
        }
}
export default ShowAssign;
