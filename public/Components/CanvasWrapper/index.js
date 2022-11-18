import { useAuth } from "../../../server/Providers/AuthProvider";
import { useUser } from "../../../server/Providers/UserProvider";
import Canvas from "../Canvas";
import AdminAccess from "../AdminAccess";
// import LOGIN_VIEW from "../VIEW_LOGIN";
import Login from "../../Util/Login";
import { SafeAreaView, Button, Text } from "react-native";
import STORE from "../../../store";

// Canvas wrapper allows us to use a hook call and pass down all functions of useAuth provider to CANVAS
export const CanvasWrapper = () => {
    const authProps = useAuth();
    const UserAble  = useUser();
    if (authProps.user !== null && authProps.user !== undefined) {
        return (
            <SafeAreaView>
                <Text>Viewing as {authProps.userRole}</Text>
                {
                    // // Special Functionality for admin user view
                    // authProps.userRole === "admin" ?
                    // <>
                    // {/* Displayed to console currently, but should be rendered as a list for copy to clipboard */}
                    // <Button
                    // title="View All Accounts"
                    // onPress={async () => { await authProps.updateCollection(); console.log(authProps.ADMIN_COLLECTION); } } 
                    // />
                    // {/* Adds account to collection, but partition will be allocated upon user login, adjusted in collection as well */}
                    // <Button
                    // title="Add Account"
                    // // onPress={() => {authProps.signUp("newUser@gmail.com", "pass123", "student")}}
                    // />
                    // {/* Admin should be able to see all classes */}
                    // <Button
                    // title="View All Classes"
                    // onPress={() => {UserAble.viewAllClasses()}}
                    // />
                    // {/* Admin should be able to create class */}
                    // <Button
                    // title="Add Class"
                    // onPress={() => {UserAble.createClass({title: "PHYSICS 1302", subject: "PHY", desc: "Understand ELEC. SOUND. LIGHT.", endTime: new Date().getTime().toString(), startTime: new Date().getTime().toString(), code: "12333"})}} 
                    // />
                    // {/* Add should be able to add class to user, professor, and tutor */}
                    // <Button
                    // title="Add User to Class"
                    // onPress={() => {UserAble.mutateUserToClass("63509ae103546f5fae13fd13", "636ae28b15629ca3ded5bf28", "6350adf7125b5d357ed52fd8", "add")}} 
                    // />
                    // {/* Delete user from class */}
                    // <Button
                    // title="Delete User from Class"
                    // onPress={() => {UserAble.mutateUserToClass("63509ae103546f5fae13fd13", "636ae28b15629ca3ded5bf28", "6350adf7125b5d357ed52fd8", "delete")}} 
                    // />
                    // {/* Admin should be able to delete class */}
                    // <Button
                    // title="Delete Class"
                    // onPress={() => {UserAble.removeClass(new ObjectId("636ae28b15629ca3ded5bf28"))}}
                    // />
                    // {/* Admin should be able to delete a user of any type except for admin */}
                    // <Button
                    // title="Delete User"
                    // onPress={() => { console.log("Will remove user from realms, but not collection"); } } 
                    // />
                    // </>
                    // : 
                    // <Button
                    // title="View Todos"
                    // onPress={() => {console.log(STORE.getState().TODO_STATE.TODO_LIST)}}
                    // />
                }
                <Button
                title={"Logout of " + authProps.user.id}
                onPress={() => {authProps.signOut();}}
                />
                {/* Passing functions from userable to canvas -> global view -> to anything */}
                {/* Also, restrictign functionality for Admin to only see bare functionality/their respective actions */}
                {authProps.userRole === "admin" ? <AdminAccess UserAble={UserAble} authProps={authProps} /> :
                <>
                <Button
                    title="View Todos"
                    onPress={() => { console.log(STORE.getState().TODO_STATE.TODO_LIST); } } 
                />
                <Canvas {...UserAble} role={authProps.userRole} />
                </> 
                }
            </SafeAreaView>
        )
    }
    else return <Login {...authProps} />
};