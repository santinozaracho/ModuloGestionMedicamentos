import React, { Component } from 'react';
import DataBase from '../../DataBase'

class NavItem extends Component {
  constructor(props){
    super();
    this.selApp= this.selApp.bind(this);
  }
  selApp(event){
    this.props.onClick(this.props.codigo);
  }

  render() {
    return(
    <li className="nav-item">
      <a className={'nav-link' + (this.props.isActive === true ? " active" : "")}
          onClick={this.selApp}>
          {this.props.nombre}
          <span className={'badge badge-pill badge-dark ml-2' + (this.props.codigo === 'HOME' ? ' d-none' : '') } >
            {this.props.cantidad}
          </span>
      </a>
    </li>
  )
  }
}

export default NavItem
