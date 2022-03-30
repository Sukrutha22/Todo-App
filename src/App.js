import { useEffect, useState } from "react";
import "./App.css";
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
  Checkbox
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([0]);
  const [date, setDate] = useState("");

  const addTodo = () => {
    setTodoList([
      ...todoList,
      { id: Date.now(), text: todo, status: "true", date: date, completed: "false"  },
    ]);
  };

  useEffect(() => {
    const today = new Date();
    setDate(today.toDateString());
  }, [todo]);

  return (
    <div className="App">
      <Paper className="todo-container" elevation={15}>
        <div className="text-input">
          <TextField
            className="text-field"
            id="outlined-basic"
            label="Add Todo"
            variant="outlined"
            onChange={(e) => setTodo(e.target.value)}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              addTodo();
            }}
          >
            <AddIcon />
          </Fab>
        </div>
        <div className="todo-list">
          <List>
            {todoList.map((item) => {
              if (item.status === "true" && item.completed === "false") {
                return (
                  <Card className="todo-item" sx={{ minWidth: 275 }}>
                    <CardActions>
                    <Checkbox onChange={(e)=>{
                      setTodoList(
                        todoList.filter((obj)=>{
                          if (obj.id===item.id){
                            obj.completed="true"
                          }
                          return obj
                        })
                      )
                    }} />
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
  );
}

export default App;
