import React from "react";
import { View, Button } from "react-native";

export default class Navigation extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <View>
                <Button
                    title='View Classes!' // Will likely replace text with images or icons - MUST ADD ALT TEXT
                    onPress={() => {this.props.UPDATE_VIEW('VIEW_CLASS')}} // Will likely change from hardcoded string to e.target.title if image is primary
                />
                <Button
                    title='View Assignments!' // Will likely replace text with images or icons - MUST ADD ALT TEXT
                    onPress={() => {this.props.UPDATE_VIEW('VIEW_ASSIGNMENT')}}                
                />
                <Button
                    title='View Settings!' // Will likely replace text with images or icons - MUST ADD ALT TEXT
                    onPress={() => {this.props.UPDATE_VIEW('VIEW_SETTING')}}                
                />
            </View>
        )
    }
}