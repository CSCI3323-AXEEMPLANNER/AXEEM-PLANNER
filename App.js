// IMPORTING IMPORTANT PAGE COMPONENTS
import Canvas from './public/Components/Canvas';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// IMPORTANT IMPORTS FOR GLOBAL STATE
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./public/Reducers/";
import Navigation from "./public/Components/Navigation";

const STORE = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default function App() {
  return (
    <Provider store={STORE}>
      <View style={styles.container}>
        {/*<View style={styles.mainBody}>*/}
            <Canvas/>
            <StatusBar style="auto" />
        </View>
      {/*</View>*/}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  /*mainBody: {
    height: "90%",
    width: "97%",
    borderRadius: 50,
    backgroundColor: "#9326c7",
    marginBottom: 80, 
  },*/
});
