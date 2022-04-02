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
  const [date, setDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [assigneeList, setAssigneeList] = useState([]);
  const today = new Date();
  const todos = Firebase.firestore().collection("todos").get();
  const assignees = Firebase.firestore().collection("users").get();

  const addTodo = (e) => {
    e.preventDefault();
    setDate(today.toDateString());
    Firebase.auth().onAuthStateChanged((user) => {
      Firebase.firestore().collection("todos").add({
        text: todo,
        completed: "false",
        date: date,
        userId: user.uid,
      });
    });
  };

  const handleAssignee = (e) => {
    e.preventDefault();
    setAssigneeId(e.target.value);
  };

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      Firebase.firestore().collection("todos").get().then((snapshot) => {
        const allTodo = snapshot.docs.map((item) => {
          return (
            item.data().userId === user.uid && { ...item.data(), id: item.id }
          );
        });

        setTodoList(allTodo);
      });
    });
    Firebase.firestore().collection("users").get().then((snapshot) => {
      const allAssignee = snapshot.docs.map((item) => {
        return { ...item.data() };
      });
      setAssigneeList(allAssignee);
    });
  }, [todos, assignees]);

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
            <FormControl sx={{ width: 4.5 / 10 }}>
              <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={assigneeId}
                label="Assigned To"
                onChange={handleAssignee}
              >
                {assigneeList.map((item) => {
                  if (item.role === "Engineer") {
                    return <MenuItem value={item.id}>{item.username}</MenuItem>;
                  }
                  return null;
                })}
              </Select>
            </FormControl>
            <Fab type="submit" color="primary" aria-label="add">
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
      </Paper>
    </div>
  );
}

export default Home;
