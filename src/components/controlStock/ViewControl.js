import React, { Component } from 'react';
import logo from './logo.svg';


// data
import { medicamentos } from './medicamentos.json';

// subcomponents
import MedicForm from './MedicForm';

class ViewMedics extends Component {
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
      <div className="ViewMedics">

        <div className="container">
          <div className="row mt-4">

            <div className="col-md-4 text-center">
                <img src={logo} className="App-logo" alt="logo" />
              <MedicForm onAddMedic={this.handleAddMedic}></MedicForm>
            </div>

            <div className="col-md-8">
              <div className="row">
                {medicamentos}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewMedics;
