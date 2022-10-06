import { combineReducers } from 'redux'
import { TODO_REDUCER, VIEW_REDUCER, CLASS_REDUCER, CALENDAR_REDUCER } from './List_Reducer';

// allReducers IS EXPORTED AS A CONST WHICH WILL HOLD TODO AND VIEW, CALLING THEIR REDUCERS
const allReducers = combineReducers({
    CLASS_STATE: CLASS_REDUCER,
    TODO_STATE: TODO_REDUCER,
    VIEW_STATE: VIEW_REDUCER,
    DATE_STATE: CALENDAR_REDUCER
 });

export default allReducers;