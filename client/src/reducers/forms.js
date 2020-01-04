import {  UPDATE_FORM_STATUS } from '../constants';
import { forms } from "../store/forms";

export function formsReducer(store = forms, action){
    switch(action.type){
        case UPDATE_FORM_STATUS:
            if(typeof action.data.formName === 'string' && action.data.status){
                let newStore = {}; 
                newStore[action.data.formName] = {
                    status: action.data.status,
                    message: action.data.message?action.data.message:""
                };
                store = Object.assign({}, store, newStore);
            }
        break;
        default:
        break;
    }
    return store;
}