import React from 'react'
import { useEffect, useState } from "react";
import "../App.css";
import Firebase from "../firebaseConfig";
import {
  Paper,
  TextField,
  Fab,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  List,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

function Home() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [date, setDate] = useState("");
  
    const addTodo = (e) => {
      e.preventDefault();
      Firebase.firestore().collection("todos").add({
        text: todo,
        completed: "false",
        date: date,
      });
    };
  
    useEffect(() => {
      const today = new Date();
      setDate(today.toDateString());
      Firebase.firestore()
        .collection("todos")
        .get()
        .then((snapshot) => {
          const allTodo = snapshot.docs.map((item) => {
            console.log(item.data());
            return {
              ...item.data(),
              id: item.id,
            };
          });
          console.log(allTodo);
          setTodoList(allTodo);
        });
    });
  
  return (
    <div className="App-container">
        <Paper className="todo-container" elevation={15}>
          <form className="text-input" onSubmit={addTodo}>
            <TextField
              required
              className="text-field"
              id="outlined-basic"
              label="Add Todo"
              variant="outlined"
              onChange={(e) => setTodo(e.target.value)}
            />
            <Fab type="submit" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </form>
          <div className="todo-list">
            <h2>Active Task</h2>
            <List>
              <Typography
                variant="h6"
                className={todoList.length ? "display-none" : "display"}
              >
                No Task Yet
              </Typography>
              {todoList.map((item) => {
                if (item.completed === "false") {
                  return (
                    <Card className="todo-item" sx={{ minWidth: 275 }}>
                      <CardActions>
                        <Checkbox
                          onChange={(e) => {
                            Firebase.firestore()
                              .collection("todos")
                              .doc(item.id)
                              .update({
                                completed: "true",
                              });
                          }}
                        />
                      </CardActions>
                      <CardContent className="todo-content">
                        <Typography variant="subtitle1" component="div">
                          {item.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ mb: 1.5 }}
                          color="text.secondary"
                        >
                          {item.date}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            Firebase.firestore()
                              .collection("todos")
                              .doc(item.id)
                              .delete();
                          }}
                        >
                          <DeleteOutlined color="primary" />
                        </IconButton>
                      </CardActions>
                    </Card>
                  );
                }

                return null;
              })}
            </List>
          </div>
        </Paper>
        <Paper className="todo-container " elevation={15}>
          <div className="todo-list">
            <List>
              <h2>Completed Task</h2>
              <Typography
                variant="h6"
                className={todoList.length ? "display-none" : "display"}
              >
                No Completed Task
              </Typography>
              {todoList.map((item) => {
                if (item.completed === "true") {
                  return (
                    <Card className="todo-item" sx={{ minWidth: 275 }}>
                      <CardActions>
                        <Checkbox
                          defaultChecked
                          onChange={(e) => {
                            Firebase.firestore()
                              .collection("todos")
                              .doc(item.id)
                              .update({
                                completed: "false",
                              });
                          }}
                        />
                      </CardActions>
                      <CardContent className="todo-content">
                        <Typography variant="subtitle1" component="div">
                          {item.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ mb: 1.5 }}
                          color="text.secondary"
                        >
                          {item.date}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            Firebase.firestore()
                              .collection("todos")
                              .doc(item.id)
                              .delete();
                          }}
                        >
                          <DeleteOutlined color="primary" />
                        </IconButton>
                      </CardActions>
                    </Card>
                  );
                }
                return null;
              })}
            </List>
          </div>
        </Paper>
      </div>
  )
}

export default Home