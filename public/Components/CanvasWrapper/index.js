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
        return (
            <SafeAreaView>
                <Text>Viewing as {authProps.userRole}</Text>
                {
                    // Special Functionality for admin user view
                    authProps.userRole === "admin" ?
                    <>
                    {/* Displayed to console currently, but should be rendered as a list for copy to clipboard */}
                    <Button
                    title="View All Accounts"
                    onPress={async () => { await authProps.updateCollection(); console.log(authProps.ADMIN_COLLECTION); } } 
                    />
                    {/* Adds account to collection, but partition will be allocated upon user login, adjusted in collection as well */}
                    <Button
                    title="Add Account"
                    onPress={() => {authProps.signUp("newUser@gmail.com", "pass123", "student")}}
                    />
                    {/* Admin should be able to see all classes */}
                    <Button
                    title="View All Classes"
                    onPress={() => {console.log("This button will peek at all classes"); } } 
                    />
                    {/* Admin should be able to create class */}
                    <Button
                    title="Add Class"
                    onPress={() => {console.log("This button will invoke a class addition to the database!"); } } 
                    />
                    {/* Add should be able to add class to user, professor, and tutor */}
                    <Button
                    title="Add Class to USER"
                    onPress={() => { console.log("This button will append a class to a user!"); } } 
                    />
                    {/* Admin should be able to delete class */}
                    <Button
                    title="Delete Class"
                    onPress={() => { console.log("This button will invoke a class addition to the database!"); } } 
                    />
                    {/* Admin should be able to delete a user of any type except for admin */}
                    <Button
                    title="Delete User"
                    onPress={() => { console.log("This button will invoke a class addition to the database!"); } } 
                    />
                    </>
                    : <Button
                    title="View Todos"
                    onPress={() => {console.log(STORE.getState().TODO_STATE.TODO_LIST)}}
                    />
                }
                <Button
                title={"Logout of " + authProps.user.id}
                onPress={() => {authProps.signOut();}}
                />
                {/* <Button // here in case of having to remove ALL user's todos
                title="Delete all Todos"
                onPress={() => {UserAble.deleteTodo()}}
                /> */}
                {/* Passing functions from userable to canvas -> global view -> to anything */}
                {/* Also, restrictign functionality for Admin to only see bare functionality/their respective actions */}
                {authProps.userRole === "admin" ? null : <Canvas {...UserAble} role={authProps.userRole} /> }
            </SafeAreaView>
        )
    }
    else return <Login {...authProps} />
};