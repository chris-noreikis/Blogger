import 'babel-polyfill'
import './base.css'
import "bootstrap-webpack"
import React from 'react'
import App from './containers/app'
import configureStore from './store/configureStore'
import { SOCKET_URL } from './constants/utility'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const io = require('socket.io-client')
const socket = io.connect(SOCKET_URL);

socket.on('stateTree', function (initialState) {
   const store = configureStore(initialState);

   render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('main')
   )
});