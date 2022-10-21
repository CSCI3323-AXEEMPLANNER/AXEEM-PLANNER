import { ADD_TODO, ADD_CLASS, CHANGE_VIEW, REMOVE_TODO, EDIT_TODO, SET_S_DATE, SET_E_DATE, SET_LOGGED } from "../Action_Type";

export const SET_LOGGED_ACTION = TRUE => (
  {
    type: SET_LOGGED,
    payload: TRUE
  }
);

export const EDIT_TODO_ACTION = TODO_OBJECT => (
  {
    type: EDIT_TODO,
    payload: TODO_OBJECT
  }
);

export const REMOVE_TODO_ACTION = INDEX => (
  {
    type: REMOVE_TODO,
    payload: INDEX
  }
);

export const ADD_TODO_ACTION = TODO_OBJECT => (
    {
      type: ADD_TODO,
      payload: TODO_OBJECT, // PAYLOAD IS THE OBJECT SENT TO ADD_TODO_ACTION IN EVENT
    }
);

export const ADD_CLASS_ACTION = CLASS_OBJECT => (
  {
    type: ADD_CLASS,
    payload: CLASS_OBJECT, // PAYLOAD IS THE OBJECT SENT FROM ADD_CLASS_ACTION EVENT
  }
);

export const CHANGE_VIEW_ACTION = NEW_VIEW => (
  {
    type: CHANGE_VIEW,
    payload: NEW_VIEW, // PAYLOAD WILL EQUAL STRING SENT FROM CHANGE_VIEW_ACTION EVENT
  }
);

// To set start date of calendar view
export const SET_START_DATE = NEW_DATE => (
  {
    type: SET_S_DATE,
    payload: NEW_DATE
  }
)

// To set end date of calendar view
export const SET_END_DATE = NEW_DATE => (
  {
    type: SET_E_DATE,
    payload: NEW_DATE
  }
)