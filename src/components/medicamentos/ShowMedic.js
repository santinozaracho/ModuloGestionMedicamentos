import React, {Component} from 'react';
import { Button,Card,Badge, InputGroup, FormControl} from 'react-bootstrap';
import SendingButton from './sendingButton.js';


class ShowMedic extends Component{
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
        let footer
        switch (this.props.accessMethod) {
            case "loadMed":
                footer = <SendingButton accessMethod={this.props.accessMethod} />
                break;
            case "controlMed":
                footer = <SendingButton accessMethod={this.props.accessMethod} />
                break;
            case "adminMed":
                footer = <SendingButton accessMethod={this.props.accessMethod} />
                break;
            default:
            //OlyView
                footer = <Button variant="primary">CopyKey</Button>
                break;
        }   
        
        
        // footer = <Button variant="danger">Borrar</Button>;
        return(
            <Card className="text-center">
                <Card.Header>
                    <h4 className="text-uppercase">{this.props.data.nombre}</h4>
                    
                </Card.Header>
                
                <Card.Body>
                    <Badge variant="danger">{this.props.data.presentacion.cant} {this.props.data.presentacion.tipo}</Badge>
                    <Card.Text>{this.props.data.drogas}</Card.Text>
                    <Card.Text>Cantidad:{this.props.data.cantidad}</Card.Text>
                    <Card.Text>{Date(this.props.data.updatedDate)}</Card.Text>
                </Card.Body>
                <Card.Footer>{footer}</Card.Footer>
            </Card>
          )
        }
}
export default ShowMedic;
