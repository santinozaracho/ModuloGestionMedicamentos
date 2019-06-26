import React from 'react';
import { Card,CardBody,CardHeader,CardFooter,Badge,CardText,CardTitle} from 'reactstrap';
import SendingButton from './SendingButton.js';


class ShowMedicine extends React.Component{
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleReenv = (e) => this.props.onCRUD(e)

    render() {
        let {id,name,loadDate,presentation,stock,drug,laboratory} = this.props.medicine
        return(
            <Card outline color='secondary' className="text-center card-size mt-2">
                <CardHeader>
                    <CardTitle><h4 className="text-uppercase">{name}</h4></CardTitle>
                </CardHeader>         
                <CardBody>
                    <Badge color="danger">{presentation}</Badge>
                    <CardText>{drug.name}</CardText>
                    <CardText>Laboratorio:{laboratory}</CardText>
                    <CardText>Cantidad:{stock}</CardText>
                    <CardText>Fecha Carga: {loadDate.substring(0,9)}</CardText>
                </CardBody>
                <CardFooter>
                    <SendingButton onListenEv={this.handleReenv} id={id} accessMethod={this.props.accessMethod}/>
                </CardFooter>
            </Card>
          )
        }
}
export default ShowMedicine;
