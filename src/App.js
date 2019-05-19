import React, { Component } from 'react';

import './App.css';

// data
//import DataBase from './DataBase'
// subcomponents
import Inicio from './components/inicio/Inicio'
import Navigation from './components/menu/Navigation';
import ViewMedics from './components/medicamentos/ViewMedics';
import ViewLoads from './components/medicamentos/ViewLoads';
import ViewControls from './components/medicamentos/ViewControls';
import ViewAssigns from './components/asignaciones/ViewAssigns';
import {Container} from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      searchParameter:'',
      appLoaded:<Inicio></Inicio>
    }
    this.handleApps = this.handleApps.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }


  handleApps(appSelected) {
    console.log(appSelected);
    // navegacion.map( (item) => {
      switch (appSelected) {
        case 'HOME': this.setState({appLoaded:<Inicio></Inicio>});break;
        case 'MEDIC': this.setState({appLoaded:<ViewMedics></ViewMedics>});break;
        case 'CONTROLES': this.setState({appLoaded:<ViewControls></ViewControls>});break;
        case 'CARGAS': this.setState({appLoaded:<ViewLoads></ViewLoads>});break;
        case 'ASIGN': this.setState({appLoaded:<ViewAssigns></ViewAssigns>});break;
        default: this.setState({appLoaded:<Inicio></Inicio>})
      }
    // })
  }
  handleSearch(stringSearched) {
    if (stringSearched !== '') {
      this.setState({searchParameter:stringSearched})
    } 
  }

  render() {

    // RETURN THE COMPONENT
    return (
      <div className="App">
        <Navigation onSearch={this.handleSearch} onChangeNavigation={this.handleApps}></Navigation>
        <Container>
          {this.state.appLoaded}
        </Container>
      </div>
    );
  }
}

export default App;
