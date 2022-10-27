import {VIEW_ASSIGNMENT, VIEW_CLASS, VIEW_CALENDAR, VIEW_SETTINGS} from "../index";
import { Text } from "react-native";

export default function GLOBAL_VIEW(VIEW) {
    // PARAM VIEW = payload
    if (VIEW === 'VIEW_CLASS') return <VIEW_CLASS />;
    if (VIEW === 'VIEW_ASSIGNMENT') return <VIEW_ASSIGNMENT />;
    // if (VIEW === 'VIEW_NOTIFICATIONS') return
    if (VIEW === 'VIEW_CALENDAR') return <VIEW_CALENDAR />;
    if (VIEW === 'VIEW_SETTINGS') return <VIEW_SETTINGS />;
    return <Text style={{ fontSize: 20 }}>Look's Empty!</Text>; // IF VIEW DOES NOT EQUAL SET OF VIEWS POSSIBLE DEFAULT IS TEXT
}