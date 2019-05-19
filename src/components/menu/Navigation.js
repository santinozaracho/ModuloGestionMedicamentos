import React, { Component } from 'react';
import logo from '../../logo.svg';
import { navegacion } from './navegacion.json';
import { Button,Navbar,Nav,Form,FormControl } from 'react-bootstrap';




class Navigation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      navegacion,
      active: "HOME",
      searchText:''
    }
    this.loadApp = this.loadApp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  loadApp(menuSel) {
    this.setState({active : menuSel});
    this.props.onChangeNavigation(menuSel)
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchText)
  }

  handleInputChange(e) {
    const { value } = e.target;
    this.setState({
        searchText:value
    });
}

  render() {
    const barra = this.state.navegacion.map( (item) => {
      return(
        <Nav.Link key={item.codigo} active={item.codigo === this.state.active ? true: false} eventKey={item.codigo}>{item.nombre}</Nav.Link>
      

    )});
    return(
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
        <Navbar.Brand href=""><img src={logo} className="App-logo" alt="logo" height="50" width="50"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
          <Form onSubmit={this.handleSubmit} inline>
            <FormControl name="searchText" type="text" placeholder="Buscar" onChange={this.handleInputChange} className="mr-sm-2" />
            <Button type="submit" variant="outline-success">Buscar</Button>
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
