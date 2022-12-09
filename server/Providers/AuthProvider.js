import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import app from "../../RealmApp"
import { ADD_CLASS_ACTION, SET_RESET } from "../../public/Actions/List_Action";
import STORE from "../../store";
import { ObjectId } from "bson";
import { Class } from "../Schema";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(app.currentUser);
    const [userRole, setRole] = useState("");
    const [ADMIN_COLLECTION, setAC] = useState([]);
    const [userClasses, setClasses] = useState([]);
    const realmRef = useRef(null);
  
    useEffect(() => {
      if (!user) {
        return;
      }
      
      const config = {
        sync: {
          user: user,
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

const signIn = async (uEmail, uPassword) => {
    const realm = realmRef.current;
  // Users are ONLY able to login to a provided account > Software Design
    const payload = {
      email: uEmail,
      password: uPassword
    };
    const creds = Realm.Credentials.function(payload); // gets returned id && universal login function returning user's id
    const newUser = await app.logIn(creds); // logs in with returned id
    let tempRole = "";
    // Checking Partition and getting role
    try {
      const res = await newUser.functions.CHECK_FOR_PARTITION({id: newUser.id, email: uEmail, password: uPassword});
      setRole((res.role)); // role of user
      tempRole = res.role; // temprole due to res.role assignment to userRole in state is undefined when referencing in this state
    } catch (err) {
      console.log(err);
    }

    // Adjusting next query to user's role from database
    if (tempRole === "admin") {
      // Specific to admin functionality for app
      try {
        const res = await newUser.functions.GET_USER_COLLECTION({id: newUser.id, email: uEmail, type: tempRole});
        setAC(res.students) // admin collection
      } catch (err) {
        console.log(err);
      }
    } else {
      // User is of student, tutor, or professor type
      try {
        const res = await newUser.functions.GET_USER_COLLECTION({id: newUser.id, email: uEmail, type: tempRole});
        setClasses(res.classes);
      } catch (err) {
        console.log(err);
      }
    }
    setUser(newUser);
};

// for admin usage
const signUp = async (uEmail, uPassword, uType) => {
  const payload = {
    email: uEmail,
    password: uPassword,
    type: uType,
    createUser: true
  };
  
  const creds = Realm.Credentials.function(payload); // gets returned id && universal login function returning user's id
  const newUser = await app.logIn(creds); // logs in with returned id
  console.log("New User logged in: " + newUser.isLoggedIn);
  // Add user account into realms and Collection, User document will be allocated in Collection, but not in realms, upon user login, user's partition is allocated in realms
  try {
    // add user to doc
    const res = await newUser.functions.ADD_USER_DOC(payload);
    console.log("ID: " + res.id);
  } catch (err) {
    console.error(err);
  }

  try {
    const res = await newUser.functions.CHECK_FOR_PARTITION({id: newUser.id, email: uEmail, password: uPassword});  
    console.log("ID: " + newUser.id + " || Role: " + res.role);
  } catch (err) {
    console.error(err);
  }

  try {
    const data = await newUser.functions.GET_USER_COLLECTION({id: newUser.id, email: uEmail, type: uType});
    console.log("Data: " + JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
  // Removing incorrect partition from realms
  getRealmApp().deleteUser(newUser);
  newUser.logOut(); // signing user out for additional user creation
}

// for admin use, gets current collection of students and updates in admin collection array
const updateCollection = async () => {
  if (user == null) {
    console.warn("Not logged in, can't log out!");
    return;
  }
  // Specific to admin functionality for app
  try {
    const res = await user.functions.GET_USER_COLLECTION({id: user.id, email: "admin@gmail.com", type: "admin"});
    if (res) {
      setAC(res.students) // admin collection from db
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

  // The signOut function calls the logOut function on the currently
  // logged in user
const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    STORE.dispatch(SET_RESET("Resetting all arrays!"));
    user.logOut();
    setUser(null);
    setRole(null);
    setAC([]);
};

 if (userRole === "admin") { // returning specific data for admin
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        updateCollection,
        user,
        userRole,
        ADMIN_COLLECTION
      }}
    >
      {children}
    </AuthContext.Provider>
  );
 }
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        userRole,
        userClasses
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