import { ADD_TODO, CHANGE_VIEW, GET_TODO } from "../Action_Type";

export const GET_TODO_ACTION = INDEX => (
  {
    type: GET_TODO,
    payload: INDEX // PAYLOD TO RETURN TODO AT INDEX
  }
);

export const ADD_TODO_ACTION = TODO_OBJECT => (
    {
      type: ADD_TODO,
      payload: TODO_OBJECT, // PAYLOAD IS THE OBJECT SENT TO ADD_TODO_ACTION IN EVENT
    }
);

export const CHANGE_VIEW_ACTION = NEW_VIEW => (
  {
    type: CHANGE_VIEW,
    payload: NEW_VIEW, // PAYLOAD WILL EQUAL STRING SENT FROM CHANGE_VIEW_ACTION EVENT
  }
);