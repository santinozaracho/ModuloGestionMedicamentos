import React, {Component} from 'react';
import { Card,Badge} from 'react-bootstrap';
import SendingButton from './SendingButton.js';
import Clock from '../Clock'


class ShowMedic extends Component{
    constructor(props) {
      super(props);
      this.state = {};
      this.handleReenv=this.handleReenv.bind(this)
    }

    handleReenv(e){
        this.props.onCRUD(e)
    }
    render() {        
        // footer = <Button variant="danger">Borrar</Button>;
        return(
            <Card className="text-center">
                <Card.Header>
                    <h4 className="text-uppercase">{this.props.data.nombre}</h4>
                    
                </Card.Header>
                
                <Card.Body>
                    <Badge variant="danger">{this.props.data.presentacioncant} {this.props.data.presentaciontipo}</Badge>
                    <Card.Text>{this.props.data.drogas}</Card.Text>
                    <Card.Text>Cantidad:{this.props.data.cantidad}</Card.Text>
                    <Card.Text><Clock date={this.props.data.loadDate}/></Card.Text>
                </Card.Body>
                <Card.Footer><SendingButton onListenEv={this.handleReenv} docRef={this.props.docRef} accessMethod={this.props.accessMethod} /></Card.Footer>
            </Card>
          )
        }
}
export default ShowMedic;
