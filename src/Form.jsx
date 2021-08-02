import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function Form() {
  const [address, setAddress] = useState({})
  const [city, setCity] = useState({})
  const [state, setState] = useState({})
  const [zip, setZip] = useState({})

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch({type: '-PIERCED-MAN-CASE-', payload: {address: address, city: city, state: state, zip: zip}})
  }

return (
  <form action="submit">
                <input type="text" placeholder='street' onChange={(evt) => setAddress(evt.target.value)} required />
                <input type="text" placeholder='city'  onChange={(evt) => setCity(evt.target.value)} required />
                <input type="text" placeholder='state' onChange={(evt) => setState(evt.target.value)} required />
                <input type="text" placeholder='zip'  onChange={(evt) => setZip(evt.target.value)} required />
                <button type='submit' onClick={() => handleSubmit()}>submit</button>
      </form>
)
}

export default Form;