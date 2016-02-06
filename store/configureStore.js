import { createStore, applyMiddleware } from 'redux'
import blogs from '../reducers/blogger'
import thunk from 'redux-thunk'

export default (initialState) => {
  const store = createStore(blogs, initialState, applyMiddleware(thunk))

  return store
}