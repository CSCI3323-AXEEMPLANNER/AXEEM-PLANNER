import React from "react";
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TabBarIOSItem,
  } from "react-native";
//import { defaultEqualityCheck } from "reselect";
////import {NavigationContainer} from '@react-navigation/native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
const a = require('./Images/clipboard-list.png')
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
             ['CHAT', d],['CALENDAR', e],['SETTINGS', f]],
        }
    }


    render() {
        return (
           <View style={styles.container}>
           <View style={styles.NavContainer}>
             <View style={styles.NavBar}>
               {this.state.VIEW_NAMES.map(([NAME, IMG], index) => (
                   <TouchableOpacity
                   style={styles.IconStyle}
                   activeOpacity={0.5}
                   onPress={() => {this.props.UPDATE_VIEW('VIEW_' + NAME)}}
                   key={index}>
                   {/* <Icon name="calendar" height={iconHeight} width={iconWidth}/> */}
                   <Image
                     source={IMG}
                     style={styles.buttonImageIconStyle}                  
                   />
                   {/* <Text style={styles.buttonTitleStyle}>{NAME}</Text> */}
                   {/* <View style={styles.buttonIconSeparatorStyle} /> */}
                 </TouchableOpacity>
               ))}
             </View>
           </View>
         </View>
           // </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'white',
    
    //bottom: 20,
  },
  NavContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
  },
  NavBar: {
    flexDirection: 'row',
    backgroundColor: '#9E5DFC',
    width: '90%',
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    borderRadius: 20,
    margin: 10,
  },
  IconStyle:{
    padding: 14,
  },
  buttonImageIconStyle: { 
    height: 25,
    width: 25,      
    resizeMode: 'stretch',
  },
  buttonTitleStyle:{
    textAlign: 'center',
    display: 'block',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
    
  },
  
});