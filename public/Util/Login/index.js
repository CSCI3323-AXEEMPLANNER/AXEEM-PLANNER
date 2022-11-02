import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from 'react-redux';
import { SET_LOGGED_ACTION } from "../../Actions/List_Action";
import { bindActionCreators } from "@reduxjs/toolkit";

const s = "student";
const t = "tutor";
const p = "professor";
const a = "admin";

const INIT_STATE = {
    email: 'test@gmail.com',
    password: 'pass123',
    type: s // default value for type of login is student
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        // STATE CREATED IN CANVAS LOCALLY TO MAINTAIN INPUTS READY FOR PUSH
        this.state = INIT_STATE;
        this.handleChange = this.handleChange.bind(this);
        this.onPressSignIn = this.onPressSignIn.bind(this);
        // this.onPressSignUp = this.onPressSignUp.bind(this);
    }

    componentDidMount() {
        console.log("Looks like no user!");
    }

    onPressSignIn = async () => {
        console.warn("Trying sign in with user: " + this.state.email);
        try {
            await this.props.signIn(this.state.email, this.state.password, this.state.type);
            this.props.SET_LOGGED_ACTION(true);
        } catch (error) {
            const errorMessage = `Failed to sign in: ${error.message}`;
            console.error(errorMessage);
        }
    };

    // For admin use only
    // onPressSignUp = async () => {
    //     console.log("Trying signup with user: " + this.state.email, this.state.type);
    //     try {
    //         await this.props.signUp(this.state.email, this.state.password);
    //     } catch (error) {
    //         const errorMessage = `Failed to sign up: ${error.message}`;
    //         console.error(errorMessage);
    //     }
    // };

    // ALLOWS FOR COMPONENT'S STATE TO UPDATE ON TEXT INPUT CHANGE
    handleChange = (ref, event) => {
        this.setState(prevState => ({[ref]: prevState = event}));
    }
    
    render() {
        return(
            <View>
                {/* REDUCE TO A SEPARATE COMPONENT TO DISPLAY */}
                <Text style={{fontSize: 20}}>Email: {this.state.email}</Text>
                <Text style={{fontSize: 20}}>Login in as a: {this.state.type}</Text>
                <TextInput
                style={{ height: 40, borderColor: "black", borderWidth: 1 }}
                onChangeText={event =>  this.handleChange('email', event)}
                defaultValue={this.state.email}
                autoFocus={true}
                required={true}
                />
                
                <TextInput
                style={{ height: 40, borderColor: "black", borderWidth: 1 }}
                onChangeText={event =>  this.handleChange('password', event)}
                defaultValue={this.state.password}
                required={true}
                secureTextEntry
                />

                <Button 
                title="I'm a Student"
                onPress={() => this.setState({type: s})}
                />
                {/* <Button 
                title="I'm a Tutor"
                onPress={() => this.setState({type: t})}
                
                /> */}
                {/* <Button 
                title="I'm a Professor"
                onPress={() => this.setState({type: p})}
                /> */}
                <Button 
                title="I'm a Administrator"
                onPress={() => this.setState({email: "admin@gmail.com", type: a})}
                />

                <Button 
                title="Click to Sign In!"
                onPress={() => this.onPressSignIn()}
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        SET_LOGGED_ACTION
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Login);