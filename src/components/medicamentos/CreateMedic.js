import React, { Component } from 'react';
import {Card,CardBody,CardFooter,CardHeader,Row,Button,Col,Form,Input,FormGroup,FormFeedback,Label,Spinner,Alert} from 'reactstrap';


class CreateMedic extends Component {
    constructor() {
        super();
        this.state = {
          nombre: '',
          cantidad: '',
          codigo: '',
          laboratorio:'',
          drogas: '',
          presentaciontipo:'Comprimidos',
          presentacioncant:'',
          loading:false
        };
    }

    blankState = () => {
      this.setState({ 
        nombre: '',
        cantidad: '',
        codigo: '',
        drogas: '',
        laboratorio:'',
        presentaciontipo:'Comprimidos',
        presentacioncant:'',
        loading: false});
    }

    sendMedicamento = async () => {
        let url = 'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos';
        await fetch(url, { method: 'POST', 
                    headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                      body: JSON.stringify(this.state)})
            .then( response => this.handleSuccess())
            .catch( err => <Alert>{err}</Alert> )
    }

    handleSuccess = e =>{
      this.props.onCRUD(e);
      this.blankState()
    }


    handleSubmit = e =>  {
      e.preventDefault();
      let form = e.currentTarget;
      if (!form.checkValidity()) { 
        e.preventDefault(); e.stopPropagation();
      }else{ 
        this.setState({loading:true})
        this.sendMedicamento() }
    }

    handleInputChange = e => {
        let { value, name } = e.target;
        if ((name==='cantidad' && Number(value) > 0 )|| name!=='cantidad'){this.setState({[name]: value})}
    }

    render() {
      let {nombre, codigo, laboratorio, cantidad, presentacioncant, presentaciontipo, drogas, loading } = this.state;
      let loadingButton = <Button size={'lg'}  block outline color="secondary"><Spinner type='grow' size={'lg'} /></Button>
      return (
        <Card className="mx-auto" outline color='secondary'>
  
          <Form onSubmit = { this.handleSubmit }>
            
            <CardHeader><h3>Nuevo Medicamento</h3></CardHeader>
            
            <CardBody>
              
              <Row>
                <FormGroup className='mx-auto'>
                  <Input valid={nombre}  required type = "text" name = "nombre" value = { nombre } 
                    onChange = {this.handleInputChange} placeholder = "Nombre Comercial" />
                    <FormFeedback>Obligatorio</FormFeedback>
                </FormGroup>
          
              </Row>
              
              <Row>
                <FormGroup className='mx-auto'>
                  <Input type = "text" name = "codigo" value = { codigo }
                    onChange = {this.handleInputChange} placeholder = "Codigo Interno" />
                </FormGroup>
              </Row>
              
              <Row>
                <FormGroup className='mx-auto'>
                    <Input valid={laboratorio}  required type = "text" name = "laboratorio" value = { laboratorio }
                  onChange = {this.handleInputChange} placeholder = "Laboratorio" />
                  <FormFeedback>Obligatorio</FormFeedback>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup className='mx-auto'>
                    <Input required type = "text" name = "drogas" value = { drogas }
                    onChange = {this.handleInputChange} placeholder = "Drogas" />
                </FormGroup>
              </Row>

              <Row>
                <Label className='mx-4'>Presentacion:</Label>
                <FormGroup className=''>
                  <Row className='mx-auto'>
                    <Col lg={8}>
                      <Input type="select" bsSize="sm" name = "presentaciontipo" value = { presentaciontipo }
                      onChange = {this.handleInputChange}>
                        <option value="Comprimidos">Comprimidos</option>
                        <option value="Capsulas">Capsulas</option>
                        <option value="Solucion">Solucion</option>
                        <option value="Jarabe">Jarabe</option>
                        <option value="Pomada">Pomada</option>
                      </Input>
                    </Col>  
                    <Col lg={4}> 
                      <Input valid={presentacioncant} type="text" required bsSize='sm' name="presentacioncant" value = { presentacioncant }
                        onChange = {this.handleInputChange} placeholder='un'/>
                    </Col> 
                  </Row>
                </FormGroup>              
              </Row>
              <Row className='px-5'>
                <FormGroup className='mx-auto'>
                  <Input valid={cantidad} required type = "text" name = "cantidad" value = { cantidad }
                  onChange = {this.handleInputChange} placeholder = "Stock Inicial" />
                  <FormFeedback>Obligatorio</FormFeedback>
                </FormGroup> 
              </Row>
            </CardBody>
            
            <CardFooter> 
                <Row>
                  <Col>
                    <FormGroup className='mx-auto'>
                      {!loading ? <Button size={'lg'}  block type="submit" outline color="success">Cargar</Button>:loadingButton}
                    </FormGroup>
                  </Col>
                </Row>
            </CardFooter>
          
          </Form>
        
        </Card>
      )
    }

}

export default CreateMedic;
