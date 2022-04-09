import React, { createContext } from "react";
import { useEffect, useState } from "react";
import "../App.css";
import Firebase from "../firebaseConfig";
import AddTicket from "./AddTicket";
import Active from "./Active";
import Completed from "./Completed";
import moment from 'moment';


export const TodoContext = createContext(null);

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [todoListEdit, setTodoListEdit] = useState(false);
  const usersRef = Firebase.database().ref("users/");
  const todoMonth = moment().format("YYYY/MMM")
  const todosRef = Firebase.database().ref(`${todoMonth}/`);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      usersRef.on("value", (snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().id === user.uid) {
            setUserRole(item.val().role);
          }
        });
      });
      todosRef.on("value", (snapshot) => {
        let todos = snapshot.val();
        let todosList = [];
        for (let id in todos) {
          todosList.push({ ...todos[id], id: id });
        }
        const allTodo = todosList.map((item) => {
          return (
            (item.assignorId === user.uid || item.assigneeId === user.uid) && {
              ...item,
            }
          );
        });
        setTodoList(allTodo);
      });
    });
  }, [todoListEdit]);

  return (
    <TodoContext.Provider
      value={{ setTodoListEdit, todoList, userRole, usersRef, todoMonth }}
    >
      <div className="App-container">
        {userRole === "Lead" && <AddTicket></AddTicket>}

        <Active></Active>
        <Completed></Completed>
      </div>
    </TodoContext.Provider>
  );
}

export default Home;
