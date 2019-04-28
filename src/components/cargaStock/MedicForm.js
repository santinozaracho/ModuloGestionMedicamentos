import React, { Component } from 'react';

class MedicForm extends Component {
    constructor() {
        super();
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
        this.props.onAddTodo(this.state);
        this.setState({
            nombre: '',
            cantidad: '',
            codigo: '',
            drogas: '',
            presentacion: ''
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
        return ( <
            div className = "card" >
            <
            form onSubmit = { this.handleSubmit }
            className = "card-body" >
            <
            div className = "form-group" >
            <
            input type = "text"
            name = "nombre"
            className = "form-control"
            value = { this.state.title }
            onChange = { this.handleInputChange }
            placeholder = "Nombre" /
            >
            <
            /div> <
            div className = "form-group" >
            <
            input type = "text"
            name = "codigo"
            className = "form-control"
            value = { this.state.responsible }
            onChange = { this.handleInputChange }
            placeholder = "Codigo" /
            >
            <
            /div> <
            div className = "form-group" >
            <
            input type = "text"
            name = "drogas"
            className = "form-control"
            value = { this.state.description }
            onChange = { this.handleInputChange }
            placeholder = "Description" /
            >
            <
            /div> <
            div className = "form-group" >
            <
            select name = "presentacion"
            className = "form-control"
            value = { this.state.priority }
            onChange = { this.handleInputChange } >
            <
            option > low < /option> <
            option > medium < /option> <
            option > high < /option> <
            /select> <
            /div> <
            div className = "form-group" >
            <
            input type = "text"
            name = "cantidad"
            className = "form-control"
            value = { this.state.description }
            onChange = { this.handleInputChange }
            placeholder = "Cantidad" /
            >
            <
            /div>

            <
            button type = "submit"
            className = "btn btn-success" >
            Agregar <
            /button> <
            /form> <
            /div>
        )
    }

}

export default MedicForm;