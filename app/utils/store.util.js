import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import Reducer from '../reducers/index.reducer'
import { DEBUGGER_MODE } from './config.util';

export default store = DEBUGGER_MODE 
? createStore(Reducer, applyMiddleware(thunk, logger))
: createStore(Reducer, applyMiddleware(thunk))