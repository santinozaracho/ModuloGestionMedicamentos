import React, { Component } from 'react';

import './App.css';

// data
//import DataBase from './DataBase'
// subcomponents
import Inicio from './components/inicio/Inicio'
import Navigation from './components/menu/Navigation';
import ViewMedics from './components/medicamentos/ViewMedics';
import {navegacion} from './components/menu/navegacion.json'



class App extends Component {
  constructor(props) {
    super();
    this.state = {
      appLoaded:<Inicio></Inicio>
    }
    this.handleApps = this.handleApps.bind(this);
  }


  handleApps(appSelected) {
    console.log(appSelected);
    // navegacion.map( (item) => {
      switch (appSelected) {
        case 'HOME': this.setState({appLoaded:<Inicio></Inicio>});break;
        case 'MEDIC': this.setState({appLoaded:<ViewMedics></ViewMedics>});break;
        default: this.setState({appLoaded:<Inicio></Inicio>})
      }
    // })
  }

  render() {

    // RETURN THE COMPONENT
    return (
      <div className="App">
        <Navigation onChangeNavigation={this.handleApps}></Navigation>
        <div className="container mt-5">
          {this.state.appLoaded}
        </div>
      </div>
    );
  }
}

export default App;
