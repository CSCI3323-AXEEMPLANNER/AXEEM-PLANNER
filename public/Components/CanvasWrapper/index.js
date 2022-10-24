import { useAuth } from "../../../server/Providers/AuthProvider";
import { useUser } from "../../../server/Providers/UserProvider";
import Canvas from "../Canvas";
// import LOGIN_VIEW from "../VIEW_LOGIN";
import Login from "../../Util/Login";
import { SafeAreaView, Button, Text } from "react-native";
import STORE from "../../../store";

// Canvas wrapper allows us to use a hook call and pass down all functions of useAuth provider to CANVAS
export const CanvasWrapper = () => {
    const authProps = useAuth();
    const UserAble  = useUser();
    if (authProps.user !== null) {
        // if (authProps.userRole === "student") {
            return (
                <SafeAreaView>
                    <Text>Viewing as {authProps.userRole}</Text>
                    <Button 
                    title="View Todos"
                    onPress={() => {console.log(STORE.getState().TODO_STATE.TODO_LIST)}}
                    />
                    <Button
                    title={"Logout of " + authProps.user.id}
                    onPress={() => {authProps.signOut();}}
                    />
                    {/* <Button // here in case of having to remove ALL user's todos
                    title="Delete all Todos"
                    onPress={() => {UserAble.deleteTodo()}}
                    /> */}
                    {/* Passing functions from userable to canvas -> global view -> to anything */}
                    <Canvas {...UserAble} />
                </SafeAreaView>
            )
    //    }
        if (authProps.userRole === "admin") {
            return (
                <SafeAreaView>
                    <Text>Viewing as {authProps.userRole}</Text>
                    <Button
                    title={"Logout of " + authProps.user.id}
                    onPress={() => authProps.signOut()}
                    />
                    <Canvas />
                </SafeAreaView>
            )
        }
    }
    else return <Login {...authProps} />
};