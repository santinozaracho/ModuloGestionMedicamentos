import React, {Component} from 'react';
import {Card,CardBody,CardHeader,CardFooter,CardTitle,Badge,Table} from 'reactstrap';
import SendingButton from '../medicamentos/SendingButton.js';

class ShowAssign extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    getMedic = id => this.props.medicos.find(medico => medico.id ===id) 

    handleReenv = (e) =>{this.props.onCRUD(e)}
    
    getMedName = id => {
        let{medicines} = this.props
        let medicine=medicines.find( medicine => medicine.id===id )
        return medicine? medicine.name:'NO-DATA'
    }
    
    
    getTableMedicines = medicines => medicines.map( medicamento => <tr key={'C-A-T'+medicamento.medicineId}><td>{this.getMedName(medicamento.medicineId)}</td><td>{medicamento.quantity}</td></tr>)
    


    render() {
        let {assign} = this.props;
        let medico = this.getMedic(assign.medicId)     
        console.log(medico);
         
        let partida = this.getTableMedicines(assign.medicinePrescriptions);
        return(
            <Card outline color='secondary' className="text-center card-size">
                <CardHeader>
                    <CardTitle className=""><h4>{medico ? medico.apellido+','+medico.nombre : assign.medicId}</h4></CardTitle>
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
