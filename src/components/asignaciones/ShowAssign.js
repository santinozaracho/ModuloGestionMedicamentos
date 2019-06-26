import React, {Component} from 'react';
import {Card,CardBody,CardHeader,CardFooter,CardTitle,Badge,Table} from 'reactstrap';
import SendingButton from '../medicamentos/SendingButton.js';

class ShowAssign extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded:false,
            medico:{nombre:'nodata',apellido:'nodata'},
            urlMedico:'http://medicosdacs.ddns.net:8080/api/medico/'
        }
    }
    componentDidMount(){
        this.getNameMedicAPI();
    }

    getNameMedicAPI = async () => { 
        await fetch(this.state.urlMedico+this.props.assign.medicId)
            .then( response => response.json())
            .then( medico => this.setState({medico}))
            .catch( err => this.setState({loaded:false}))
      }

    handleReenv = (e) =>{this.props.onCRUD(e)}

    
    getMedName = id => {
        let{medicines} = this.props
        let medicine=medicines.find( medicine => medicine.id===id )
        return medicine? medicine.name:'NO-DATA'
    }
    
    getTableMedicines = medicines => medicines.map( medicamento => <tr key={'C-A-T'+medicamento.medicineId}><td>{this.getMedName(medicamento.medicineId)}</td><td>{medicamento.quantity}</td></tr>)
    


    render() {
        let {assign} = this.props;
        let {loaded,medico} = this.state
        let partida = this.getTableMedicines(assign.medicinePrescriptions);
        return(
            <Card outline color='secondary' className="text-center card-size">
                <CardHeader>
                    <CardTitle className="text-uppercase">{loaded ? medico.apellido+','+medico.nombre : assign.medicId}</CardTitle>
                </CardHeader>
                
                <CardBody>
                    <Badge color="danger">{assign.date}</Badge>
                    <Table>
                        <thead>
                            <tr key="Init"><th>Nombre</th><th>Cantidad</th></tr>
                        </thead>
                        <tbody>
                            {partida}
                        </tbody>      
                    </Table>          
                </CardBody>
                <CardFooter><SendingButton id={assign.id} onListenEv={this.handleReenv} accessMethod={"adminAss"}></SendingButton></CardFooter>
            </Card>
          )
        }
}
export default ShowAssign;
