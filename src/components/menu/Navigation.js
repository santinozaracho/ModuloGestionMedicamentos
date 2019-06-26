import React, { Component } from 'react';
import logo from '../../logo.svg';
import { navegacion } from './navegacion.json';
import { Button,Navbar,Nav,Form,Input,NavItem,NavbarBrand,NavbarToggler,Collapse } from 'reactstrap';




class Navigation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      navegacion,
      searchText:'',
      collapsed:true
    }
  }

  handleApp = newMenu => newMenu !== this.props.appActive && this.props.handleApps(newMenu)

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText)
  }
  toggleNav = e => this.setState({collapsed:!this.state.collapsed})
  handlebabe = d=>console.log(d);
  
  handleInputChange = e => this.setState({searchText:e.target.value});

  render() {
    let {navegacion} = this.state;
    let {appActive} = this.props;
    let barra = navegacion.map( item => 
    <NavItem key={item.codigo}>
      <Button active={item.codigo === appActive && true} 
      size='sm' onClick={e => this.handleApp(item.codigo)}
      className='mx-1' outline color='success'
      >{item.nombre}</Button>
    </NavItem>);
        
    return(
      <Navbar expand="md" light color="light" sticky="top">
        <NavbarBrand href="/"><img src={logo} className="App-logo" alt="logo" height="50" width="50"/></NavbarBrand>
        <NavbarToggler onClick={this.toggleNav}/>
         <Collapse isOpen={!this.state.collapsed} navbar>
          <Form onSubmit={this.handleSubmit} inline>
            <Input name="searchText" type="text" bsSize='sm'placeholder="Buscar" onChange={this.handleInputChange} className="inSearch" />
            <Button type="submit" size='sm' className='ml-1' outline color="success">Buscar</Button>
          </Form>
          <Nav className="mx-auto" navbar>
            {barra}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }

}

export default Navigation
