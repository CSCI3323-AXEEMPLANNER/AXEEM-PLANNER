import React from "react";
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
  } from "react-native";
  
const a = 'class';
const b = require('./Images/bell.png')
const c = require('./Images/clipboard-list.png')
const d = require('./Images/comment.png')
const e = require('./Images/calendar-lines.png')
const f = require('./Images/menu-dots.png')

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //VIEW_NAMES: ['CLASS', 'ASSIGNMENT', 'NOTIFICATIONS', 'CALENDAR', 'SETTING']
            VIEW_NAMES: [['CLASS', a],['NOTIFICATIONS', b],['ASSIGNMENT', c],
             ['CHAT', d],['CALENDAR', e],['SETTING', f]]
        }
    }
    
    render() {
        return (
          <>
            {/* <View style={styles.buttonRowStyle}> */}
                {this.state.VIEW_NAMES.map(([NAME, IMG], index) => (
                    <TouchableOpacity
                    style={styles.buttonRowStyle}
                    activeOpacity={0.5}
                    onPress={() => {this.props.UPDATE_VIEW('VIEW_' + NAME)}}
                    key={index}>
                    <Image
                      source={IMG}
                      style={styles.buttonImageIconStyle}                  
                    />
                    <Text style={styles.buttonTitleStyle}>{ '\n' + NAME}</Text>
                    <View style={styles.buttonIconSeparatorStyle} />
                  </TouchableOpacity>
                ))}
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      marginTop: 30,
      padding: 30,
    },
    buttonRowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#9E5DFC',
      height: 40,
      margin: 5,
    },
    buttonImageIconStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
    buttonTitleStyle:{
      textAlign: 'center',
      // display: 'block'
    },
    buttonIconSeparatorStyle: {
      backgroundColor: '#fff',
      width: 1,
      height: 40,
    }
});