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
import { to_Date, to_Day, to_Time, to_Zero } from "../../Util/TO_DATE";
import Icon from "@expo/vector-icons/Ionicons";
import { toWeekDay } from "../../Components/VIEW_CALENDAR/displayCalendarDays";
import { OID_toString } from "../TO_OBJECTID";

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
    
    if (type === "TODO" && obj.length > 0) {
      return obj.map((ITEM, index) => (
        <TouchableHighlight
          key={index}
          activeOpacity={0.5}
          underlayColor="white"
          onPress={() => this.props.view_ME(ITEM, index)}
        >
         
            <View style={styles.container}>
              <Text key={ITEM._partition} style={styles.titleToDo}>
                {ITEM.title} {"\n"}
                <Text style={styles.descriptionToDo}>{ITEM.desc}</Text>
                {/* Flagged: {ITEM.urgent ? "YES" : "NOPE"}
            Date: {to_Date(ITEM.date)}
            Time: {to_Time(ITEM.time)} */}
              </Text>
            </View>
           
         
        </TouchableHighlight>
      ));
    } else if (type === "URGENT") {
      return obj.map((ITEM, index) => (
        <>
        <TouchableHighlight
          key={index}
          activeOpacity={0.6}
          underlayColor="white"
          onPress={() => this.props.view_ME(ITEM, index)}
        >
          <View style={[styles.container, styles.urgentContainer,{backgroundColor: "#C3BADD"}]}>
            <View style={[styles.sideBox, {backgroundColor: "#81FFA4",}]}>
              <Icon
                name="md-flag-sharp"
                size={24}
                color="black"
                style={{ paddingTop: 5, paddingLeft: 2 }}
              />
            </View>
            <View style={styles.urgentContent}>
              <Text key={ITEM._partition} style={[styles.titleToDo, styles.whiteTitle]}>
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
          </TouchableHighlight>
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
                    style={({pressed}) =>[
                      {
                        opacity: pressed 
                        ? 0.5
                        : 1,
                      },
                      styles.editHeaderBtn,
                      { backgroundColor: "#40E8FF" },
                    ]
                    }
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
                      {this.state.edit_ME ? null : "EDIT"}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={
                      ({pressed}) =>[
                        {
                          opacity: pressed 
                          ? 0.5
                          : 1,
                        },
                      styles.editHeaderBtn, { backgroundColor: "red" }]}
                      onPress={() => {
                        const id = obj._id;
                        try {
                            this.props.DELETE_ME(id);
                            this.props.RLM_DELETE(id);
                        } catch (e) {
                            console.error(e)
                        }
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
                      DELETE
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
                      <Text style={[styles.editContentText,{fontWeight: "bold"}]}>{obj.title}</Text>
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
                in_Edit={this.state.edit_ME} RLM_EDIT={this.props.RLM_EDIT} in_Edit_obj={obj} view_Task={this.handle_Edit_Mode}
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
      const assignments = obj.ASSIGNMENTS;
      return (
        <>
        {/*console.log(classes)*/}
          {/*<Text>Todos or Assignments</Text>*/}
          
          <View>
            
          {assignments.map((ITEM, index) => {
            // Checks if date of item is between (inclusive) dates set by user or app
            console.log("Case View Calender 1: Triggers------------");
            
            let tempDate = new Date(ITEM.date).toDateString();;
            let startDate = new Date(this.props.date.s_Date).toDateString();
            console.log("tempDAte: " +tempDate)
            console.log("startDate: " + startDate)
            console.log(tempDate === startDate);
            console.log(this.props.date.s_Date)
            console.log("\n")
            
            if (
              tempDate === startDate /*&&
              to_Zero(tempDate) <= this.props.date.e_Date*/
            ) {
              // to_Zero because an items date may be ahead of the set
              return (
                <>
                <TouchableHighlight
                  key={index}
                  // activeOpacity={0.1}
                  underlayColor="white"
                  onPress={() => this.props.view_ME(ITEM, index)}
                >
                  <View
                    style={[
                      styles.container,
                      styles.urgentContainer,
                      { backgroundColor: "#FB7070" },
                    ]}
                  >
                    <View
                      style={[styles.sideBox, { backgroundColor: "#860000" }]}
                    ></View>
                    <View style={styles.urgentContent}>
                      <Text
                        key={ITEM._partition}
                        style={[styles.titleToDo, styles.whiteTitle]}
                      >
                        {ITEM.class} {"\n"}
                        <Text
                          style={[styles.descriptionToDo, styles.colorContent]}
                        >
                          {ITEM.title}
                        </Text>
                      </Text>
                    </View>
                      <Text style={{paddingRight: 10}}>{ITEM.time}</Text>
                  </View>
                </TouchableHighlight>
                </>
              );
            } //else return <Text key={0}>Nothing To Display :L</Text>;
          })}
          <Text>Classes:</Text>
          
          {classes.length > 0 ? classes.map((ITEM, index) => {
            if (
              to_Day(ITEM.startTime) >= to_Day(this.props.date.s_Date) &&
              to_Day(to_Zero(ITEM.endTime)) <= to_Day(this.props.date.e_Date)
            ) { 
               return (
                <TouchableHighlight
                  key={index}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() =>
                    alert(
                      "Title: " + ITEM.subject +
                      "Time: " + to_Time(ITEM.startTime)
                    )
                  }
                >
                  <View>
                    <Text key={ITEM._partition}>
                      Title: {ITEM.subject}
                      Time: {to_Time(ITEM.startTime)}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            }
          }) : <Text key={new Date().getTime()}>No Classes!</Text>}
          </View>
        </>
      );
    }
    
    {/*Only for class view modal */}
    if (type === "CLASSES") {
      const classes = obj;
      return (
        <>

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
              <Text style={{padding:10}}>Title: {classes[this.props.index].subject}</Text>
              <Text style={{padding:10}}>Date: {to_Date(classes[this.props.index].startTime)}</Text>
              <Text style={{padding:10}}>Meets on: {toWeekDay(to_Day(classes[this.props.index].startTime))}</Text>
              <Text style={{padding:10}}>Description: {classes[this.props.index].desc}</Text>
              {(classes[this.props.index].professor).map((el) => {
                  console.log(el)
                  return <Text style={{padding:10}}>{OID_toString(el)}</Text>
                })}
                <Text>Total Class Size: {(classes[this.props.index].participating).length}</Text>
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
    margin: 0,
    //borderWidth: 5,
  },
  urgentContainer: {
    //backgroundColor: "#C3BADD",
    flexDirection: "row",
  },
  whiteTitle: {
    color: "white",
  },
  colorContent: {
    color: "black",
  },
  sideBox: {
    width: 26,
    height: 100,
  },
  urgentContent: {
    flex: 1,
    //backgroundColor: "blue",
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
    //backgroundColor: "#FFD8D8",
    height: "100%",
    padding: 10,
    marginLeft: 80,
    width: 170,
    borderRadius: 10,
  },
  headerBtnContainer: {
    marginTop: -80,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    
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
    //backgroundColor: "red",
  },
 
  //Dates
  
});
