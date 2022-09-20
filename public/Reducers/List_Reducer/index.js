import { ADD_TODO, CHANGE_VIEW, ADD_CLASS } from '../../Actions/Action_Type';

// MAYBE ADD STATE INFO VIA https://github.com/react-native-async-storage/async-storage

// Creating INITIAL STATE IN CASE OF NO MUTATION
const TODO_STATE = {
    URGENT: [], // USED FOR WHEN A TASK IS SET AS FLAGGED AND CAN BE USED FOR REMINDERS
    TODO_LIST: []
};

const VIEW_STATE = {
    VIEW: 'VIEW_CLASS' // default value
}

const CLASS_STATE = {
    CLASSES: []
}

// User login
const LOGGED_STATE = {
    LOGGEDIN: false
}

function checkCLASSES(CLASSES, ID) {
    for (let index = 0; index < CLASSES.length; index++) {
        if (CLASSES[index].class_ID === ID) {
            return true;
        }
    }
}

export function CLASS_REDUCER (state = CLASS_STATE, action) {
    switch (action.type) {
        case ADD_CLASS:
        // GETS CLASS ARRAY FROM STATE PASSED IN FUNCTION
        const {
            CLASSES
        } = state;

        // SETTING POST_CLASS_OBJECT TO OBJECT PASSED FROM ACTION
        const POST_CLASS_OBJECT = action.payload;

        // RUN SEARCH TO PREVENT USER FROM ADDING 2 OF SAME CLASS
        // LIKELY REMOVE IN FUTURE IN CASE OF TOO MUCH RUNTIME/MEMORY USAGE
        // CAN REPLACE BY HAVING DB POST RUN FILTER
        if (checkCLASSES(CLASSES, POST_CLASS_OBJECT.class_ID)) {
            alert('cannot add two of same class type!')
            alert('this button is in testmode, so it only sends a hardcoded object which does not have a different id at the moment')
            return {CLASSES};
        } else {
            // PUSHING NEW OBJECT TO CLASS ARRAY if no matching id
            CLASSES.push(POST_CLASS_OBJECT); // FINALLY ADDING PAYLOAD (USER TODO) TO TODO ARRAY if urgency
        
            const UPDATED_STATE = {CLASSES};
            
            // RETURNING UPDATED STATE
            return UPDATED_STATE;
        }

        // IF NO ACTION.TYPE, RETURNS STATE!
        default:
            return state; // IN MAPSTATETOPROPS, GETTING EXACT VALUE FOR VIEW WITH STATE.VIEW
    }
}

// REDUCER CALLED WHEN ATTEMPTING TO GET VIEW IN STATE OR CHANGE THE VIEW!
export function VIEW_REDUCER (state = VIEW_STATE, action) {
    switch (action.type) {
        case CHANGE_VIEW:
        // GETS STATE VALUE OF CURRENT VIEW
        const VIEW = state;

        // SETTING ADJUST_VIEW TO VALUE SENT IN PAYLOAD
        const ADJUST_VIEW = action.payload;
        
        // REWRITING VIEW VALUE TO CHANGE VALUE GLOBALLY
        VIEW.VIEW = ADJUST_VIEW;

        const UPDATED_STATE = VIEW;

        return UPDATED_STATE;

        // IF NO ACTION.TYPE, RETURNS STATE!
        default:
            return state; // IN MAPSTATETOPROPS, GETTING EXACT VALUE FOR VIEW WITH STATE.VIEW
    }
}

// REDUCER CALLED WHICH WILL SWITCH MUTATION/GETTER WITH ACTION TYPE
export function TODO_REDUCER (state = TODO_STATE, action) {
    switch (action.type) {
        case ADD_TODO:
            // GETS URGENT AND TODO ARRAYS FROM STATE (STATE = INIT_STATE)
        const {
            URGENT,
            TODO_LIST
        } = state;

        // SETTING POST_TODO TO THE TODO CREATED BY USER AND ADDING IT TO TODO ARRAY IN STATE
        const POST_TODO_OBJECT = action.payload;
        
        // ACTION.PAYLOAD.LENGTH IS GREATER THAN 0 IF A PARAMETER IS SENT AS 'URGENT' TO ADD TODO TO URGENT ARRAY
        (POST_TODO_OBJECT.urgent === true) ? (URGENT.push(POST_TODO_OBJECT), TODO_LIST.push(POST_TODO_OBJECT)) :  TODO_LIST.push(POST_TODO_OBJECT); // FINALLY ADDING PAYLOAD (USER TODO) TO TODO ARRAY if urgency

        const UPDATED_STATE = {TODO_LIST, URGENT};
        
        return UPDATED_STATE;

        // IF NO ACTION.TYPE, RETURNS STATE!
        default:
            return state; // MAPSTATETOPROPS, GETTING BOTH ARRAYS FOR TODO AND URGENT
    }
};