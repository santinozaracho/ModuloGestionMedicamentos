import React, { Component } from 'react';
import {Card,Row,Button,Col,Form} from 'react-bootstrap';

class CreateMedic extends Component {
    constructor() {
        super();
        this.state = {
            nombre: '',
            cantidad: '',
            codigo: '',
            drogas: '',
            presentacion: '',
          validated:false};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    blankState(yes) {
    }


    handleSubmit(event) {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }else{
        // SEND DATAAAA
        var url = 'https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos';
        fetch(url, { method: 'POST', 
                    redirect: 'follow',
                    headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                     body: JSON.stringify(this.state)
                    })
            .then(response => {
              console.log(response);
              
                // HTTP 301 response
                // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
            })
            .catch(function(err) {
                console.info(err + " url: " + url);
            });
        // (async () => {
        //   const rawResponse = await fetch('https://us-central1-modulogestionmedicamentos.cloudfunctions.net/app/medicamentos', {
        //     method: 'POST',
        //     redirect: 'follow',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        //   });
        //   const content = await rawResponse.json();
        
        //   console.log(content);
        // })();
      }
      this.setState({ validated: true });
    }

    handleInputChange(e) {
        const { value, name } = e.target;
        console.log(value, name);
        this.setState({
            [name]: value
        });
    }

    render() {
      const { validated } = this.state;
      return (
        <Card className="text-center">
          <Form noValidate validated={validated} onSubmit = { this.handleSubmit }>
            <Card.Header><h3>Nuevo Medicamento</h3></Card.Header>
            <Card.Body className="mx-4">
              <Form.Group as={Row}>
                <Form.Control required type = "text" name = "nombre" value = { this.state.nombre } 
                onChange = {this.handleInputChange} placeholder = "Nombre Comercial" />
               
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    
                <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>

              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Control required type = "text" name = "codigo" value = { this.state.codigo }
                onChange = {this.handleInputChange} placeholder = "Codigo Interno" />
              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Control required type = "text" name = "drogas" value = { this.state.drogas }
                  onChange = {this.handleInputChange} placeholder = "Drogas:" />

              </Form.Group>
              <Form.Row >
              <Form.Label>Presentacion:</Form.Label>
                <Form.Group as={Col} lg={8}> 
                  <Form.Control as="select"  name = "presentacion" value = { this.state.presentacion.tipo }
                  onChange = {this.handleInputChange} placeholder= ''>
                    <option>Comprimidos</option>
                    <option>Capsulas</option>
                    <option>Solucion</option>
                    <option>Jarabe</option>
                    <option>Pomada</option>
                  </Form.Control>
                  
                </Form.Group> 
                <Form.Group as={Col} lg={4}>
                  
                  <Form.Control type="text" required name = "presentacion" value = { this.state.presentacion.cant }
                  onChange = {this.handleInputChange} placeholder= 'un'>
                  </Form.Control>
                  
                </Form.Group> 

              </Form.Row>
              
              <Form.Group as={Row}>
                  <Form.Control required type = "text" name = "cantidad" value = { this.state.cantidad }
                onChange = {this.handleInputChange} placeholder = "Stock Inicial" />
              </Form.Group> 
            </Card.Body>
            <Card.Footer>
              <Form.Group>
                <Button type="submit" variant="success">Cargar</Button>
              </Form.Group>
            </Card.Footer>
          </Form>
        </Card>
      )
    }

}

export default CreateMedic;
