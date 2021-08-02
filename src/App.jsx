import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './App.css';
import Form from './Form';
import { useDispatch, useSelector } from 'react-redux';
require('dotenv').config();


function App() {
  const [ selected, setSelected ] = useState({});
  const [ currentPosition, setCurrentPosition ] = useState({});
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch({type: 'whispering!screams!case'})
  });
  const alderaan = useSelector(store => store.youMayFireWhenReady);

  console.log('FIRE FIRE FIRE',alderaan);

  const sendCurrentPosition = position => {
    console.log(position);
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  
  const locate = () => {
    navigator.geolocation.getCurrentPosition(sendCurrentPosition);
  }
  
  const onSelect = item => {
    setSelected(item);
  }


  const mapStyles = { 
    marginTop: '5px',      
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 44.978333, lng: -93.263596
  }

  const locations = [
    {
      name: "Location 1",
      location: { 
        lat: 44.9781,
        lng: -93.261 
      },
    },
    {
      name: "Location 2",
      location: { 
        lat: 44.9783,
        lng: -93.263
      },
    },
    {
      name: "Location 3",
      location: { 
        lat: 44.9785,
        lng: -93.265
      },
    },
    {
      name: "Location 4",
      location: { 
        lat: 44.9787,
        lng: -93.267
      },
    },
    {
      name: "Location 5",
      location: { 
        lat: 44.9789,
        lng: -93.269
      },
    }
  ];
  
  return (

    <section>
      <Form/>
      <div><button onClick={locate()}>ME</button></div>
       <LoadScript
         googleMapsApiKey={`${process.env.react_app_google_api}`}>
          <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition.lat ? currentPosition : defaultCenter}>
         {
            locations.map(item => {
              return (
              <Marker 
              key={item.name} 
              position={item.location}
              onClick={() => onSelect(item)}/>
              )
            })
         }
         {
            alderaan.map(item => {
              return (
              <Marker 
              key={item.id} 
              position={item.location}
              onClick={() => onSelect(item)}/>
              )
          })
         }
         {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
            )
         }
     </GoogleMap>
       </LoadScript>
    </section>
  )
}

export default App;
