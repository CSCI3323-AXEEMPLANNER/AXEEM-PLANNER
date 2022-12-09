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
import { Class_Style, randomColor } from "../../Util/style";
import Modal from "../../Util/Modal";
import { to_Day } from "../../Util/TO_DATE";
import { toWeekDay } from "../VIEW_CALENDAR/displayCalendarDays";

// CLASS_OBJECT_CREATION(class_ID, name, desc, professor_ID)

class VIEW_CLASS extends React.Component {
  constructor() {
    super();
      this.state = {
        colors: ["#CDF5D8","#FFE18A", "#C1FF8A", "#FFB7A0", "#8AD8FF", "#F2B3F9","#8AFFE6"],
        viewClass: false,
        indexLoc: 0,
      }
      this.changeView = this.changeView.bind(this);
    }
  
  //---------changeView-----------
  /*Changes the view to get out of modal
    pre: bool
    Post: none, view is changed
  */
  changeView = () =>{
    this.setState({viewClass: false});
  };

  // This component should not load ALL CRNS/Possible classes
  // Should have child class which when activated, loads the bunch
  // Else, this view is just for the user's ALREADY ADDED classes!

  render() {
    if(this.state.viewClass){
        return(
        <View>
          <Modal type="CLASSES" info={this.props.CLASS_STATE} index={this.state.indexLoc} view_Me={this.changeView}/>
        </View>
        );
    }
    if (this.props.CLASS_STATE !== undefined && this.props.CLASS_STATE.length > 0) {
      return (
      <View style={Class_Style.container}>
          <ScrollView>
            {this.props.CLASS_STATE.length > 0 ? (
              this.props.CLASS_STATE.map((CLASS, index) => (
                <TouchableHighlight
                  key={index}
                  activeOpacity={0.6}
                  underlayColor="#white"
                  onPress={() => this.setState({
                    viewClass: true,
                    indexLoc: index
                  })}
                >  
                      <View>
                        <View style={[Class_Style.classContainer, {backgroundColor: this.state.colors[index]}, Class_Style.shawdowProp]}>
                          <Text style={Class_Style.classTitleTx} key={CLASS._partition}>
                            {CLASS.subject}:{"\n"}
                          </Text>
                          <Text style={Class_Style.classMainTxt}>
                            {CLASS.desc}
                            {/* Ideally, when we implement the db, we can pull the professor's info for class based on foreign key */}
                            
                          </Text>
                          <Text style={Class_Style.dateTxt}>
                            {toWeekDay(to_Day(CLASS.startTime))}
                          </Text>
                        </View>
                      </View>
                      
                </TouchableHighlight>
              ))
            ) : (
              <Text style={{ fontSize: 20 }}>
                Look's like you have no classes!
              </Text>
            )}
            <View style={{height: 80}}></View>
          </ScrollView>
      </View>
    );
   }
  }
}

// ALLOWS US TO MAKE CLASS ARRAY AVAILABLE IN class CLASS
const mapStateToProps = (state) => {
  // GETTING STATE VALUES FROM RETURN DEFAULT CASE IN REDUCERS/INDEX.JS
  const { CLASS_STATE } = state
  return { CLASS_STATE };
};

export default connect(mapStateToProps)(VIEW_CLASS);