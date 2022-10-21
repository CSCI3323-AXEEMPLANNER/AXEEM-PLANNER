import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import app from "../../RealmApp";
import { ADD_CLASS_ACTION } from "../../public/Actions/List_Action";
import STORE from "../../store";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(app.currentUser);
    // const [userClasses, setUserClasses] = useState([]);
    const [userRole, setRole] = useState();
    const realmRef = useRef(null);
  
    useEffect(() => {
      if (!user) {
        return;
      }
      
      const config = {
        sync: {
          user,
          partitionValue: `user=${user.id}`
        },
      };
  
      // Open a realm with the logged in user's partition value in order
      Realm.open(config).then((userRealm) => {
        realmRef.current = userRealm;
      });
  
      return () => {
        // cleanup function
        const userRealm = realmRef.current;
        if (userRealm) {
          userRealm.close();
          realmRef.current = null;
        }
      };
    }, [user]);

const signIn = async (uEmail, upassword, uType) => {
  // Users are ONLY able to login to a provided account > Software Design
    const payload = {
      email: uEmail,
      password: upassword,
      type: uType // uType should contain a string value representing the type of user attempting to login!
    };
    const creds = Realm.Credentials.function(payload); // gets returned id
    const newUser = await app.logIn(creds); // logs in with returned id

    // If user is of type which requires extra information, then use the try method below, else skip and add user
    if (uType === "student" || uType === "tutor" || uType === "professor") {
      try { // update partition in db
        const res = await newUser.functions.ADD_USER_DOC({id: newUser.id, email: uEmail, password: upassword, type: uType});
        setRole(res.role);
        STORE.dispatch(ADD_CLASS_ACTION(res.classes)); // storing user classes from db to global state
      } catch (err) {
        console.error(err);
      }
    }
    setUser(newUser);
};

  // The signOut function calls the logOut function on the currently
  // logged in user
const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        userRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
    const auth = useContext(AuthContext);
    if (auth == null) {
      throw new Error("useAuth() called outside of a AuthProvider?");
    }
    return auth;
  };
  
export { AuthProvider, useAuth };