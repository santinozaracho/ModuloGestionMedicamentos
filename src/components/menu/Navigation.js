import React, { Component } from 'react';
import logo from '../../logo.svg';
import DataBase from '../../DataBase'
import { navegacion } from './navegacion.json';
import { Button,Navbar,Nav,Form,FormControl } from 'react-bootstrap';




class Navigation extends Component{
  constructor(props) {
    super();
    this.state = {
      navegacion,
      active: "HOME"
    }
    this.loadApp = this.loadApp.bind(this);
  }

  loadApp(menuSel){
    this.setState({active : menuSel});
    this.props.onChangeNavigation(menuSel)
  }

  render() {
    const barra = this.state.navegacion.map( (item) => {
      return(
        <Nav.Link  active={item.codigo === this.state.active ? true: false} eventKey={item.codigo}>{item.nombre}</Nav.Link>
      

    )});
    return(
      <Navbar collapseOnSelect bg="light" variant="light" sticky="top">
        <Navbar.Brand href=""><img src={logo} className="App-logo" alt="logo" height="50" width="50"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline>
            <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
            <Button variant="outline-success">Buscar</Button>
          </Form>
          <Nav className="mr-auto" activeKey="HOME"
          onSelect={selectedKey => this.loadApp(selectedKey)}>
          {barra}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}

export default Navigation
