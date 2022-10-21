import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import Navigation from '../Navigation';
import { bindActionCreators } from '@reduxjs/toolkit';
import { CHANGE_VIEW_ACTION } from '../../Actions/List_Action';
import GLOBAL_VIEW from '../GLOBAL_VIEW';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {view: ''}
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    
    // BECAUSE THIS.PROPS.VIEW_STATE.VIEW WOULD NOT BE AVAILABLE BEFORE CLASS INSTANCE
    // WE CAN USE REACT'S COMPONENTDIDMOUNT FUNCTION TO CALL THE FUNCTION AS SOON AS THE COMPONENT IS IN THE TREE :)
    componentDidMount() {
        this.setState({view: this.props.VIEW_STATE.VIEW});
    }

    // FUNCTION TO SEND TO CHILD COMPONENT, NAVIGATION AND CALL TO CHANGE CURRENT VIEW AND PARENT (CANVAS) STATE
    handleUpdate = (VIEW_NAME) => {
        if (VIEW_NAME === this.state.view) return null; // ADDED IN CASE OF ANY ISSUES WITH CONSTANT PAGE RELOADS
        this.props.CHANGE_VIEW_ACTION(VIEW_NAME)
        this.setState({view: this.props.VIEW_STATE.VIEW}) // Gets new updated state in global state
    }

    render() {
        return (
        <View>
            {/* this text view displaying current view can be minimized to a single component for all instances! */}
            <Text style={{ fontSize: 40 }}>You are viewing: {this.state.view}</Text>
            {/* Adjust view in canvas to view selected by user in navigation! */}
            {this.state.view !== null ? GLOBAL_VIEW(this.state.view, this.props) : null}
            {/* CHILD NAVIGATION COMPONENT getting passed parent function handleUpdate */}
            <Navigation UPDATE_VIEW={this.handleUpdate} />
        </View>
    )}
}

// ALLOWS US TO MAKE TODOs AVAILABLE IN CANVAS CLASS
const mapStateToProps = (state) => {
    // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
    const { VIEW_STATE } = state
    return { VIEW_STATE };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        CHANGE_VIEW_ACTION
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);