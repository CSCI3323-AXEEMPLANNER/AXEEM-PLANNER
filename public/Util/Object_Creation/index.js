// Throws Exception?
export default function OBJECT_CREATION(title, desc, urgent) {
    // LIKELY ADD PREVENTION OF ADDITION IF ATLEAST TITLE OR DESCRIPTION IS EMPTY
    const obj = {'title': title, "desc": desc, "urgent": urgent}
    return obj;
};