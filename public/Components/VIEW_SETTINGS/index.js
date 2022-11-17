import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-web";
import { Settings_Style} from "../../Util/style";


class VIEW_SETTINGS extends React.Component {
    constructor() {
      super();
    }

    render() {
        return (
          <View style= {Settings_Style.category}>
          
          <><View style= {Settings_Style.button}>
            <Button title="Dark Mode" />

          </View><View style= {Settings_Style.button}>
              <Button title="Log out" />

            </View></></View>
                );
      }
}
export default VIEW_SETTINGS;

