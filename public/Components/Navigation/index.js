import React from "react";
import { View, Button } from "react-native";

export default class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
            VIEW_NAMES: ['CLASS', 'ASSIGNMENT', 'NOTIFICATIONS', 'CALENDAR', 'SETTING']
        }
    }
    
    render() {
        return (
            <View>
                {this.state.VIEW_NAMES.map((NAME, index) => (
                    <Button 
                        key={index}
                        title={'View ' + NAME}
                        onPress={() => {this.props.UPDATE_VIEW('VIEW_' + NAME)}}
                    />
                ))}
            </View>
        )
    }
}