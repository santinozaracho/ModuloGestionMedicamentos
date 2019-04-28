import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// data
import { medicamentos } from './medicamentos.json';
import DataBase from './DataBase'
// subcomponents
import ViewMedics from './components/medicamentos/ViewMedics';


class App extends Component {
  constructor() {
    super();
    this.state = {
      medicamentos
    }
    this.handleAddMedic = this.handleAddMedic.bind(this);
  }

  removemedic(index) {
    this.setState({
      medicamentos: this.state.medicamentos.filter((e, i) => {
        return i !== index
      })
    });
  }

  handleAddMedic(medic) {
    this.setState({
      medicamentos: [...this.state.medicamentos, medic]
    })
  }

  render() {
    const medicamentos = this.state.medicamentos.map((medic, i) => {
      return (
        <div className="col-md-4" key={i}>
          <div className="card mt-4">
            <div className="card-title text-center">
              <h3>{medic.nombre}</h3>
              <span className="badge badge-pill badge-danger ml-2">
                {medic.presentacion}
              </span>
            </div>
            <div className="card-body">
              {medic.drogas}
            </div>
            <div className="card-body">
              {medic.cantidad}
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={this.removemedic.bind(this, i)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )
    });

    // RETURN THE COMPONENT
    return (
      <div className="App">

        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Medicamentos
            <span className="badge badge-pill badge-light ml-2">
              {this.state.medicamentos.length}
            </span>
          </a>
          <a className="navbar-brand" href="/">
            Carga de Stock
            <span className="badge badge-pill badge-light ml-2">
              {this.state.medicamentos.length}
            </span>
          </a>
          <a className="navbar-brand" href="/">
            Control de Stock
            <span className="badge badge-pill badge-light ml-2">
              {this.state.medicamentos.length}
            </span>
          </a>
          <a className="navbar-brand" href="/">
            Asignaciones
            <span className="badge badge-pill badge-light ml-2">
              {this.state.medicamentos.length}
            </span>
          </a>
        </nav>

        <div className="container">
          <ViewMedics></ViewMedics>
        </div>
      </div>
    );
  }
}

export default App;
