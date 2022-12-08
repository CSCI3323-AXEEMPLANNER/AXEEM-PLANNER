import React from "react";
import { connect } from "react-redux";
import { View, Button, Text, StyleSheet } from "react-native";
import PASS_THROUGH from "../../Util/Object _Pass";
import MODAL_VIEW from "../../Util/Modal";
import { bindActionCreators } from '@reduxjs/toolkit';
import { SET_START_DATE, SET_END_DATE } from "../../Actions/List_Action";
import {to_Date} from "../../Util/TO_DATE";
import DateTimePicker from '@react-native-community/datetimepicker';
import {DisplayCalendarDates, DisplayMonth}from '../VIEW_CALENDAR/displayCalendarDays'

class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            obj: {THIS_TODO: null, index: null},
            s_Date: 0,
            e_Date: 0,
            content: {classes: [], assignments: [ 
             {
                title: "Homework 01: Solving Expressions Where life ends",
                urgent: false,
                date: "December 7, 2022",
                time: "1:00 PM",
                class: "Math 1234"
            },
            {
                title: "Exam 1",
                urgent: false,
                date: "December 8, 2022 11:00:00",
                time: "10:30 PM",
                class: "Stats",
            }
        ], todos: []},
            show_Date: {on: false, type: ''}
        };
        this.handle_Modal_Change = this.handle_Modal_Change.bind(this);
        this.SENDER = this.SENDER.bind(this);
        this.CALC_AND_SEND = this.CALC_AND_SEND.bind(this);
        this.handle_Date_View = this.handle_Date_View.bind(this);
    }
    
    // Gets and stores values from state when components in mounted
    // assignments: [...this.state.content.assignments] TEMP REPLACEMENT SO THAT THE ASSIGNENTS OBJECTS ARRAY DOES NOT GET REMOVED
    componentDidMount() {
        this.setState({s_Date: this.props.DATE_STATE.s_Date, e_Date: this.props.DATE_STATE.e_Date, content: {classes: this.props.CLASS_STATE.CLASSES, assignments: [...this.state.content.assignments], todos: this.props.TODO_STATE.TODO_LIST}});
    }

    // ALLOWS FOR COMPONENT'S STATE TO UPDATE ON TEXT INPUT CHANGE
    handle_Modal_Change = (obj, i) => {
        (i === undefined) ? this.setState({obj: {THIS_TODO: null, index: null}}) : this.setState(({obj: {THIS_TODO: obj, index: i}})) // if object is passed, we can set it in state to get data
    }

    handle_Date_View = (type) => {
        this.setState({show_Date: {on: !this.state.show_Date.on, type: type}});
    }

    SENDER = (date) => {
        this.props.SET_START_DATE(date.s_Date);
        this.props.SET_END_DATE(date.e_Date);
        this.setState({s_Date: this.props.DATE_STATE.s_Date, e_Date: this.props.DATE_STATE.e_Date});
    }

    CALC_AND_SEND = (type) => {
        let s_Date = new Date(this.state.s_Date);
        let e_Date = new Date(this.state.e_Date);
        if (type === '>') {
            s_Date = new Date((s_Date).setDate(s_Date.getDate() + 1));
            e_Date = new Date((e_Date).setDate(e_Date.getDate() + 1));
            
        }
        else if (type === '<') {
            s_Date = new Date((s_Date).setDate(s_Date.getDate() - 1));
            e_Date = new Date((e_Date).setDate(e_Date.getDate() - 1));
        }
        s_Date = s_Date.getTime();
        e_Date = e_Date.getTime();
        this.SENDER({s_Date, e_Date})
    }

    render() {
        return (
          <View>
            {/*Displays the month with days*/}
            <DisplayMonth startDate={to_Date(this.state.s_Date)} />
            <View style={styles.dateContainer}>
              <DisplayCalendarDates startDate={to_Date(this.state.s_Date)} />
            </View>
            {this.state.obj.THIS_TODO !== null ? (
              <MODAL_VIEW
                prop={this.state.obj}
                view_ME={this.handle_Modal_Change}
              />
            ) : null}
            <Button
              style={{ fontSize: "20px" }}
              title={"From " + to_Date(this.state.s_Date)}
              onPress={() => this.handle_Date_View("s")}
            />
            <Button
              style={{ fontSize: "20px" }}
              title={"To " + to_Date(this.state.e_Date)}
              onPress={() => this.handle_Date_View("e")}
            />
            {/* Add view by date: Start to Finish and render todo and classes from beginning date to end date */}

            {this.state.show_Date.on === true ? (
              <>
                <Button
                  title={"return"}
                  onPress={() => this.handle_Date_View()}
                />
                <DateTimePicker
                  testID="dateTimePicker"
                  value={
                    this.state.show_Date.type === "s"
                      ? new Date(this.state.s_Date)
                      : new Date(this.state.e_Date)
                  }
                  mode={"date"}
                  display={"spinner"}
                  is24Hour={true}
                  onChange={(e) => {
                    this.state.show_Date.type === "s"
                      ? this.SENDER({
                          s_Date: e.nativeEvent.timestamp,
                          e_Date: this.state.e_Date,
                        })
                      : this.SENDER({
                          s_Date: this.state.s_Date,
                          e_Date: e.nativeEvent.timestamp,
                        });
                  }}
                />
              </>
            ) : (
              <View style={styles.arrowButtonsContainer}>
                <View style={[styles.arrowButtons, {marginRight: 100}]}>
                  <Button title="<" onPress={() => this.CALC_AND_SEND("<")} />
                </View>
                <View style={styles.arrowButtons}>
                  <Button title=">" onPress={() => this.CALC_AND_SEND(">")} />
                </View>
              </View>
            )}
            {/* horizontal line */}
            <View style={{borderBottomColor: "black", borderBottomWidth: 3, marginBottom: 30}}></View>
            
            <PASS_THROUGH
              type="DATE"
              PROP_STATE={{
                TODO: this.state.content.todos,
                CLASS: this.state.content.classes,
                ASSIGNMENTS: this.state.content.assignments,
              }}
              view_ME={this.handle_Modal_Change}
              date={{ e_Date: this.state.e_Date, s_Date: this.state.s_Date }}
            />
          </View>
        );
    }
}

// ALLOWS US TO MAKE TO-DO ARRAY AVAILABLE IN class CALENDAR
const mapStateToProps = (state) => {
    // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
    const { TODO_STATE, CLASS_STATE, DATE_STATE } = state
    return { TODO_STATE, CLASS_STATE, DATE_STATE };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        SET_START_DATE,
        SET_END_DATE
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

const styles = StyleSheet.create({
    dateContainer:{
        width: 350,
        justifyContent: 'space-evenly',
        flexDirection: "row",
        //textAlign: 'center',
        //sbackgroundColor: 'red',
    },
    arrowButtonsContainer:{
        flexDirection: "row",
       // backgroundColor: "red",
        marginStart: 30,
        marginBottom: 10, 
    },
    arrowButtons:{
        width: 100 ,
        backgroundColor: "#8BBEE2",
    },
})