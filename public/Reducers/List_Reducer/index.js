import { ADD_TODO, REMOVE_TODO, CHANGE_VIEW, ADD_CLASS, RESET, EDIT_TODO, SET_S_DATE, SET_E_DATE, SET_LOGGED } from '../../Actions/Action_Type';
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

// Allows a re-renderable date selection for calendar view
// Dates here are initially set to 5 days apart, but can be changed via user input
const DATE_STATE = {
    s_Date: new Date().setDate(new Date().getDate() + 0),
    e_Date: new Date().setDate(new Date().getDate() + 5)
}

// User login -> storing a boolean here for future
const LOGGED_STATE = {
    LOGGEDIN: false // default value
}

// Should not need an throw due to an urgent or todo item not existing unless in array
function getINDEX(ARRAY, ID) {
    let index = -1;
    for(var i = 0; i < ARRAY.length; i++) {
        if(ARRAY[i]._id.equals(ID)) {
            index = i;
            return index;
        }
    }
}

export function LOGIN_REDUCER (state = LOGGED_STATE, action) {
    switch (action.type) {

    case SET_LOGGED:

    let IS_LOGGED = action.payload;

    state.LOGGEDIN = IS_LOGGED;

    const LOG_CONDITION = LOGGED_STATE;

    return LOG_CONDITION;
    
    default:
            return state;
    }
}

// Setting date in global state, should already have calculated date
export function CALENDAR_REDUCER (state = DATE_STATE, action) {
    switch (action.type) {
        case SET_S_DATE:

        let NEW_S_Date = action.payload;
        
        state.s_Date = NEW_S_Date;

        const POST_S_STATE = DATE_STATE;

        return POST_S_STATE;

        case SET_E_DATE:

        let NEW_E_Date = action.payload;
    
        state.e_Date = NEW_E_Date;

        const POST_E_STATE = DATE_STATE;

        return POST_E_STATE;

        default:
            return state;
    }
}

export function CLASS_REDUCER (state = CLASS_STATE, action) {
    switch (action.type) {
        case ADD_CLASS:
        // GETS CLASS ARRAY FROM STATE PASSED IN FUNCTION
        var {
            CLASSES
        } = state;

        // SETTING POST_CLASS_OBJECT TO OBJECT PASSED FROM ACTION
        const POST_CLASS_OBJECT = action.payload;

        POST_CLASS_OBJECT.forEach(item => {
            item !== undefined ? CLASSES.push(item) : null
        });

        // Should just contain the objects for each class that are in realms
        const UPDATED_STATE = CLASSES;
        
        // RETURNING UPDATED STATE
        return UPDATED_STATE;

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

        const UPDATED_VIEW = VIEW;

        return UPDATED_VIEW;

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
        var {
            URGENT,
            TODO_LIST
        } = state;

        // SETTING POST_TODO TO THE TODO CREATED BY USER AND ADDING IT TO TODO ARRAY IN STATE
        const POST_TODO_OBJECT = action.payload;

        (POST_TODO_OBJECT.urgent === true) ? (URGENT.push(POST_TODO_OBJECT), TODO_LIST.push(POST_TODO_OBJECT)) :  TODO_LIST.push(POST_TODO_OBJECT); // FINALLY ADDING PAYLOAD (USER TODO) TO TODO ARRAY if urgency

        const UPDATED_STATE = {TODO_LIST, URGENT};
        
        return UPDATED_STATE;

        case EDIT_TODO:

        var {
            URGENT,
            TODO_LIST
        } = state;
        
        // Objects from payload
        const TODOID_FOR_CHECK = action.payload.id; // object id in concern
        const OLD_OBJ = action.payload.oldObj;
        const NEW_OBJ = action.payload.newObj

        // Storing previous values and adjusting to see if a revision was necessary
        let temp_OBJ = OLD_OBJ;
        const REMOVE_URGENT = temp_OBJ.oldUrgState;
        temp_OBJ.urgent = NEW_OBJ.urgent;

        if (temp_OBJ.urgent !== REMOVE_URGENT) {
            if (REMOVE_URGENT === true) {
                URGENT.splice(getINDEX(URGENT, TODOID_FOR_CHECK), 1); // to remove from urgent! TEMPORARY FIX
            } else {
                URGENT.push(NEW_OBJ);
            }
        }

        const TODO_AFTER_UPDATE = {TODO_LIST, URGENT};
        
        return TODO_AFTER_UPDATE;
        // Remove todo action
        case REMOVE_TODO:

        var {
            URGENT,
            TODO_LIST
        } = state;

        const TODO_ID = action.payload; // todo id to be deleted
        // with todo_id, find where it is placed (index)
        var TODO_INDEX_TODOLIST = getINDEX(TODO_LIST, TODO_ID);
        if (TODO_LIST[TODO_INDEX_TODOLIST].urgent === true) {
            // item is also urgent
            let TODO_INDEX_URGENT = getINDEX(URGENT, TODO_ID);
            URGENT.splice(TODO_INDEX_URGENT, 1); // RIGHT NOW REMOVAL IS ONLY ACCOUNTING FOR TODO_LIST, BUT SHOULD DO BOTH OR NEITHER DEPENDING ON GROUP DECISION!!!
        }

        // Regardless, if deleted, the item will be in todo
        TODO_LIST.splice(TODO_INDEX_TODOLIST, 1); // RIGHT NOW REMOVAL IS ONLY ACCOUNTING FOR TODO_LIST, BUT SHOULD DO BOTH OR NEITHER DEPENDING ON GROUP DECISION!!!

        const TODO_AFTER_REMOVAL = {TODO_LIST, URGENT};

        console.log("After removal: " + JSON.stringify(TODO_AFTER_REMOVAL))

        return TODO_AFTER_REMOVAL;

        case RESET:
        // A RESET FOR ALL
        var {
            URGENT,
            TODO_LIST
        } = state;

        console.warn(action.payload);

        // NEED TO RESET ARRAYS HERE
        URGENT = [];
        TODO_LIST = [];
        CLASS_STATE.CLASSES = [] // resetting classes for logout not the best practice -> time constraints

        var CS = CLASS_STATE.CLASSES;

        const RESET_ALL_STATE = {TODO_LIST, URGENT, CS};

        return RESET_ALL_STATE;

        // IF NO ACTION.TYPE, RETURNS STATE!
        default:
            return state; // MAPSTATETOPROPS, GETTING BOTH ARRAYS FOR TODO AND URGENT
    }
};