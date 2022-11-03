import React from "react";
import {
  TouchableHighlight,
  Text,
  Button,
  StyleSheet,
  View,
} from "react-native";
import ADD_TASK from "../ADD_TASK";
import { to_Date, to_Time, to_Zero } from "../../Util/TO_DATE";
import Icon from '@expo/vector-icons/Ionicons'

// type SHOULD BE STRING OF WHAT THE STATE ARRAY IS > 'TODO' 'URGENT'
export default class PASS_THROUGH extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_ME: false,
    };
    this.handle_Edit_Mode = this.handle_Edit_Mode.bind(this);
  }

  handle_Edit_Mode = () => {
    this.setState((prevState) => ({ edit_ME: !prevState.edit_ME }));
  };

  render() {
    const type = this.props.type;
    const obj = this.props.PROP_STATE;

    if (type === "TODO") {
      return obj.map((ITEM, index) => (
        <TouchableHighlight
          key={index}
          activeOpacity={0.6}
         // underlayColor="blue"
          onPress={() => this.props.view_ME(ITEM, index)}
          /*onPress={() => this.props.view_ME(ITEM, index)}*/
          /*this.props.view_ME() Is NOT WORKING*/
        >
          <>
            <View style={styles.container}>
              <Text key={index} style={styles.titleToDo}>
                {ITEM.title} {"\n"}
                <Text style={styles.descriptionToDo}>{ITEM.desc}</Text>
                {/* Flagged: {ITEM.urgent ? "YES" : "NOPE"}
            Date: {to_Date(ITEM.date)}
            Time: {to_Time(ITEM.time)} */}
              </Text>
            </View>
            {/*<Text>{"\n"}</Text>*/}
          </>
        </TouchableHighlight>
      ));
    } else if (type === "URGENT") {
      return obj.map((ITEM, index) => (
        <>
        <View style={[styles.container, styles.urgentContainer]}>
          <View style={styles.greenBox}>
           

            <Icon name="md-flag-sharp" size={24} color="black" style={{paddingTop: 5, paddingLeft: 2}}/>
          
            </View>
          <View style={styles.urgentContent}>
            <Text key={index} style={[styles.titleToDo, styles.whiteTitle]}>
              {ITEM.title} {"\n"}
              <Text style={[styles.descriptionToDo, styles.colorContent]}>
                {ITEM.desc}
              </Text>
              {/* Flagged: {ITEM.urgent ? "YES" : "NOPE"}
            Date: {to_Date(ITEM.date)}
            Time: {to_Time(ITEM.time)} */}
            </Text>
          </View>
        </View>
        </>
      ));
    }
    /* Fix this unreachable code for calendar to work */
    if (type === "EDIT") {
      const obj = this.props.PROP_STATE.THIS_TODO;
      return (
        <>
          {/* While edit in modal is no clicked, we will view only the item */}
          {
            this.state.edit_ME === false ? (
              <>
                <Text>
                  Date: {to_Date(obj.date) + "\n"}
                  Time: {to_Time(obj.time) + "\n"}
                  Title: {obj.title + "\n"}
                  Description: {obj.desc + "\n"}
                  Urgent: {obj.urgent ? "YES" : "NOPE"}
                </Text>
                <Button
                  title={this.state.edit_ME ? null : "Edit TODO"}
                  activeOpacity={0.6}
                  underlayColor="#FFFFFF"
                  onPress={() => {
                    this.handle_Edit_Mode();
                  }}
                />
              </>
            ) : (
              // when edit button is clicked, add_task is returned to update the item at id!
              <ADD_TASK
                in_Edit={this.state.edit_ME}
                in_Edit_obj={obj}
                view_Task={this.handle_Edit_Mode}
              />
            ) // view_Task here is adjusting the state value in this instance view_ME func.
          }
          <Button
            title="Delete"
            activeOpacity={0.6}
            underlayColor="#FFFFFF"
            onPress={() => {
              this.props.DELETE_ME(obj.id);
              this.props.view_ME();
            }}
          />
          <Button
            title="Exit"
            activeOpacity={0.6}
            underlayColor="#FFFFFF"
            onPress={() => {
              this.props.view_ME();
            }}
          />
        </>
      );
    }
    if (type === "DATE") {
      const todos = obj.TODO;
      const classes = obj.CLASS;
      return (
        <>
          <Text>Todos or Assignments</Text>
          {todos.map((ITEM, index) => {
            // Checks if date of item is between (inclusive) dates set by user or app
            if (
              ITEM.date >= this.props.date.s_Date &&
              to_Zero(ITEM.date) <= this.props.date.e_Date
            ) {
              // to_Zero because an items date may be ahead of the set
              return (
                <TouchableHighlight
                  key={index}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => this.props.view_ME(ITEM, index)}
                >
                  <Text key={index}>
                    Title: {ITEM.title}
                    Flagged: {ITEM.urgent ? "YES" : "NOPE"}
                  </Text>
                </TouchableHighlight>
              );
            } else return <Text key={0}>Nothing To Display :L</Text>;
          })}
          <Text>Classes:</Text>
          {classes.map((ITEM, index) => {
            if (
              ITEM.date >= this.props.date.s_Date &&
              to_Zero(ITEM.date) <= this.props.date.e_Date
            ) {
              return (
                <TouchableHighlight
                  key={index}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() =>
                    alert(
                      "this is have modal view as well, but should only allow view"
                    )
                  }
                >
                  <Text key={index}>
                    Title: {ITEM.name}
                    Time: {ITEM.time}
                  </Text>
                </TouchableHighlight>
              );
            } else return <Text key={0}>Nothing To Display :L</Text>;
          })}
        </>
      );
    }
  }
}
const styles = StyleSheet.create({
  someBox: {
    color: "blue",
    backgroundColor: "red",
    width: 300,
    height: 400,
  },
  titleToDo: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 20,
  },
  descriptionToDo: {
    color: "#895454",
    fontSize: 14,
    //paddingRight: 100,
  },
  container: {
    width: 308,
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    margin: 10,
    //borderWidth: 5,
  },
  urgentContainer: {
    backgroundColor: "#C3BADD",
    flexDirection:"row",
  },
  whiteTitle: {
    color: "white",
  },
  colorContent: {
    color: "black",
  },
  greenBox: {
    width: 26,
    height: 100,
    backgroundColor: "#81FFA4",
   
  },
  urgentContent:{
    flex: 1,
    //SbackgroundColor: "blue",
    
  },
  someBackColor:{
    backgroundColor: "red",
  },
  iconFormat:{
    paddingTop: 10,
    paddingLeft:10,
  },
});
