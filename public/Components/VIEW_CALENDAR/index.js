import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import PASS_THROUGH from "../../Util/Object _Pass";
import MODAL_VIEW from "../../Util/Modal";

const INIT_STATE = {
    obj: {THIS_TODO: null, index: null},
}

class Calendar extends React.Component {
    constructor() {
        super();
        this.state = INIT_STATE;
        this.handle_Modal_Change = this.handle_Modal_Change.bind(this);
    }

    // ALLOWS FOR COMPONENT'S STATE TO UPDATE ON TEXT INPUT CHANGE
    handle_Modal_Change = (obj, i) => {
        (i === undefined) ? this.setState(INIT_STATE) : this.setState(({obj: {THIS_TODO: obj, index: i}})) // if object is passed, we can set it in state to get data
    }

    render() {
        return (
            <View>
                {(this.state.obj.THIS_TODO !== null) ? <MODAL_VIEW prop={this.state.obj.THIS_TODO} view_ME={this.handle_Modal_Change} /> : null}
                <Text>Today is {(new Date).toLocaleDateString()}</Text>
                <PASS_THROUGH type='TODO' PROP_STATE={this.props.TODO_STATE.TODO_LIST} view_ME={this.handle_Modal_Change} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      margin: 'auto',
      flex: 1,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.9,
      width: '50%',
    },
});

// ALLOWS US TO MAKE TO-DO ARRAY AVAILABLE IN class CALENDAR
const mapStateToProps = (state) => {
    // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
    const { TODO_STATE } = state
    return { TODO_STATE };
};

export default connect(mapStateToProps)(Calendar)