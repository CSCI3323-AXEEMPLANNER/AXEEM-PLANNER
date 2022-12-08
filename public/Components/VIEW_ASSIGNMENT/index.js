import React from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import PASS_THROUGH from "../../Util/Object _Pass";
import MODAL_VIEW from "../../Util/Modal";
import ADD_TASK from "../../Util/ADD_TASK";

// INITIAL STATE SETUP FOR LOCAL STATE ON SUBMIT
const INIT_STATE = {
  obj: { THIS_TODO: null, index: null },
  add_Task: false,
};
class VIEW_ASSIGNMENT extends React.Component {
    constructor(props) {
        super(props);
        // STATE CREATED IN CANVAS LOCALLY TO MAINTAIN INPUTS READY FOR PUSH
        this.state = INIT_STATE;
        this.handle_Modal_Change = this.handle_Modal_Change.bind(this);
        this.handle_Task_Change = this.handle_Task_Change.bind(this);
    }

  // ALLOWS FOR COMPONENT'S STATE TO UPDATE ON TEXT INPUT CHANGE
  handle_Modal_Change = (obj, i) => {
    this.state.add_Task
      ? this.setState((prevState) => ({ add_Task: !prevState.add_Task }))
      : null,
      i === undefined
        ? this.setState(INIT_STATE)
        : this.setState({ obj: { THIS_TODO: obj, index: i } }); // if object is passed, we can set it in state to get data
  };

    handle_Task_Change = () => { // ...prevState to preserve other state values
        this.setState(prevState => ({...prevState, add_Task: !prevState.add_Task}));
    }
    
    render() {
        if (this.state.add_Task === true) {
            return <ADD_TASK {...this.props} view_Task={this.handle_Task_Change}/>
        } else {
            return (
                <View>

                    {(this.state.obj.THIS_TODO !== null) ? <MODAL_VIEW prop={this.state.obj} RLM_DELETE={this.props.delete_TODO} RLM_EDIT={this.props.edit_TODO} view_ME={this.handle_Modal_Change} /> : null}
                    <Text>You have { this.props.TODO_STATE.TODO_LIST.length } To-Do.</Text>
                    
                    {/* PASS_THROUGH FUNCTION REDUCES REDUNDANT MAPPING OF LISTS */}
                    <PASS_THROUGH type='TODO' PROP_STATE={this.props.TODO_STATE.TODO_LIST} view_ME={this.handle_Modal_Change} />
                    
                    <Text>You have { this.props.TODO_STATE.URGENT.length } Urgent To-Do.</Text>
                    
                    <PASS_THROUGH type='URGENT' PROP_STATE={this.props.TODO_STATE.URGENT} view_ME={this.handle_Modal_Change} />
                    
                    <Button
                        title='Create Task!'
                        onPress={() =>
                            {this.handle_Task_Change()} // Going to show add todo view
                        }
                    />
                </View>
                );
            }
        }
    }

// ALLOWS US TO MAKE TODOs AVAILABLE IN ASSIGNMENT CLASS
const mapStateToProps = (state) => {
  // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
  const { TODO_STATE } = state;
  return { TODO_STATE };
};

export default connect(mapStateToProps)(VIEW_ASSIGNMENT);

const ToDoStyles = StyleSheet.create({});
