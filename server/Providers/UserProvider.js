import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Class, Todo } from "../Schema";
import { useAuth } from "./AuthProvider";
import STORE from "../../store";
import { ADD_CLASS_ACTION, ADD_TODO_ACTION, EDIT_TODO_ACTION } from "../../public/Actions/List_Action";
import { to_ObjectID } from "../../public/Util/TO_OBJECTID";

const UserContext = React.createContext(null);
const INIT_STATE = [];

const UserProvider = ( props ) => {
  const [Todos, setTodos] = useState(INIT_STATE);
  const [Classes, setClasses ] = useState(INIT_STATE);
  const { user, userRole, userClasses } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  async function setPublic() {
    const config_public = {
      schema: [Class.schema]
    }
    // For classes
    // opening realm and getting public classes
    Realm.open(config_public).then(async (realm) => {
      realmRef.current = realm;
  })
  return () => {
    // cleanup function
    closeRealm();
  };
  } [user];

  useEffect(() => {
    if (user == null) {
      console.log("Null user? Needs to log in!");
      return;
  }

    // Enables offline-first: opens a local realm immediately without waiting 
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config = {
      schema: [Todo.schema, Class.schema],
      sync: {
        user,
        partitionValue: `${user.id}`,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      }
    }

    const config_public = {
      schema: [Class.schema],
    }

    // For classes
    // opening realm and getting public classes
    Realm.open(config_public).then(async (realm) => {
      realmRef.current = realm;
      // userclasses holds objectid of class in realms, so get that object and save it to user appropriate array
      if (userClasses !== undefined && userClasses.length > 0) {
        const result = realm.objects("Class").filtered("_id = $0", userClasses);

        // sorting array by startTime
        const sortedClasses = result.sorted("startTime");
        setClasses(...sortedClasses);

        STORE.dispatch(ADD_CLASS_ACTION(sortedClasses));

        // we observe changes on the Todos, in case Sync informs us of changes
        // started in other devices (or the cloud)
        sortedClasses.addListener(() => {
        setClasses(...sortedClasses);
        });
      }
      return () => {
        // cleanup function
        closeRealm();
      };
    }, [user]);

    // For user specific todos
   // open a realm for this particular user and get all Todos
    Realm.open(config).then(async (realm) => {
      realmRef.current = realm;

      // Should be replaced with classes
      const syncTodos = realm.objects("Todo");
      
      let sortedTodos = syncTodos.sorted("title");
      setTodos([...sortedTodos]);
      
      if (STORE.getState().TODO_STATE.TODO_LIST.length === 0) {
        syncTodos.forEach((todo) => {
        STORE.dispatch(ADD_TODO_ACTION(todo));
      })}
      // we observe changes on the Todos, in case Sync informs us of changesr
      // started in other devices (or the cloud)
      sortedTodos.addListener(() => {
      setTodos([...sortedTodos]);
      });
    });

    return () => {
      // cleanup function
      closeRealm();
    };
  }, [user]);

  const createTodo = (obj) => {
    const realm = realmRef.current;
    realm.write(() => {
      // Create a new Todo in the same partition -- that is, using the same user id.
      const currTodo = realm.create(
        "Todo",
        new Todo({
          title: obj.title,
          desc: obj.desc,
          _partition: user.id,
          createdOn: new Date(),
          time: obj.time.toString(),
          date: obj.date.toString(),
          urgent: obj.urgent
        })
      );
      STORE.dispatch(ADD_TODO_ACTION(currTodo));
  })};
  
  const editTodo = (id, obj) => {
    const realm = realmRef.current;
    let todo; // storing todo to reference for reducer action
    realm.write(() => {
      todo = realm.objectForPrimaryKey('Todo', id); // finds at some id
      todo.title = obj.title;
      todo.desc = obj.desc;
      todo.urgent = obj.urgent;
    });
    STORE.dispatch(EDIT_TODO_ACTION({id: id, oldObj: obj, newObj: todo}));
  };

  // Define the function for deleting a Todo in realms
  const deleteTodo = (id) => {
    const realm = realmRef.current;
    realm.write(()=>{
      realm.delete(realm.objectForPrimaryKey('Todo', id));
   }) 
  };

  const closeRealm = () => {
    const realm = realmRef.current;
      if (realm) {
        realm.close();
        realmRef.current = null;
      }
  };

  // For admin usage
  // Class mutation/query
  // Adds class to realms
  const createClass = async (obj) => {
    await setPublic(); // setting realm to class
    // set realmref to class function
    const realm = realmRef.current;
    var classObj;
    realm.write(async () => {
    realm.create(
      "Class",
      classObj = new Class({
        title: obj.title,
        desc: obj.desc,
        endTime: obj.endTime,
        startTime: obj.startTime,
        professor: [],
        participating: [],
        createdOn: new Date(),
        subject: obj.subject,
        code: obj.code
      })
    );
    // When creating new class to realms, we should add it to the collection as well
    try {
      await user.functions.ADD_CLASS(classObj);
    } catch (err) {
      console.error(err);
    }
  })};

  // Removes class entirely
  const removeClass = async (id) => {
    await setPublic();
    console.log("Should delete class at id: " + id + " but shouldn't truly be deleted.");
    const realm = realmRef.current;
    //realm.write(()=>{realm.delete(realm.objectForPrimaryKey('Class', id));})
    // realm.write(()=>{realm.delete(realm.objects('Class'));})
    // capable of removing from database, but revoking the ability for testing, time constraints, and admin usage for history of the class object
  };

  // Returns all class objects in realms
  const viewAllClasses = async () => {
    await setPublic();
    const realm = realmRef.current;
    console.log(JSON.stringify(realm.objects("Class")));
  };

  // General usage for class mutation 
  // Accepts some type which will allow for deletion, addition, or update
  const mutateUserToClass = async (userId, classId, userPartition, action) => {
    await setPublic();
    let index;
    const data = {
      userId: userId,
      classId: classId,
      userPartition: userPartition
    };

    const realm = realmRef.current;
    if (action === "add") {
      // Adding user to class
      realm.write(() => {
        let pickedClass = realm.objectForPrimaryKey('Class', to_ObjectID(classId)); // finds at some id
        let tempArr = [];
        tempArr = pickedClass.participating;
        index = tempArr.indexOf(to_ObjectID(userId));
        if (index !== -1) {
          console.error("User cannot be added twice");
          return;
        }
        tempArr.push(to_ObjectID(userId));
        pickedClass.participating = tempArr;
      });

      // Update Collection in DB to add participation
      if (index !== -1) {
        console.error("Not completing DB Call");
        return;
      } else {
        try {
          // Will add to user to class and the user in collection
          const res = await user.functions.ADD_USER_TO_CLASS(data);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (action === 'delete') {
      // delete user from local class
      realm.write(() => {
        let pickedClass = realm.objectForPrimaryKey('Class', to_ObjectID(classId)); // finds at some id
        let tempArr = [];
        tempArr = pickedClass.participating;
        index = tempArr.indexOf(to_ObjectID(userId));
        
        if (index === -1) {
          console.error("Could not find userId in participating");
          return;
        };

        if (index === 0 && tempArr.length === 1) {
          pickedClass.participating = [];
        } else {
          tempArr = tempArr.splice(index, 1);
          pickedClass.participating = tempArr;
        }
      });

      // Removing if index is greater than -1
      if (index === -1) {
        console.error("Not completing DB Call");
        return;
      } else {
      // Update Collection in DB to add participation
        try {
          // Will add to user to class and the user in collection
          const res = await user.functions.REMOVE_USER_FROM_CLASS(data);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
    };
  }

  // Remove user for admin use
  const removeUserFromRealm = (id) => {
  //   const realm = realmRef.current;
  //   realm.write(()=>{
  //     realm.delete(realm.objectForPrimaryKey('userCollection', id));
  // })
  console.log("I want to remove user at id: " + id + " this should remove them but not at the moment.");
  };

  // Render the children within the TodosContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  if (userRole === "admin") { // returning specific data for admin
    return (
      <UserContext.Provider
        value={{
          createClass,
          removeClass,
          viewAllClasses,
          mutateUserToClass,
          closeRealm
        }}
      >
        {props.children}
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider
        value={{
          createTodo,
          editTodo,
          deleteTodo,
          closeRealm,
          Todos,
          Classes
        }}
      >
        {props.children}
      </UserContext.Provider>
    );
  }
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useUser = () => {
  const UserAble = useContext(UserContext);
  if (UserAble == null) {
    throw new Error("userContext() called outside of a UserProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return UserAble;
};

export { UserProvider, useUser };