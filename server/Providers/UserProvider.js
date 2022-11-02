import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Class, Todo } from "../Schema";
import { useAuth } from "./AuthProvider";
import STORE from "../../store";
import { ADD_TODO_ACTION, EDIT_TODO_ACTION } from "../../public/Actions/List_Action";

const UserContext = React.createContext(null);
const INIT_STATE = [];

const UserProvider = ( props ) => {
  const [Todos, setTodos] = useState(INIT_STATE);
  const { user, userRole } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);
  
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
      schema: [Todo.schema],
      sync: {
        user: user,
        partitionValue: `${user.id}`,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      }
    }

   // open a realm for this particular user and get all Todos
    Realm.open(config).then(async (realm) => {
      realmRef.current = realm;

      // Should be replaced with classes
      const syncTodos = realm.objects("Todo");
      let sortedTodos = syncTodos.sorted("title");
      setTodos([...sortedTodos]);
      // Only storing to global if existing info!
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
  const addClass = () => {
    const realm = realmRef.current;
      if (realm) {
        realm.close();
        realmRef.current = null;
      }
  }

  // Render the children within the TodosContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  if (userRole === "admin") { // returning specific data for admin
    return (
      <UserContext.Provider
        value={{
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
          Todos
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