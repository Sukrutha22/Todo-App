import { Paper } from "@mui/material";
import React, { useContext } from "react";
import TaskList from "./TaskList";
import Calender from "./Calender";
import { TodoContext } from "./Home";

function Active() {
  const { todoList } = useContext(TodoContext);
  const list = todoList.some((item) => item.completed === "false");

  return (
    <Paper className="todo-container" elevation={24} square>
      <Calender/>
      <TaskList list={list} completed="false" completedToggle="true" />
    </Paper>
  );
}

export default Active;
