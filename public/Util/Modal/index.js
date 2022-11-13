import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from '@reduxjs/toolkit';
import { REMOVE_TODO_ACTION } from "../../Actions/List_Action";
import PASS_THROUGH from "../Object _Pass";
import {Modal_Style} from "../style.js"

class MODAL_VIEW extends React.Component {
    render() {
        return (
            <Modal
            animationType="slide"
            transparent={false} // false to help read current todo on screen
            visible={true}
            >
                <View
                style={Modal_Style.container}
                >
                    <PASS_THROUGH type='EDIT' DELETE_ME={this.props.REMOVE_TODO_ACTION} PROP_STATE={this.props.prop} view_ME={this.props.view_ME} />
                </View>
            </Modal>
        )
    }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        REMOVE_TODO_ACTION
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(MODAL_VIEW);

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