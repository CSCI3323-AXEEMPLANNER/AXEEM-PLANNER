// IMPORTING IMPORTANT PAGE COMPONENTS
import Canvas from './public/Components/Canvas';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// IMPORTANT IMPORTS FOR GLOBAL STATE
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import allReducers from "./public/Reducers/"

const STORE = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
})});

export default function App() {
  return (
    <Provider store={STORE}>
      <View style={styles.container}>
        <Canvas />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});