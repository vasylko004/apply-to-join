
import {formsReducer} from './forms';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


export default combineReducers({
    routing: routerReducer, 
    forms: formsReducer
})