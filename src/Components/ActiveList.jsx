import React, { useContext } from "react";
import {
  Paper,
  List,
  Typography,
  Card,
  CardActions,
  Checkbox,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import Firebase from "../firebaseConfig";
import { TodoContext } from "./Home";

function ActiveList() {
  const { todoList, userRole } = useContext(TodoContext);
  const { setTodoListEdit } = useContext(TodoContext);
  return (
    <Paper className="todo-container" elevation={15}>
      <h2>Active Task</h2>
      <List>
        <Typography variant="h6" className={todoList.length ? "display-none" : "display"}>
          No Task Yet
        </Typography>
        {todoList.map((item) => {
          if (item.completed === "false") {
            return (
              <Card
                className="todo-item"
                key={item.text}
                sx={{ minWidth: 275 }}
              >
                <CardActions>
                  <Checkbox
                    // onChange={(e) => {
                    //   Firebase.firestore()
                    //     .collection("todos")
                    //     .doc(item.id)
                    //     .update({
                    //       completed: "true",
                    //     });
                    //   setTodoListEdit((prevState) => !prevState.todoListEdit);
                    // }}
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
                    disabled={userRole==="Engineer"}
                    // onClick={(e) => {
                    //   Firebase.firestore()
                    //     .collection("todos")
                    //     .doc(item.id)
                    //     .delete();
                    //   setTodoListEdit((prevState) => !prevState.todoListEdit);
                    // }}
                  >
                    <DeleteOutlined color={userRole==="Lead" ? "primary" : "dark"} />
                  </IconButton>
                </CardActions>
              </Card>
            );
          }

          return null;
        })}
      </List>
    </Paper>
  );
}

export default ActiveList;
