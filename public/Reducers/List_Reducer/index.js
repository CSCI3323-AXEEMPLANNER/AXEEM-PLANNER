import { ADD_TODO, REMOVE_TODO, CHANGE_VIEW, ADD_CLASS, GET_TODO, EDIT_TODO, SET_S_DATE, SET_E_DATE } from '../../Actions/Action_Type';

// MAYBE ADD STATE INFO VIA https://github.com/react-native-async-storage/async-storage

// Creating INITIAL STATE IN CASE OF NO MUTATION
const TODO_STATE = {
    URGENT: [], // USED FOR WHEN A TASK IS SET AS FLAGGED AND CAN BE USED FOR REMINDERS
    TODO_LIST: [{
        title: 'Hello',
        desc: 'Walk for a mile',
        urgent: false,
    },
    ]
};

const VIEW_STATE = {
    VIEW: 'VIEW_CLASS' // default value
}

const CLASS_STATE = {
    CLASSES: [
        {
            class_ID: "122",
            name: "CSCI 3342",
            desc: "Software Engineering",
            professor_ID: "232",
            date: "MW 4:00 PM - 5:15 PM"
        },
        {
            class_ID: "123",
            name: "CSCI 4342",
            desc: "Database",
            professor_ID: "232",
            date: "MW 4:00 PM - 5:15 PM"
        },
        {
            class_ID: "223",
            name: "CSCI 4560",
            desc: "Software Modeling",
            professor_ID: "233",
            date: "TTH 4:00 PM - 5:15 PM"
        },
        {
            class_ID: "230",
            name: "CSCI 5342",
            desc: "AI",
            professor_ID: "242",
            date: "MW 12:00 PM - 3:15 PM"
        },
        {
            class_ID: "430",
            name: "CSCI 5542",
            desc: "Machine Learning",
            professor_ID: "432",
            date: "MW 5:00 PM - 7:15 PM"
        },
        {
            class_ID: "123",
            name: "CSCI 5642",
            desc: "Lab ML",
            professor_ID: "632",
            date: "MW 8:00 PM - 9:15 PM"
        }
        
    ]
}

// Allows a re-renderable date selection for calendar view
const DATE_STATE = {
    s_Date: new Date().setDate(new Date().getDate() + 0),
    e_Date: new Date().setDate(new Date().getDate() + 5)
}

// User login
const LOGGED_STATE = {
    LOGGEDIN: false
}

// Checks if item exists to not duplicate
function checkCLASSES(ARRAY, ID) {
    for (let index = 0; index < ARRAY.length; index++) {
        if (ARRAY[index].class_ID === ID) {
            return true;
        }
    }
}

// Should not need an throw due to an urgent or todo item not existing unless in array
function getINDEX(ARRAY, ID) {
    let index;
    for(var i = 0; i < ARRAY.length; i++) {
        if(ARRAY[i].id === ID) {
            index = i;
            return index;
        }
    }
}

function setObj(OLD_OBJ, NEW_OBJ) {
    // Creating new object
    const temp_OBJ = OLD_OBJ;
    const REMOVE_URGENT = temp_OBJ.urgent;
    temp_OBJ.title = NEW_OBJ.title;
    temp_OBJ.desc = NEW_OBJ.desc;
    temp_OBJ.urgent = NEW_OBJ.urgent;

    // Checks if the edit requires the object to be adjusted in other arrays
    if (temp_OBJ.urgent !== REMOVE_URGENT) {
        if (REMOVE_URGENT === true) {
            TODO_STATE.URGENT.splice(getINDEX(TODO_STATE.URGENT, temp_OBJ.id), 1); // to remove from urgent! TEMPORARY FIX
        }

        if (REMOVE_URGENT === false) {
            TODO_STATE.URGENT.push(temp_OBJ);
        }
    }

    return temp_OBJ;
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
        
        // ACTION.PAYLOAD.LENGTH IS GREATER THAN 0 IF A PARAMETER IS SENT AS 'URGENT' TO ADD TODO TO URGENT ARRAY
        (POST_TODO_OBJECT.urgent === true) ? (URGENT.push(POST_TODO_OBJECT), TODO_LIST.push(POST_TODO_OBJECT)) :  TODO_LIST.push(POST_TODO_OBJECT); // FINALLY ADDING PAYLOAD (USER TODO) TO TODO ARRAY if urgency

        const UPDATED_STATE = {TODO_LIST, URGENT};
        
        return UPDATED_STATE;

        case EDIT_TODO:
        
        var {
            URGENT,
            TODO_LIST
        } = state;
        
        const TODO_FOR_REPLACE_ID = action.payload.id;
        const TODO_REPLACEMENT = action.payload.obj; // is new object, if object is different at any area, it will update in todo array/urgent array

        var TODO_INDEX_TODOLIST = getINDEX(TODO_LIST, TODO_FOR_REPLACE_ID);

        const UPDATED_OBJECT = setObj(TODO_LIST[TODO_INDEX_TODOLIST], TODO_REPLACEMENT);

        if (TODO_LIST[TODO_INDEX_TODOLIST].urgent === true) {
            // item is also urgent
            let TODO_INDEX_URGENT = getINDEX(URGENT, TODO_FOR_REPLACE_ID);
            URGENT[TODO_INDEX_URGENT] = UPDATED_OBJECT;
        }

        TODO_LIST[TODO_INDEX_TODOLIST] = UPDATED_OBJECT;

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

        return TODO_AFTER_REMOVAL;

        // IF NO ACTION.TYPE, RETURNS STATE!
        default:
            return state; // MAPSTATETOPROPS, GETTING BOTH ARRAYS FOR TODO AND URGENT
    }
};