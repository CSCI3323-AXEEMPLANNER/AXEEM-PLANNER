import { combineReducers } from 'redux'
import { TODO_REDUCER, VIEW_REDUCER } from './List_Reducer';

// allReducers IS EXPORTED AS A CONST WHICH WILL HOLD TODO AND VIEW, CALLING THEIR REDUCERS
const allReducers = combineReducers({
    TODO_STATE: TODO_REDUCER,
    VIEW_STATE: VIEW_REDUCER
 });

export default allReducers;