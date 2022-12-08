import React from "react";
import { View, Button } from "react-native";


class VIEW_SETTINGS extends React.Component {
    constructor() {
      super();
    }
   
    render() {
      
        return (
          <View>
            <Button title="Dark Mode"/>
             <Button title="Logout"
            onPress={() => {
              {this.props.Logoff(true)}
            }} 
            /> 
           
           
          </View>
         
            
          );
         
        
    }
}
export default VIEW_SETTINGS;

