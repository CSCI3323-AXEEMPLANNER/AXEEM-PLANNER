import React from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import Navigation from "../Navigation";
import { bindActionCreators } from "@reduxjs/toolkit";
import { CHANGE_VIEW_ACTION } from "../../Actions/List_Action";
import GLOBAL_VIEW from "../GLOBAL_VIEW";
import reactDom from "react-dom";

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = { view: "" };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  // BECAUSE THIS.PROPS.VIEW_STATE.VIEW WOULD NOT BE AVAILABLE BEFORE CLASS INSTANCE
  // WE CAN USE REACT'S COMPONENTDIDMOUNT FUNCTION TO CALL THE FUNCTION AS SOON AS THE COMPONENT IS IN THE TREE :)
  componentDidMount() {
    this.setState({ view: this.props.VIEW_STATE.VIEW });
  }

  // FUNCTION TO SEND TO CHILD COMPONENT, NAVIGATION AND CALL TO CHANGE CURRENT VIEW AND PARENT (CANVAS) STATE
  handleUpdate = (VIEW_NAME) => {
    if (VIEW_NAME === this.state.view) return null; // ADDED IN CASE OF ANY ISSUES WITH CONSTANT PAGE RELOADS
    this.props.CHANGE_VIEW_ACTION(VIEW_NAME);
    this.setState({ view: this.props.VIEW_STATE.VIEW }); // Gets new updated state in global state
  };

  // CAN USE THIS TO UPDATE USER WITH SUCCESS ON SOMETHING!
  // componentDidUpdate() {
  //     alert('something updated within THIS component')
  // }

  render() {
    return (
      <>
      {/* remeber to refactor this*/}
        <View style={styles.mainBody}>
         
          {/* Displays a welcome message for users*/}
          <View style={styles.greetContainer}>
            <Text style={styles.greetWelcome}>
              Welcome Back!{"\n"}
              <Text style={styles.greetUser}>User</Text>
            </Text>
          </View>
          {/* this text view displaying current view can be minimized to a single component for all instances! */}
          <Text style={styles.tabTitle}>{this.state.view}</Text>
          {/* Adjust view in canvas to view selected by user in navigation! */}
          {this.state.view !== null ? GLOBAL_VIEW(this.state.view) : null}
          {/* CHILD NAVIGATION COMPONENT getting passed parent function handleUpdate */}
        </View>
        <Navigation UPDATE_VIEW={this.handleUpdate} />
    
      </>
    );
  }
}

// ALLOWS US TO MAKE TODOs AVAILABLE IN CANVAS CLASS
const mapStateToProps = (state) => {
  // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
  const { VIEW_STATE } = state;
  return { VIEW_STATE };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      CHANGE_VIEW_ACTION,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);

const styles = StyleSheet.create({
  /*container: {
    height: 400,
    width: "90%",
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },*/
  mainBody: {
    flex: 1,
    //borderRadius: 50,
    //backgroundColor: "#9326c7", //"#9326c7",
    alignItems: 'center',
    //marginBottom: 80,
  },/*
  greetContainer: {
    height: 40,
    width: "40%",
    marginLeft: "55%",
    marginTop: 30,
  },
  greetWelcome: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  greetUser: {
    fontSize: 12,
    color: "#FF7878",
    textAlign: "center",
   },*/
  tabTitle: {
    height: 40,
    width: "90%",
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    //backgroundColor: 'red',
  },
});
