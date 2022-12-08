// Throws Exception?
export function TASK_OBJECT_CREATION(title, desc, urgent, date, time) {
    // LIKELY ADD PREVENTION OF ADDITION IF ATLEAST TITLE OR DESCRIPTION IS EMPTY
    // DATE & TIME UNDEFINED ARE IN CASE A USER DECIDED TO CREATE A TODO TASK WITHOUT THE NEED FOR A TIME OR DATE, CAN PLACE IN CALENDAR AT THE TIME OF CREATION
    const obj = {'id': new Date().getTime(), 'title': title, 'desc': desc, 'urgent': urgent, 'date': (date === undefined) ? new Date().getTime() : date, 'time': (time === undefined) ? new Date().getTime() : time}
    return obj;
};

export function CLASS_OBJECT_CREATION(class_ID, date, time) {
    // professor_ID WILL LIKELY BE FOREIGN KEY
    // LIKELY ADD PREVENTION OF ADDITION IF ATLEAST TITLE OR DESCRIPTION IS EMPTY
    const obj = {'class_ID': class_ID, 'date': (date === undefined) ? new Date().getTime() : date, 'time': (time === undefined) ? new Date().getTime() : time}
    return obj;
};

// export function CLASS_OBJECT_CREATION(class_ID, name, desc, professor_ID, date, time) {
//     // professor_ID WILL LIKELY BE FOREIGN KEY
//     // LIKELY ADD PREVENTION OF ADDITION IF ATLEAST TITLE OR DESCRIPTION IS EMPTY
//     const obj = {'class_ID': class_ID, 'name': name, "desc": desc, "professor_ID": professor_ID, 'date': (date === undefined) ? new Date().getTime() : date, 'time': (time === undefined) ? new Date().getTime() : time}
//     return obj;
// };