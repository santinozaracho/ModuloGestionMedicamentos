import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../../DataBase';
import { Link } from 'react-router-dom';


class CreateMedic extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('medicamentos');
        this.state = {
            nombre: '',
            cantidad: '',
            codigo: '',
            drogas: '',
            presentacion: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
      e.preventDefault();
      this.ref.add(this.state)
        .then((docRef) => {
          this.setState({
            nombre: '',
            cantidad: '',
            codigo: '',
            drogas: '',
            presentacion: ''
          });
          // this.props.history.push("/");
          })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    handleInputChange(e) {
        const { value, name } = e.target;
        console.log(value, name);
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
          <div className = "card" >
            <div className = "card-header" >
              <h4>Añadir un nuevo Medicamento</h4>
            </div>
            <form onSubmit = { this.handleSubmit }
                  className = "card-body" >
              <div className = "form-group" >
                <input type = "text"
                      name = "nombre"
                      className = "form-control"
                      value = { this.state.title }
                      onChange = { this.handleInputChange }
                      placeholder = "Nombre" />
              </div>
              <div className = "form-group" >
                <input type = "text"
                      name = "codigo"
                      className = "form-control"
                      value = { this.state.responsible }
                      onChange = { this.handleInputChange }
                      placeholder = "Codigo" />
              </div>
              <div className = "form-group" >
                <input type = "text"
                      name = "drogas"
                      className = "form-control"
                      value = { this.state.description }
                      onChange = { this.handleInputChange }
                      placeholder = "Drogas" />
              </div>
              <div className = "form-group" >
                <input name = "presentacion"
                        className = "form-control"
                        value = { this.state.priority }
                        onChange = { this.handleInputChange }
                        placeholder= 'Presentacion'/>
              </div>
              <div className = "form-group" >
                <input type = "text"
                      name = "cantidad"
                      className = "form-control"
                      value = { this.state.description }
                      onChange = { this.handleInputChange }
                      placeholder = "Cantidad" />
              </div>

              <button type = "submit"
                  className = "btn btn-success" >
                  Agregar
              </button>
            </form>
          </div>
        )
    }

}

export default CreateMedic;
