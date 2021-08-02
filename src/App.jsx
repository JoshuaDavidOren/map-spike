import React from 'react';
import './App.css';
import Form from './Form';
import MapContainer from './MapContainer'
require('dotenv').config();


function App() {

  
  return (

    <section>
      <Form/>
      <MapContainer/>
    </section>
  )
}

export default App;
