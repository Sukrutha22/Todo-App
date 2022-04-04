import React, { createContext } from "react";
import { useEffect, useState } from "react";
import "../App.css";
import Firebase from "../firebaseConfig";

import AddTicket from "./AddTicket";
import ActiveList from "./ActiveList";
import CompletedList from "./CompletedList";

export const TodoContext = createContext(null);

function Home() {
  
  const [todoList, setTodoList] = useState([]);
  const [userRole, setUserRole] = useState('')
  const [todoListEdit, setTodoListEdit] = useState(false);
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      Firebase.firestore()
        .collection("todos")
        .get()
        .then((snapshot) => {
          const allTodo = snapshot.docs.map((item) => {
            return (
              (item.data().assignorId === user.uid || item.data().assigneeId === user.uid)  && {
                ...item.data(),
                id: item.id,
              }
            );
          });
          setTodoList(allTodo);
        });
        Firebase.firestore().collection("users").get().then(snapshot=>{
          snapshot.forEach(item=>{
            if(item.data().id===user.uid){
              setUserRole(item.data().role)
            }
          })
        })
    });
  }, [todoListEdit]);

  return (
    <TodoContext.Provider value={{ setTodoListEdit, todoList, userRole }}>
      <div className="App-container">
        { userRole==="Lead" && <AddTicket></AddTicket>}
        
        <ActiveList></ActiveList>
        <CompletedList></CompletedList>
      </div>
    </TodoContext.Provider>
  );
}

export default Home;
