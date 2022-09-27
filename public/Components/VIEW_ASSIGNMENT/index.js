import React from 'react';
import { View, Button, Text, TextInput, TouchableHighlight } from 'react-native';
import Checkbox from 'expo-checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { ADD_TODO_ACTION } from "../../Actions/List_Action";
import {TASK_OBJECT_CREATION} from '../../Util/Object_Creation';

// INITIAL STATE SETUP FOR LOCAL STATE ON SUBMIT
const INIT_STATE = {
    title: 'title',
    desc: 'description',
    urgent: false
}

class VIEW_ASSIGNMENT extends React.Component {
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
                <Text style={{fontSize: 20}}>Your current TODO</Text>
                <Text style={{fontSize: 20}}>{this.state.title}</Text>
                <Text style={{fontSize: 20}}>{this.state.desc}</Text>
                <Text style={{fontSize: 20}}>{(this.state.urgent).toString()}</Text>
                <Text>You have { this.props.TODO_STATE.TODO_LIST.length } To-Do.</Text>

                {this.props.TODO_STATE.TODO_LIST.map((TODO, index) => (
                    <TouchableHighlight
                    key={index}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => alert(TODO.title)} // Could have a function to bring closer to user via enlarged view!
                    >
                        <Text
                            key={index}
                        >
                            Title: {TODO.title}
                            Description: {TODO.desc}
                            Flagged: {((TODO.urgent) ? 'YES' : 'NOPE')}
                        </Text>
                    </TouchableHighlight>
                ))}
                
                <Text>You have { this.props.TODO_STATE.URGENT.length } Urgent To-Do.</Text>

                {this.props.TODO_STATE.URGENT.map((URGENT, index) => (
                    <TouchableHighlight
                    key={index}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => alert(URGENT.title)} // Could have a function to bring closer to user via enlarged view!
                    >
                        <Text
                            key={index}
                        >
                            Title: {URGENT.title}
                            Description: {URGENT.desc}
                            Flagged: YES
                        </Text>
                    </TouchableHighlight>
                ))}
                
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
                    title='Create a Task!'
                    onPress={() =>
                        {this.props.ADD_TODO_ACTION(TASK_OBJECT_CREATION(this.state.title, this.state.desc, this.state.urgent));} //this.setState(INIT_STATE); CAN REWRITE STATE TO BE EMPTY AGAIN
                    }
                />
            </View>
        );
    }
}

// ALLOWS US TO MAKE TODOs AVAILABLE IN ASSIGNMENT CLASS
const mapStateToProps = (state) => {
    // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
    const { TODO_STATE } = state
    return { TODO_STATE };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        ADD_TODO_ACTION
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(VIEW_ASSIGNMENT);