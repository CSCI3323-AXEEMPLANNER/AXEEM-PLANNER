import React from "react";
import { View, StyleSheet, Modal, TouchableHighlight } from "react-native";
import PASS_THROUGH from "../Object _Pass";

export default class MODAL_VIEW extends React.Component{
    render() {
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            >
                <View
                style={styles.container}
                >
                    <PASS_THROUGH type='EDIT' PROP_STATE={this.props.prop} view_ME={this.props.view_ME}/>
                </View>
            </Modal>
        )
    }
};

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