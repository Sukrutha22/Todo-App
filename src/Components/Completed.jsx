import { Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TaskList from "./TaskList";
import Calender from "./Calendar";
import { TodoContext } from "./Home";

function Completed() {
  const { todoList } = useContext(TodoContext);
  const list = todoList.some((item) => item.completed === "true");
  const [completeList, setCompleteList] = useState([]);

  useEffect(() => {
    console.log(list);
    setCompleteList(todoList.filter((item) => item.completed === "true"));
  }, [todoList]);

  return (
    <Paper className="todo-container" elevation={24} square>
      <Calender />
      <TaskList list={list} taskList={completeList} completedToggle="false" />
    </Paper>
  );
}

export default Completed;
