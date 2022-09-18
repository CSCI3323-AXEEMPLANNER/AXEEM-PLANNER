// Throws Exception?
export function TASK_OBJECT_CREATION(title, desc, urgent) {
    // LIKELY ADD PREVENTION OF ADDITION IF ATLEAST TITLE OR DESCRIPTION IS EMPTY
    const obj = {'title': title, 'desc': desc, 'urgent': urgent}
    return obj;
};

export function CLASS_OBJECT_CREATION(class_ID, name, desc, professor_ID) {
    // professor_ID WILL LIKELY BE FOREIGN KEY
    // LIKELY ADD PREVENTION OF ADDITION IF ATLEAST TITLE OR DESCRIPTION IS EMPTY
    const obj = {'class_ID': class_ID, 'name': name, "desc": desc, "professor_ID": professor_ID}
    return obj;
};