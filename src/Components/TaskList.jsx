import React, { useContext, useEffect } from "react";
import {
  List,
  Typography,
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import Firebase from "../firebaseConfig";
import { TodoContext } from "./Home";

function TaskList({ list, taskList, completedToggle }) {
  const { userRole } = useContext(TodoContext);
  const { setTodoListEdit, todoMonth } = useContext(TodoContext);
  const taskNumber = taskList.length;

  return (
    <List sx={list ? null : { justifyContent: "center" }}>
      <Typography
        variant="subtitle1"
        component="div"
        sx={list ? { alignSelf: "flex-start", my: "10px" } : null}
      >
        {list ? `${taskNumber} Tasks` : "No Tasks Yet"}
      </Typography>
      <div className="list-items">
        {taskList.map((item, index) => {
          return (
            <ListItem key={item.text} className="todo-item" sx={{ pr: "5px" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <Checkbox
                  defaultChecked={item.completed === "true"}
                  color={item.completed === "true" ? "default" : "primary"}
                  onChange={(e) => {
                    Firebase.database().ref(`${todoMonth}/${item.id}`).update({
                      completed: completedToggle,
                    });
                    setTodoListEdit((prevState) => !prevState.todoList);
                  }}
                />
              </ListItemIcon>
              <div className="todo-content">
                <Typography
                  variant="h6"
                  color={item.completed === "true" ? "GrayText" : "black"}
                  style={{
                    textDecoration:
                      item.completed === "true" ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.date}
                </Typography>
              </div>
              <ListItemIcon>
                <IconButton
                  aria-label="delete"
                  sx={{ justifyContent: "center" }}
                  disabled={userRole === "Engineer"}
                  onClick={(e) => {
                    Firebase.database().ref(`${todoMonth}/${item.id}`).remove();
                    setTodoListEdit((prevState) => !prevState.todoList);
                  }}
                >
                  <DeleteOutlined
                    color={
                      userRole === "Lead" && item.completed === "false"
                        ? "primary"
                        : "dark"
                    }
                  />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          );
        })}
      </div>
    </List>
  );
}

export default TaskList;
