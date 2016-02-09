import 'babel-polyfill'
import "bootstrap-webpack"
import './base.css'
import React from 'react'
import { AppView, NewBlogView, BlogDetailsView } from './containers/app'
import configureStore from './store/configureStore'
import { SOCKET_URL } from './constants/utility'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { STATE_RECEIVED } from './constants/actiontypes'

const io = require('socket.io-client')
const socket = io.connect(SOCKET_URL);

const store = configureStore();

socket.on('stateTree', function (state) {
  store.dispatch({type: STATE_RECEIVED, state})
});

   render(
     <Provider store={store}>
       <Router history={browserHistory}>
         <Route path="/" component={AppView}/>
         <Route path="/newblog" component={NewBlogView}/>
         <Route path=":blog_id" component={BlogDetailsView}/>
       </Router>
     </Provider>,
     document.getElementById('main')
   )