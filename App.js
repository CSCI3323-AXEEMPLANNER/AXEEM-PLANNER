// IMPORTING IMPORTANT PAGE COMPONENTS
import { CanvasWrapper } from './public/Components/CanvasWrapper'; // Canvas wrapper allows us to functionally call a hook (useAuth) and prepare for specific view
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import STORE from './store';

// IMPORTANT IMPORTS FOR GLOBAL STATE
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./public/Reducers/";
import { AuthProvider } from './server/Providers/AuthProvider';
import { UserProvider } from './server/Providers/UserProvider';

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
    // Auth Provider allows the storage/access of user info
    <Provider store={STORE}>
      <AuthProvider>
        <UserProvider>
        <View style={styles.container}>
            <CanvasWrapper />
          <StatusBar style="auto" />
        </View>
        </UserProvider>
      </AuthProvider>
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
});
