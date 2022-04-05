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

function CompletedList() {
  const { todoList, setTodoListEdit, userRole } = useContext(TodoContext);
  return (
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
              <Card
                className="todo-item"
                key={item.text}
                sx={{ minWidth: 275 }}
              >
                <CardActions>
                  <Checkbox
                    defaultChecked
                    // onChange={(e) => {
                    //   Firebase.firestore()
                    //     .collection("todos")
                    //     .doc(item.id)
                    //     .update({
                    //       completed: "false",
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

export default CompletedList;
