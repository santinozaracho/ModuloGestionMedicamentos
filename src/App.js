import React, { Component } from 'react';

import './App.css';

// data
//import DataBase from './DataBase'
// subcomponents
import Inicio from './components/inicio/Inicio'
import Navigation from './components/menu/Navigation';
import ViewMedicines from './components/medicamentos/ViewMedicines';
import ViewLoads from './components/medicamentos/ViewLoads';
import ViewControls from './components/medicamentos/ViewControls';
import ViewAssigns from './components/asignaciones/ViewAssigns';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      searchParameter:'',
      appActive:'HOME',
      appLoaded:<Inicio></Inicio>
    }
  }


  handleApps = appActive => {

    // navegacion.map( (item) => {
      switch (appActive) {
        case 'HOME': this.setState({appActive,appLoaded:<Inicio></Inicio>});break;
        case 'MEDIC': this.setState({appActive,appLoaded:<ViewMedicines></ViewMedicines>});break;
        case 'CONTROLES': this.setState({appActive,appLoaded:<ViewControls></ViewControls>});break;
        case 'CARGAS': this.setState({appActive,appLoaded:<ViewLoads></ViewLoads>});break;
        case 'ASIGN': this.setState({appActive,appLoaded:<ViewAssigns></ViewAssigns>});break;
        default: this.setState({appActive,appLoaded:<Inicio></Inicio>})
      }
    // })
  }


  handleSearch = searchParameter => searchParameter !== '' && this.setState({searchParameter})
  

  render() {
    let {appActive,appLoaded} = this.state;

    return (
      <div className="App">
        <Navigation appActive={appActive} handleSearch={this.handleSearch} handleApps={this.handleApps}></Navigation>
        <div>
          {appLoaded}
        </div>
      </div>
    );
  }
}

export default App;
