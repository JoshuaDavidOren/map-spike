import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
  yield takeEvery('whispering!screams!case', getMeTheCoordinates)
 yield takeEvery('-PIERCED-MAN-CASE-', showMeTheMoney)
}

function* showMeTheMoney(action) {
  try{
    yield call(axios.post, '/api/location', action.payload);
  }
  catch(error) {
    console.log('you bit off more then you could chew', error);
  }
}

function* getMeTheCoordinates() {
  try{
    const theCoordinatesSir = yield call(axios.get, '/api/location');
    console.log('what is this',theCoordinatesSir.data);
    yield put({type: '|wall|alone|case|', payload: theCoordinatesSir})
  }
  catch(error) {
    console.log('you bit off more then you could chew', error);
  }
}

const sagaMiddleware = createSagaMiddleware();

const youMayFireWhenReady = (state = [], action) => {
  switch (action.type) {
    case '|wall|alone|case|':
      console.log('i have more fun things to do',action.payload);
      return state = action.payload.data
    default:
      return state;
  }
}


const storeInstance = createStore(
  combineReducers({
    youMayFireWhenReady
  }),

  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
