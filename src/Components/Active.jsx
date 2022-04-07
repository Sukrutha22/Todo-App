import { Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TaskList from "./TaskList";
import Calendar from "./Calendar";
import { TodoContext } from "./Home";

function Active() {
  const { todoList } = useContext(TodoContext);
  const list = todoList.some((item) => item.completed === "false");
  const [activeList, setActiveList] = useState([]);

  useEffect(() => {
    console.log(list);
    console.log(todoList);
    setActiveList(todoList.filter((item) => item.completed === "false"));
  }, [todoList]);

  return (
    <Paper className="todo-container" elevation={24} square>
      <Calendar />
      <TaskList list={list} taskList={activeList} completedToggle="true" />
    </Paper>
  );
}

export default Active;
