import React, { Component } from 'react';
import logo from '../../logo.svg';
import DataBase from '../../DataBase'
import { navegacion } from './navegacion.json';
import NavItem from './NavItem'



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
        <NavItem key={item.codigo}
                codigo={item.codigo}
                nombre={item.nombre}
                cantidad="3"
                onClick={this.loadApp}
                isActive={item.codigo == this.state.active ? true: false} />

    )});
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="nav-item" href="#"><img src={logo} className="App-logo" alt="logo" height="50" width="50"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>

          <ul className="navbar-nav mr-auto">
            {barra}
          </ul>

        </div>
      </nav>
    )
  }

}

export default Navigation
