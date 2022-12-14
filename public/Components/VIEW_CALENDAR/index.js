import React from "react";
import { connect } from "react-redux";
import { View, Button } from "react-native";
import PASS_THROUGH from "../../Util/Object _Pass";
import MODAL_VIEW from "../../Util/Modal";
import { bindActionCreators } from '@reduxjs/toolkit';
import { SET_START_DATE, SET_END_DATE } from "../../Actions/List_Action";
import {to_Date} from "../../Util/TO_DATE";
import DateTimePicker from '@react-native-community/datetimepicker';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {THIS_TODO: null, index: null},
            s_Date: 0,
            e_Date: 0,
            content: {classes: [], assignments: [], todos: []},
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
        this.setState({s_Date: this.props.DATE_STATE.s_Date, e_Date: this.props.DATE_STATE.e_Date, content: {classes: this.props.CLASS_STATE, assignments: [...this.state.content.assignments], todos: this.props.TODO_STATE.TODO_LIST}});
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
                {(this.state.obj.THIS_TODO !== null) ? <MODAL_VIEW prop={this.state.obj} RLM_DELETE={this.props.delete_TODO} RLM_EDIT={this.props.edit_TODO} view_ME={this.handle_Modal_Change} /> : null}
                <Button
                    style={{fontSize: 20}} 
                    title={"From " + to_Date(this.state.s_Date)}
                    onPress={() => this.handle_Date_View('s')}
                />
                <Button 
                    style={{fontSize: 20}} 
                    title={"To " + to_Date(this.state.e_Date)}
                    onPress={() => this.handle_Date_View('e')}
                />
                {/* Add view by date: Start to Finish and render todo and classes from beginning date to end date */}
                <PASS_THROUGH type='DATE' PROP_STATE={{TODO: this.state.content.todos, CLASS: this.state.content.classes}} view_ME={this.handle_Modal_Change} date={{e_Date: this.state.e_Date, s_Date: this.state.s_Date}} />
                
                {this.state.show_Date.on === true ?
                <>
                <Button 
                    title={"return"}
                    onPress={() => this.handle_Date_View()}
                />
                <DateTimePicker
                testID="dateTimePicker"
                value={this.state.show_Date.type === 's' ? new Date(this.state.s_Date) : new Date(this.state.e_Date)}
                mode={'date'}
                display={'default'} // Can be adjusted to observer device is ios or android
                is24Hour={true}
                onChange={(e) => {this.state.show_Date.type === 's' ? this.SENDER({s_Date: e.nativeEvent.timestamp, e_Date: this.state.e_Date}) : this.SENDER({s_Date: this.state.s_Date, e_Date: e.nativeEvent.timestamp})}} 
                />
                </>
                : 
                <>
                    <Button
                    title="<"
                    onPress={() => this.CALC_AND_SEND('<')} 
                    />
                    <Button
                    title=">"
                    onPress={() => this.CALC_AND_SEND('>')} 
                    />
                </>
                }
            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)