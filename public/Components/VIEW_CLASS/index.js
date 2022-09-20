import React from "react";
import { TouchableHighlight, View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from '@reduxjs/toolkit';
import { ADD_CLASS_ACTION } from "../../Actions/List_Action";
import { CLASS_OBJECT_CREATION } from "../../Util/Object_Creation";


// CLASS_OBJECT_CREATION(class_ID, name, desc, professor_ID)

class VIEW_CLASS extends React.Component {
    constructor() {
        super();
    }
    
    // This component should not load ALL CRNS/Possible classes
    // Should have child class which when activated, loads the bunch
    // Else, this view is just for the user's ALREADY ADDED classes!

    render() {
        return(
          <View>
            {/* Mapping through classes in user profile already as of 9/17, pulling from array in global state */}
            <Text style={{fontSize: '20px'}}>You have {this.props.CLASS_STATE.CLASSES.length} classes.</Text>
            {this.props.CLASS_STATE.CLASSES.length > 0 ?
            this.props.CLASS_STATE.CLASSES.map((CLASS, index) => (
                <TouchableHighlight
                    key={index}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => alert(CLASS.class_ID)}
                >
                    <Text
                        key={index}
                    >
                        Class: {CLASS.name}
                        Description: {CLASS.desc}
                        {/* Ideally, when we implement the db, we can pull the professor's info for class based on foreign key */}
                        Professor: Dr. Becnel
                    </Text>
                </TouchableHighlight>
            )) : <Text style={{fontSize: '20px'}}>Look's like you have no classes!</Text>}

            {/* ADJUST BUTTON ONCLICK TO BRING LIST OF CLASSES BY PROFESSOR_ID -- USER SHOULD ONLY BE ABLE TO ADD CLASSES BASED ON WHAT PROFESSOR THEY BELONG TO */}
            <Button
                title='Add Class'
                onPress={() =>
                    {this.props.ADD_CLASS_ACTION(CLASS_OBJECT_CREATION('123', 'DBMS', 'DATABASE', '445'))}
                }
            />
          </View>
        );
    }
}

// ALLOWS US TO MAKE CLASS ARRAY AVAILABLE IN class CLASS
const mapStateToProps = (state) => {
    // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
    const { CLASS_STATE } = state
    return { CLASS_STATE };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        ADD_CLASS_ACTION
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(VIEW_CLASS);