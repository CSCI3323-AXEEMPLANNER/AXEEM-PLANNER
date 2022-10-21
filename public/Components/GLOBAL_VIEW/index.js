import {VIEW_ASSIGNMENT, VIEW_CLASS, VIEW_CALENDAR} from "../index";
import { Text } from "react-native";

export default function GLOBAL_VIEW(VIEW, FUNK) {
    // Creating specific functions from FUNK = functions passed from canvas
    const createTodo = (obj) => FUNK.createTodo(obj);
    const deleteTodo = (obj) => FUNK.deleteTodo(obj);
    const Todos = FUNK.Todos;
    // PARAM VIEW = payload
    if (VIEW === 'VIEW_CLASS') return <VIEW_CLASS />;
    if (VIEW === 'VIEW_ASSIGNMENT') return <VIEW_ASSIGNMENT Todos={Todos} post_TODO={createTodo} delete_TODO={deleteTodo}/>;
    // if (VIEW === 'VIEW_NOTIFICATIONS') return
    if (VIEW === 'VIEW_CALENDAR') return <VIEW_CALENDAR Todos={Todos} />;
    // if (VIEW === 'VIEW_SETTING') return
    return <Text style={{ fontSize: 20 }}>Look's Like that View does not exist! How did you get here?</Text>; // IF VIEW DOES NOT EQUAL SET OF VIEWS POSSIBLE DEFAULT IS TEXT
}