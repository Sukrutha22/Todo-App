import { useEffect, useState } from "react";
import "./App.css";
import Firebase from "./firebaseConfig";
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

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [date, setDate] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    Firebase.firestore().collection("todos").add({
      id: new Date(),
      text: todo,
      status: "true",
      completed: "false",
      date: date,
    });

    Firebase.firestore().collection("todos").get().then((snapshot) => {
        snapshot.forEach((obj) => {
          setTodoList([...todoList, {
            id: obj.data().id,
            text: obj.data().text,
            status: obj.data().status,
            completed: obj.data().completed,
            date: obj.data().date,
          }]);
        });
      });
  };

  useEffect(() => {
    const today = new Date();
    setDate(today.toDateString());
  }, [todo]);

  return (
    <div className="App">
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
              {todoList.map((item) => {
                if (item) {
                  if (item.status === "true" && item.completed === "false") {
                    return (
                      <Card className="todo-item" sx={{ minWidth: 275 }}>
                        <CardActions>
                          <Checkbox
                            onChange={(e) => {
                              setTodoList(
                                todoList.filter((obj) => {
                                  if (obj.id === item.id) {
                                    obj.completed = "true";
                                  }
                                  return obj;
                                })
                              );
                            }}
                          />
                        </CardActions>
                        <CardContent className="todo-content">
                          <Typography variant="h5" component="div">
                            {item.text}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {item.date}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton
                            aria-label="delete"
                            onClick={(e) => {
                              setTodoList(
                                todoList.filter((obj) => {
                                  if (obj.id === item.id) {
                                    obj.status = "false";
                                  }
                                  return obj;
                                })
                              );
                            }}
                          >
                            <DeleteOutlined color="primary" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    );
                  }
                }

                return null;
              })}
            </List>
          </div>
        </Paper>
        <Paper className="todo-container" elevation={15}>
          <div className="todo-list">
            <List>
              <h2>Completed Task</h2>
              {todoList.map((item) => {
                if (item.completed === "true" && item.status === "true") {
                  return (
                    <Card className="todo-item" sx={{ minWidth: 275 }}>
                      <CardActions>
                        <Checkbox
                          defaultChecked
                          onChange={(e) => {
                            setTodoList(
                              todoList.filter((obj) => {
                                if (obj.id === item.id) {
                                  obj.completed = "false";
                                }
                                return obj;
                              })
                            );
                          }}
                        />
                      </CardActions>
                      <CardContent className="todo-content">
                        <Typography variant="h5" component="div">
                          {item.text}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {item.date}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            setTodoList(
                              todoList.filter((obj) => {
                                if (obj.id === item.id) {
                                  obj.status = "false";
                                }
                                return obj;
                              })
                            );
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
    </div>
  );
}

export default App;
