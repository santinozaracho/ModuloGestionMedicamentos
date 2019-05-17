import React, {Component} from 'react';
import {Card,Badge,Table} from 'react-bootstrap';
import SendingButton from '../medicamentos/SendingButton';
import Clock from '../Clock'


function apiMagnament(url,method,sendObj) {
    return new Promise(resolve => {
      
      console.log(sendObj);
      fetch(url, { method:method, 
                  redirect: 'follow',
                  headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                   body: JSON.stringify(sendObj)
                  })
          .then(response => {
            console.log(response);  
              // HTTP 301 response
              // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
          })
          .catch(function(err) {
              console.info(err + " url: " + url);
          });
      setTimeout(resolve, 1000)})
  }

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
                return(<tr key={medicamento.key}><td> {medicamento.codigo}</td>
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
                <Card.Footer><SendingButton docRef={this.props.docRef} onListenEv={this.handleReenv} accessMethod={"adminAss"}></SendingButton></Card.Footer>
            </Card>
          )
        }
}
export default ShowAssign;