import React, { useContext } from "react";
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

function TaskList({ list, completed, completedToggle }) {
  const { todoList, userRole } = useContext(TodoContext);
  const { setTodoListEdit } = useContext(TodoContext);

  return (
    <List sx={list ? "" : { justifyContent: "center" }}>
      <Typography
        variant="subtitle1"
        component="div"
        sx={list ? { alignSelf: "flex-start", ml: "35px" } : null}
      >
        {list ? "12 Tasks" : "No Tasks Yet"}
      </Typography>
      <div className="list-items">
      {todoList.map((item) => {
        if (item.completed === completed) {
          return (
            
            <ListItem key={item.text} className="todo-item" sx={{pr: "5px"}}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <Checkbox 
                defaultChecked={completed === "true"}
                color={completed==="true" ? "default" : "primary"}
                  onChange={(e) => {
                    Firebase.database().ref(`todos/${item.id}`).update({
                      completed: completedToggle,
                    });
                    setTodoListEdit((prevState) => !prevState.todoListEdit);
                  }}
                />
              </ListItemIcon>
              <div className="todo-content">
                <Typography variant="h6"  color={completed==="true" ? "GrayText" : "black"} style={{textDecoration: completed==="true" ? "line-through" : "none"}} >
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
                    Firebase.database().ref(`todos/${item.id}`).remove();
                    setTodoListEdit((prevState) => !prevState.todoListEdit);
                  }}
                >
                  <DeleteOutlined
                    color={(userRole === "Lead" && completed==="false") ? "primary" : "dark"}
                  />
                </IconButton>
              </ListItemIcon>
            </ListItem>
            
          );
        }
        return null;
      })}
      </div>
    </List>
  );
}

export default TaskList;
