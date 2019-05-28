import React, {Component} from 'react';
import {Card,Badge,Table} from 'react-bootstrap';
import SendingButton from '../medicamentos/sendingButton';
import Clock from '../Clock'

class ShowAssign extends Component{
    constructor(props) {
        super(props);
        this.state = {
            medico:{nombre:'nodata',apellido:'nodata'},
            urlMedico:'http://localhost:8080/api/medico/'
        }
        this.handleReenv = this.handleReenv.bind(this);
    }
    componentDidMount(){
        this.getNameMedicAPI();
    }

    getNameMedicAPI = async () => { 
        await fetch(this.state.urlMedico+this.props.data.medicId,{method: 'GET'})
            .then((response) => {
                console.log(response.json());
                
              return response.json()
            })
            .then((medico) => {
                console.log(medico);
                
              this.setState({medico})
            })
      }

    handleReenv(e){
        this.props.onCRUD(e)
    }


    render() {

        const partida = this.props.data.partList.map( (medicamento) => {            
            return(<tr key={medicamento.refId}><td>{medicamento.codigo}</td><td>{medicamento.cantidad}</td></tr>)
        })
        
        // footer = <Button variant="danger">Borrar</Button>;
        return(
            <Card className="text-center">
                <Card.Header>
                    <Card.Title className="text-uppercase">{this.state.medico.apellido+','+this.state.medico.nombre}</Card.Title>
                </Card.Header>
                
                <Card.Body>
                    <Badge variant="danger"><Clock date={this.props.data.partDate}/></Badge>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr key="Init"><th>Codigo</th>
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
