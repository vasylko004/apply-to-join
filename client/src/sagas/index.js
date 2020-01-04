import { call, put, takeEvery } from 'redux-saga/effects';
import { GraphQL  } from "../actions";
import { UPDATE_FORM_STATUS, APPLY_TO_JOIN } from "../constants";

function* requestApplyTo(action){
    console.log("saga effects", action);
    try{
        yield put({ type: UPDATE_FORM_STATUS, data: { formName: 'appyToJoin', status: 1 } });
        const result = yield call(GraphQL.mutation.applyToJoin, action.data);
        console.log("saga effects > requestApplyTo", result);
        yield put({ type: UPDATE_FORM_STATUS, data:{ formName: "appyToJoin", status: 2 }});
    }catch(error){
        yield put({ type: UPDATE_FORM_STATUS, data: { formName: 'appyToJoin', status: 3 } });
    }
}

function* actionsSaga(){
    yield takeEvery(APPLY_TO_JOIN.REQUEST, requestApplyTo);
}


export default actionsSaga;