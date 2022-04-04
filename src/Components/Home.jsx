import React from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

function Home() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const todos = Firebase.firestore().collection("todos").get();
  const assignees = Firebase.firestore().collection("users").get();

  const today = new Date();
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(today.toDateString());
  }, [todo]);

  const [assigneeId, setAssigneeId] = useState("");
  const [assigneeList, setAssigneeList] = useState([]);
  useEffect(()=>{
    Firebase.firestore().collection("users").get().then(snapshot=>{

      const allAssignee = snapshot.docs.map(item => {
        return (item.data().role === "Engineer" && { assigneeId: item.data().id, assigneeName: item.data().username})
      })
      setAssigneeList(allAssignee)
    })
  },[])

  const addTodo = (e) => {
    e.preventDefault();
      Firebase.auth().onAuthStateChanged((user) => {
      Firebase.firestore().collection("todos").add({
        text: todo,
        completed: "false",
        date: date,
        assignorId: user.uid,
        assigneeId: assigneeId
      });
    });
  };

  const [todoListEdit, setTodoListEdit] = useState(false)
  useEffect(()=>{
    Firebase.auth().onAuthStateChanged(user => {
      Firebase.firestore().collection("todos").get().then(snapshot =>{
        const allTodo = snapshot.docs.map(item =>{
          return (item.data().assignorId === user.uid && {...item.data(), id: item.id})
        })
        setTodoList(allTodo)
      })
    })
  },[todoListEdit])

  

  return (
    <div className="App-container">
      <div className="ticket-container">
        <Paper elevation={10} sx={{ width: 1 / 2 }}>
          <form className="text-input" onSubmit={addTodo}>
            <TextField
              required
              id="outlined-basic"
              label="Add Ticket"
              variant="outlined"
              sx={{ width: 4.5 / 10 }}
              onChange={(e) => setTodo(e.target.value)}
            />
            <FormControl required sx={{ width: 4.5 / 10, textAlign: "start" }}>
              <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={assigneeId}
                label="Assigned To"
                onChange={(e) => setAssigneeId(e.target.value)}
              >
                {assigneeList.map(item => {
                  if (item) {
                    return <MenuItem key={item.assigneeId} value={item.assigneeId}> {item.assigneeName} </MenuItem>
                  }
                  return null;
                })}
              </Select>
            </FormControl>
            <Fab type="submit" color="primary" aria-label="add" onClick={(e)=> setTodoListEdit(prevState=> !prevState.todoListEdit)}>
              <AddIcon />
            </Fab>
          </form>
        </Paper>
      </div>

      <Paper className="todo-container" elevation={15}>
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
                <Card className="todo-item" key={item.text} sx={{ minWidth: 275 }}>
                  <CardActions>
                    <Checkbox
                      onChange={(e) => {
                        Firebase.firestore()
                          .collection("todos")
                          .doc(item.id)
                          .update({
                            completed: "true",
                          });
                          setTodoListEdit(prevState=> !prevState.todoListEdit)
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
                          setTodoListEdit(prevState=> !prevState.todoListEdit)
                      }
                    }
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
      </Paper>
      <Paper className="todo-container " elevation={15}>
        <h2>Completed Task</h2>
        <List>
          <Typography
            variant="h6"
            className={todoList.length ? "display-none" : "display"}
          >
            No Completed Task
          </Typography>
          {todoList.map((item) => {
            if (item.completed === "true") {
              return (
                <Card className="todo-item" key={item.text} sx={{ minWidth: 275 }}>
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
                          setTodoListEdit(prevState=> !prevState.todoListEdit)
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
                          setTodoListEdit(prevState=> !prevState.todoListEdit)
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
      </Paper>
    </div>
  );
}

export default Home;
