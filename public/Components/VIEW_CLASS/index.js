import React from "react";
import { TouchableHighlight, View, Text } from "react-native";
import { connect } from "react-redux";

class VIEW_CLASS extends React.Component {
    constructor() {
        super();
    }

    render() {
    if (this.props.CLASS_STATE !== undefined && this.props.CLASS_STATE.length > 0) {
        return(
        <View>
            {/* Mapping through classes in user profile already as of 9/17, pulling from array in global state */}
            <Text style={{fontSize: 20}}>You have {this.props.CLASS_STATE.length} classes.</Text>
            {this.props.CLASS_STATE.length > 0 ?
            this.props.CLASS_STATE.map((CLASS, index) => (
                <TouchableHighlight
                    key={index}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => alert(JSON.stringify(CLASS))}
                >
                    <Text
                        key={index}
                    >
                        Title: {CLASS.title}

                        {/* Ideally, when we implement the db, we can pull the professor's info for class based on foreign key */}
                    </Text>
                </TouchableHighlight>
            )) : <Text style={{fontSize: 20}}>Look's like you have no classes!</Text>}
        </View>
        );
        } return <Text style={{fontSize: 20}}>Look's like you have no classes!</Text> 
    }
}

// ALLOWS US TO MAKE CLASS ARRAY AVAILABLE IN class CLASS
const mapStateToProps = (state) => {
    // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
    const { CLASS_STATE } = state
    return { CLASS_STATE };
};

export default connect(mapStateToProps)(VIEW_CLASS);