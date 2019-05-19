import React, { Component } from 'react';
import hospi from '../../hospi.png';

class Inicio extends Component {

  render() {
    return(
      <div className="mt-5"><a href="https://modulogestionmedicamentos.firebaseapp.com"><img className="mt-5 w-100 mh-75" alt="Homepage" src={hospi}></img></a></div>
    )
  }
}

export default Inicio
