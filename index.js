import 'babel-polyfill'
import "bootstrap-webpack"
import './base.css'
import React from 'react'
import App from './containers/app'
import configureStore from './store/configureStore'
import { SOCKET_URL } from './constants/utility'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { routeActions } from 'react-router-redux'

const io = require('socket.io-client')
const socket = io.connect(SOCKET_URL);

socket.on('stateTree', function (initialState) {
   const store = configureStore(initialState);

   render(
     <Provider store={store}>
       <Router history={browserHistory}>
         <Route path="/" component={App}>
           <Route path="newblog" component={App}/>
           <Route path="/blog/:blog_id" component={App}/>
         </Route>
       </Router>
     </Provider>,
     document.getElementById('main')
   )
});