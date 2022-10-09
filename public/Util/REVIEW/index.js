// checks strings
function c(s1, s2) {
    return s1 === s2;
};
// checks if object needs an update
export default function REVIEW(o1, o2) {
    if (c(o1.title, o2.title) && c(o1.desc, o2.desc) && c(o1.urgent, o2.urgent)) return true;
    return false;
};