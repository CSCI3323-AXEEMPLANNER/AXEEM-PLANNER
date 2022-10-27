import React from "react";
import {
  TouchableHighlight,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { ADD_CLASS_ACTION } from "../../Actions/List_Action";
import { CLASS_OBJECT_CREATION } from "../../Util/Object_Creation";
import reactDom, { render } from "react-dom";
import { TouchableWithoutFeedback } from "react-native-web";

// CLASS_OBJECT_CREATION(class_ID, name, desc, professor_ID)

class VIEW_CLASS extends React.Component {
  constructor() {
    super();
  }

  // This component should not load ALL CRNS/Possible classes
  // Should have child class which when activated, loads the bunch
  // Else, this view is just for the user's ALREADY ADDED classes!

  render() {
    return (
      <View style={styles.container}>
        {/* Mapping through classes in user profile already as of 9/17, pulling from array in global state */}
        {/*<Text style={{ fontSize: 20 }}>
          You have {this.props.CLASS_STATE.CLASSES.length} classes.
    </Text>*/}
        <ScrollView>
          {this.props.CLASS_STATE.CLASSES.length > 0 ? (
            this.props.CLASS_STATE.CLASSES.map((CLASS, index) => (
              <TouchableHighlight
                key={index}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => alert(CLASS.class_ID)}
              >
                <>
                  {index == 0 ? (
                    <>
                      <View style={styles.classContainerFirst}>
                        <Text style={styles.classTitleTx} key={index}>
                          {CLASS.name} -{"\n"}
                        </Text>
                        <Text style={styles.classMainTxt}>
                          {CLASS.desc}
                          {"\n"}
                          {/* Ideally, when we implement the db, we can pull the professor's info for class based on foreign key */}
                          {CLASS.date}
                        </Text>
                      </View>
                      <Text> {"\n"}</Text>
                    </>
                  ) : (
                    <>
                      <View style={styles.classContainerSecond}>
                        <Text style={styles.classTitleTx2} key={index}>
                          {CLASS.name} -{"\n"}
                        </Text>
                        <Text style={styles.classMainTxt2}>
                          {CLASS.desc}
                          {"\n"}
                          {/* Ideally, when we implement the db, we can pull the professor's info for class based on foreign key */}
                          {CLASS.date}
                        </Text>
                      </View>
                      <Text> {"\n"}</Text>
                    </>
                  )}
                </>
              </TouchableHighlight>
            ))
          ) : (
            <Text style={{ fontSize: 20 }}>
              Look's like you have no classes!
            </Text>
          )}
        </ScrollView>
        {/* ADJUST BUTTON ONCLICK TO BRING LIST OF CLASSES BY PROFESSOR_ID -- USER SHOULD ONLY BE ABLE TO ADD CLASSES BASED ON WHAT PROFESSOR THEY BELONG TO */}
        {/*<Button
          title="Add Class"
          onPress={() => {

            {
              this.props.ADD_CLASS_ACTION(
                CLASS_OBJECT_CREATION("113", "CSCI 4341", "Computer", "232")
              );
            }
          }
        />*/}
      </View>
    );
  }
}

// ALLOWS US TO MAKE CLASS ARRAY AVAILABLE IN class CLASS
const mapStateToProps = (state) => {
  // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
  const { CLASS_STATE } = state;
  return { CLASS_STATE };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ADD_CLASS_ACTION,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(VIEW_CLASS);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },
  classContainerFirst: {
    height: 139,
    width: 360,
    backgroundColor: "#FFA386",
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: 1,
  },
  classContainerSecond: {
      height: 133,
      width: 259,
      backgroundColor: "#CDF5D8",
      borderRadius: 30,
      overflow: "hidden",
      justifyContent: "center",
      borderWidth: 1,
      marginLeft: 100,
  },
  classTitleTx: {
    textAlign: "left",
    textAlignVertical: "top",
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    marginVertical: -30,
    //flexGrow: 1,
  },
  classTitleTx2: {
    textAlign: "left",
    textAlignVertical: "top",
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
    marginVertical: -30,
    //flexGrow: 1,
  },
  classMainTxt: {
    height: 51,
    width: "100%",
    // backgroundColor:"blue",
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  classMainTxt2: {
    height: 51,
    width: "100%",
    // backgroundColor:"blue",
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  classTxt: {
    textAlign: "center",
  },
});
