import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../DataBase';
import logo from '../../logo.svg';


import CreateMedic from './CreateMedic';

class ViewMedics extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('medicamentos');
    this.unsubscribe = null;
    this.state = {
      medicamentos: []
    };
    this.handleAddMedic = this.handleAddMedic.bind(this);
    this.removeMedic = this.removeMedic.bind(this);
  }

  onCollectionUpdate = (querySnapshot) => {
    const medicamentos = [];
    querySnapshot.forEach((doc) => {
      medicamentos.push({
        key: doc.id,
        data: doc.data()
      });
    });
    this.setState({
      medicamentos
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  removeMedic(idData) {
    this.ref.doc(idData).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  handleAddMedic(medic) {
    // this.setState({
    //   medicamentos: [...this.state.medicamentos, medic]
    // })
  }

  render() {
    const medicamentos = this.state.medicamentos.map((medic) => {
      return (
        <div className="col-md-4" key={medic.key}>
          <div className="card mt-4">
            <div className="card-title text-center">
              <h3>{medic.data.nombre}</h3>
              <span className="badge badge-pill badge-danger ml-2">
                {medic.data.presentacion}
              </span>
            </div>
            <div className="card-body">
              {medic.data.drogas}
            </div>
            <div className="card-body">
              {medic.data.cantidad}
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={this.removeMedic.bind(this, medic.key)}>
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

            <div className="col-md-4 mt-5 text-center">
              <CreateMedic onAddMedic={this.handleAddMedic}></CreateMedic>
            </div>

            <div className="col-md-8 text-center">
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
