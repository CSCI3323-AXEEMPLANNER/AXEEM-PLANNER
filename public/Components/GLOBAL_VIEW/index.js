import {VIEW_ASSIGNMENT, VIEW_CLASS} from "../index";
import { Text } from "react-native";

export default function GLOBAL_VIEW(VIEW) {
    // PARAM VIEW = payload
    if (VIEW === 'VIEW_CLASS') return <VIEW_CLASS />;
    if (VIEW === 'VIEW_ASSIGNMENT') return <VIEW_ASSIGNMENT />;
    // if (VIEW === 'VIEW_CALENDAR') return 
    // if (VIEW === 'VIEW_SETTING') return
    return <Text style={{ fontSize: '20px' }}>Look's Empty!</Text>; // IF VIEW DOES NOT EQUAL SET OF VIEWS POSSIBLE DEFAULT IS TEXT
}