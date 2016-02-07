import { createStore, applyMiddleware } from 'redux'
import blogs from '../reducers/blogger'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'

export default (initialState) => {
  const store = createStore(blogs, initialState, applyMiddleware(syncHistory(browserHistory), thunk))

  return store
}