import React from "react";
import { TouchableHighlight, Text, Button } from "react-native";

// type SHOULD BE STRING OF WHAT THE STATE ARRAY IS > 'TODO' 'URGENT'
export default class PASS_THROUGH extends React.Component {
    render() {
        const type = this.props.type;
        const obj = this.props.PROP_STATE;
        if (type === 'TODO' || type === 'URGENT') {
        return (
            obj.map((ITEM, index) => (
                    <TouchableHighlight
                    key={index}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => this.props.view_ME(ITEM, index)} // Could have a function to bring closer to user via enlarged view!
                    >
                        <Text
                            key={index}
                        >
                            Title: {ITEM.title}
                            Description: {ITEM.desc}
                            Flagged: {((ITEM.urgent) ? 'YES' : 'NOPE')}
                            Date: {ITEM.date}
                        </Text>
                    </TouchableHighlight>
                ))
            )
        }
        if (type === 'EDIT') {
            return (
                <>
                    <Text>
                        Date: {obj.date + '\n'}
                        Time: {obj.time + '\n'}
                        Title: {obj.title + '\n'}
                        Description: {obj.desc + '\n'}
                        Urgent: {((obj.urgent) ? 'YES' : 'NOPE')}
                    </Text>
                    <Button
                        title="Submit Changes"
                        activeOpacity={0.6}
                        underlayColor="#FFFFFF"
                        onPress={() => {alert("Applying Changes"); this.props.view_ME()}}
                    >
                    </Button>
                </>
            )
        }
    }
}