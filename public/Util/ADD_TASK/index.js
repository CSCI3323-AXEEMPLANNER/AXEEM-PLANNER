import React from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { ADD_TODO_ACTION, EDIT_TODO_ACTION } from '../../Actions/List_Action';
import { TASK_OBJECT_CREATION } from '../Object_Creation';
import REVIEW from "../REVIEW";

const INIT_STATE = {
    title: 'title',
    desc: 'desc',
    urgent: false
}

function CREATE_OBJ_STATE(obj) {
    const OBJ = {
        title: obj.title,
        desc: obj.desc,
        urgent: obj.urgent
    }
    return OBJ;
}

// Add task will be used for both task creation and update!
class ADD_TASK extends React.Component {
    constructor(props) { // passing props here to access ones that MAY not be sent from another source i.e: in_Edit from modal view
        super(props);
        // STATE CREATED IN CANVAS LOCALLY TO MAINTAIN INPUTS READY FOR PUSH
        if (this.props.in_Edit_obj !== undefined) {
            this.state = CREATE_OBJ_STATE(this.props.in_Edit_obj);
        }
        else this.state = INIT_STATE;
        this.handleChange = this.handleChange.bind(this);
    }

    // ALLOWS FOR COMPONENT'S STATE TO UPDATE ON TEXT INPUT CHANGE
    handleChange = (ref, event) => {
        if(ref !== 'urgent') {
            this.setState(prevState => ({[ref]: prevState = event}));
        } 
        else this.setState(prevState => ({[ref]: !prevState.urgent}));
    }
    
    render() {
        return(
            <View>
                {/* REDUCE TO A SEPARATE COMPONENT TO DISPLAY */}
                <Text style={{fontSize: 20}}>Your current TODO</Text>
                <Text style={{fontSize: 20}}>{this.state.title}</Text>
                <Text style={{fontSize: 20}}>{this.state.desc}</Text>
                <Text style={{fontSize: 20}}>{(this.state.urgent).toString()}</Text>

                <TextInput
                style={{ height: 40, borderColor: "black", borderWidth: 1 }}
                onChangeText={event =>  this.handleChange('title', event)}
                defaultValue={this.state.title}
                autoFocus={true}
                required={true}
                />
                
                <TextInput
                style={{ height: 40, borderColor: "black", borderWidth: 1 }}
                onChangeText={event =>  this.handleChange('desc', event)}
                defaultValue={this.state.desc}
                required={true}
                />
                
                <Text>Add to Urgent</Text>
                
                <Checkbox
                    value={this.state.urgent}
                    onValueChange={event => this.handleChange('urgent', event)}
                />
                {this.props.in_Edit === true ?
                <Button
                    title={"Update Task!"}
                    onPress={() =>
                        // CREATE A FUNCTION TO REVIEW OBJECTS AND COMPARE IF THE UPDATE VIEW NEEDS TO OCCUR!
                    {{REVIEW(this.props.in_Edit_obj, this.state) === true ? alert("no change found!") : this.props.RLM_EDIT(this.props.in_Edit_obj._id, this.state)} this.props.view_Task()}}
                />
                : <Button
                    title={"Add Task!"}
                    onPress={() =>
                    {this.props.post_TODO(TASK_OBJECT_CREATION(this.state.title, this.state.desc, this.state.urgent)); this.props.view_Task()}
                    }
                />
                }
                <Button 
                    onPress={() => this.props.view_Task()}
                    title="Cancel"
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        ADD_TODO_ACTION,
        EDIT_TODO_ACTION
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(ADD_TASK);