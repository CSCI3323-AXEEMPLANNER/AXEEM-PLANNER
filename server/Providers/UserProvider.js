import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Class, Todo } from "../Schema";
import { useAuth } from "./AuthProvider";
import STORE from "../../store";
import { ADD_TODO_ACTION } from "../../public/Actions/List_Action";

const UserContext = React.createContext(null);

const UserProvider = ( props ) => {
  const [Todos, setTodos] = useState([]);
  const { user } = useAuth();

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
      schema: [Todo.schema, Class.schema],
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

      syncTodos.forEach(todo => {
        STORE.dispatch(ADD_TODO_ACTION(todo));
      })

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
      if (obj !== undefined) {
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
    } else { // Only for testing
      const test = realm.create(
        "Todo",
        new Todo({
          title: "New Todo",
          desc: "Some Todo Info",
          _partition: user.id,
          createdOn: new Date(),
          time: (new Date()).getTime().toString(),
          date: (new Date()).getTime().toString(),
          urgent: true
        })
      );
      STORE.dispatch(ADD_TODO_ACTION(test));
    }})
  };

  // Define the function for deleting a Todo.
  const deleteTodo = () => {
    const realm = realmRef.current;
    realm.write(() => {
      realm.deleteAll();
      // after deleting, we get the Todos again and update them
      setTodos([]);
    });
  };

  const closeRealm = () => {
    const realm = realmRef.current;
      if (realm) {
        realm.close();
        realmRef.current = null;
      }
  };

  // Render the children within the TodosContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <UserContext.Provider
      value={{
        createTodo,
        deleteTodo,
        closeRealm,
        Todos
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
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