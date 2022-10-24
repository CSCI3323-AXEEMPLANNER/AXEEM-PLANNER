import React from "react";
import { TouchableHighlight, Text, Button } from "react-native";
import ADD_TASK from "../ADD_TASK";
import {to_Date, to_Time, to_Zero} from "../../Util/TO_DATE";

// type SHOULD BE STRING OF WHAT THE STATE ARRAY IS > 'TODO' 'URGENT'
export default class PASS_THROUGH extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_ME: false
        }
        this.handle_Edit_Mode = this.handle_Edit_Mode.bind(this);
    }

    handle_Edit_Mode = () => { 
        this.setState(prevState => ({edit_ME: !prevState.edit_ME}))
    }

    render() {
        const type = this.props.type;
        const obj = this.props.PROP_STATE;
        if (type === 'TODO' || type === 'URGENT' && obj.length > 0) {
        return (
            obj.map((ITEM, index) => (
                    <TouchableHighlight
                    key={index}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => this.props.view_ME(ITEM, index)}
                    >
                        <Text
                            key={index}
                        >
                            Title: {ITEM.title}
                            Description: {ITEM.desc}
                            Flagged: {((ITEM.urgent) ? 'YES' : 'NOPE')}
                            Date: {to_Date(ITEM.date)}
                            Time: {to_Time(ITEM.time)}
                        </Text>
                    </TouchableHighlight>
                ))
            )
        }
        if (type === 'EDIT') {
            const obj = this.props.PROP_STATE.THIS_TODO;
            return (
                <>
                    {/* While edit in modal is no clicked, we will view only the item */}
                    {this.state.edit_ME === false ?
                    <>
                        <Text>
                            Date: {to_Date(obj.date) + '\n'}
                            Time: {to_Time(obj.time) + '\n'}
                            Title: {obj.title + '\n'}
                            Description: {obj.desc + '\n'}
                            Urgent: {((obj.urgent) ? 'YES' : 'NOPE')}
                        </Text>
                        <Button
                            title={this.state.edit_ME ? null : "Edit TODO"}
                            activeOpacity={0.6}
                            underlayColor="#FFFFFF"
                            onPress={() => {this.handle_Edit_Mode();}} 
                        />
                    </>
                    // when edit button is clicked, add_task is returned to update the item at id!
                    : <ADD_TASK in_Edit={this.state.edit_ME} RLM_EDIT={this.props.RLM_EDIT} in_Edit_obj={obj} view_Task={this.handle_Edit_Mode} /> // view_Task here is adjusting the state value in this instance view_ME func.
                    }
                    <Button
                        title="Delete"
                        activeOpacity={0.6}
                        underlayColor="#FFFFFF"
                        onPress={() => {
                            const id = obj._id;
                            try {
                                this.props.DELETE_ME(id);
                                this.props.RLM_DELETE(id);
                            } catch (e) {
                                console.error(e)
                            }
                            this.props.view_ME();
                        }}
                    />
                    <Button
                        title="Exit"
                        activeOpacity={0.6}
                        underlayColor="#FFFFFF"
                        onPress={() => {this.props.view_ME();}}
                    />
                </>
            )
        }
        if (type === 'DATE') {
            const todos = obj.TODO;
            const classes = obj.CLASS;
            return (
                <>
                <Text>Todos or Assignments</Text>
                {todos.map((ITEM, index) => {
                    // ISSUE: When a todo is created its date works fine when comparing to the prop date
                    // |-> Unfortunately, when the user RE-logs into their account, the date is rendered as one less day?
                    // Checks if date of item is between (inclusive) dates set by user or app
                    if (ITEM.date >= this.props.date.s_Date && to_Zero(ITEM.date) <= this.props.date.e_Date) { // to_Zero because an items date may be ahead of the set
                    return (
                        <TouchableHighlight
                        key={index}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => this.props.view_ME(ITEM, index)}
                        >
                            <Text
                                key={index}
                            >
                                Title: {ITEM.title}
                                Flagged: {((ITEM.urgent) ? 'YES' : 'NOPE')}
                                Date: {to_Date(ITEM.date)}
                            </Text>
                        </TouchableHighlight>
                    )}
                })} 
                <Text>Classes</Text>
                {classes.map((ITEM, index) => {
                    if (ITEM.date >= this.props.date.s_Date && to_Zero(ITEM.date) <= this.props.date.e_Date) {
                        return (
                        <TouchableHighlight
                        key={index}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => alert('This class will have a separate view! Just not completed :)')}
                        >
                            <Text
                                key={index}
                            >
                                ID: {ITEM.class_ID}
                                Time: {to_Time(ITEM.time)}
                                Date: {to_Date(ITEM.date)}
                            </Text>
                        </TouchableHighlight>
                    )} else return <Text key={index}>Nothing To Display :L</Text>;
                })}
                </>
            )
        }
    }
}