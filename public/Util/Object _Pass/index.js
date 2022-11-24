import React from "react";
import {
  TouchableHighlight,
  Text,
  Button,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import ADD_TASK from "../ADD_TASK";
import { to_Date, to_Time, to_Zero } from "../../Util/TO_DATE";
import Icon from "@expo/vector-icons/Ionicons";


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
              <Icon
                name="md-flag-sharp"
                size={24}
                color="black"
                style={{ paddingTop: 5, paddingLeft: 2 }}
              />
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

    if (type === "EDIT") {
      const obj = this.props.PROP_STATE.THIS_TODO;
      return (
        <>
          {/* While edit in modal is no clicked, we will view only the item */}
          {
            this.state.edit_ME === false ? (
              <>
                {/* Header buttons displays are located here*/}
                <View style={styles.headerBtnContainer}>
                  <Pressable
                    style={[
                      styles.editHeaderBtn,
                      { backgroundColor: "#40E8FF" },
                    ]}
                    onPress={() => {
                      this.handle_Edit_Mode();
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        marginTop: 5,
                      }}
                    >
                      {this.state.edit_ME ? null : "Edit TODO"}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.editHeaderBtn, { backgroundColor: "red" }]}
                    onPress={() => {
                      this.props.DELETE_ME(obj.id);
                      this.props.view_ME();
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        marginTop: 5,
                      }}
                    >
                      Delete
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={
                    {
                      /*backgroundColor:"red",*/
                    }
                  }
                >
                  {/* TodoList content display is located here */}
                  <View style={styles.editContent}>
                    {/* Date: {to_Date(obj.date) + "\n"}
                  Time: {to_Time(obj.time) + "\n"}*/}
                    <View style={styles.editTitleContainer}>
                      <Text style={styles.editTitleContent}>Title: </Text>
                    </View>
                    <View style={styles.editTextContainer}>
                      <Text style={styles.editContentText}>{obj.title}</Text>
                    </View>
                  </View>
                  <View style={styles.editContent}>
                    <View style={styles.editTitleContainer}>
                      <Text style={styles.editTitleContent}>Description: </Text>
                    </View>
                    <View style={styles.editTextContainer}>
                      <Text style={styles.editContentText}>{obj.desc}</Text>
                    </View>
                  </View>
                  <View style={styles.editContent}>
                    <View style={styles.editTitleContainer}>
                      <Text style={styles.editTitleContent}>Urgent: </Text>
                    </View>
                    <View style={styles.editTextContainer}>
                      <Text style={styles.editContentText}>
                        {obj.urgent ? "Yes" : "Nope"}
                      </Text>
                    </View>
                  </View>
                </View>
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
          {/* Might undo this in case of editing allowed in calander */}
          {/*<Button
            title="Delete"
            activeOpacity={0.6}
            underlayColor="#FFFFFF"
            onPress={() => {
              this.props.DELETE_ME(obj.id);
              this.props.view_ME();
            }}
          />*/}
          
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
        {console.log(classes)}
          {/*<Text>Todos or Assignments</Text>*/}
          
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
    
    {/*Only for class view modal */}
    if (type === "CLASSES") {
      
      const classes = obj;
      return (
        <>
          {/*if (
              ITEM.date >= this.props.date.s_Date &&
              to_Zero(ITEM.date) <= this.props.date.e_Date
            )*/}

          {/*console.log(this.props.index)*/}
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() =>
              alert(
                "this is have modal view as well, but should only allow view"
              )
            }
          >
            <View style={styles.classContainer}>
              <Text>Title: {classes[this.props.index].name}</Text>
              <Text>Time: {classes[this.props.index].date}</Text>
              <Text>Description: {classes[this.props.index].desc}</Text>
            </View>
          </TouchableHighlight>

          <Button
            title="Exit"
            activeOpacity={0.6}
            underlayColor="#FFFFFF"
            onPress={() => {
              this.props.view_Me();
            }}
          />
          {/*else return <Text key={0}>Nothing To Display :L</Text>;*/}
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
    flexDirection: "row",
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
  urgentContent: {
    flex: 1,
    //SbackgroundColor: "blue",
  },
  someBackColor: {
    backgroundColor: "red",
  },
  iconFormat: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  editContent: {
    // backgroundColor: 'blue',
    marginVertical: 10,
    //alignItems:'center',
    //alignItems:'flex-start',
    marginHorizontal: 50,
    flexDirection: "row",
    textAlignVertical: "center",
  },

  editTitleContainer: {
    width: 130,
    //backgroundColor: 'red',
    marginLeft: -30,
    //lineHeight: 30,
  },
  editButton: {
    height: 34,
  },
  editTitleContent: {
    fontSize: 24,
    //backgroundColor: 'red'
  },
  editContentText: {
    fontSize: 16,
    textAlignVertical: "center",
  },
  backColorBlue: {
    backgroundColor: "#40E8FF",
  },
  editTextContainer: {
    backgroundColor: "#FFD8D8",
    height: "100%",
    padding: 10,
    marginLeft: 20,
    width: 170,
    borderRadius: 10,
  },
  headerBtnContainer: {
    marginTop: -80,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    //justifyContent: "center",
  },
  editHeaderBtn: {
    width: 154,
    height: 34,
    color: "white",
    borderRadius: 30,
    textAlign: "center",
  },
  classContainer:{
    alignItems:'center',
   // backgroundColor:'blue',
  },
});
