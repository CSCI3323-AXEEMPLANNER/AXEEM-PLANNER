import React from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { ADD_TODO_ACTION } from '../../Actions/List_Action';
import { TASK_OBJECT_CREATION } from '../Object_Creation';

// INITIAL STATE SETUP FOR LOCAL STATE ON SUBMIT
const INIT_STATE = {
    title: 'title',
    desc: 'description',
    urgent: false
}

class ADD_TASK extends React.Component {
    constructor() {
        super();
        // STATE CREATED IN CANVAS LOCALLY TO MAINTAIN INPUTS READY FOR PUSH
        this.state = INIT_STATE;
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
                <Text style={{fontSize: '20px'}}>Your current TODO</Text>
                <Text style={{fontSize: '20px'}}>{this.state.title}</Text>
                <Text style={{fontSize: '20px'}}>{this.state.desc}</Text>
                <Text style={{fontSize: '20px'}}>{(this.state.urgent).toString()}</Text>

                <TextInput
                style={{ height: 40, borderColor: "black", borderWidth: 1 }}
                onChangeText={event =>  this.handleChange('title', event)}
                placeholder={'title'}
                required={true}
                />
                
                <TextInput
                style={{ height: 40, borderColor: "black", borderWidth: 1 }}
                onChangeText={event =>  this.handleChange('desc', event)}
                placeholder={'text'}
                required={true}
                />
                
                <Text>Add to Urgent</Text>
                
                <Checkbox
                    value={this.state.urgent}
                    onValueChange={event => this.handleChange('urgent', event)}
                />
                <Button 
                    title='Create your Task!'
                    onPress={() =>
                        {this.props.ADD_TODO_ACTION(TASK_OBJECT_CREATION(this.state.title, this.state.desc, this.state.urgent)); this.props.view_Task()}
                    }
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        ADD_TODO_ACTION
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(ADD_TASK);