import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Firebase from "../firebaseConfig";
import { TodoContext } from "./Home";
import "../App.css";
import moment from 'moment';


function AddTicket() {
  const [todo, setTodo] = useState("");
  const { setTodoListEdit, usersRef, todoMonth } = useContext(TodoContext);
  const Time = moment().format("hh:mm A");
  const Date = moment().format("L")
  
  const [time, setDate] = useState("");
  const [createdOn, setCreatedOn] = useState("")
  useEffect(() => {
    setDate(Time);
    setCreatedOn(Date)
  }, [todo]);

  const addTodo = (e) => {
    e.preventDefault();
    Firebase.auth().onAuthStateChanged((user) => {
      Firebase.database().ref(todoMonth).push({
        text: todo,
        completed: "false",
        time: time,
        assignorId: user.uid,
        assigneeId: assigneeId,
        createdOn: createdOn
      });
    });
    setTodo('')
    setAssigneeId('')
  };

  const [assigneeId, setAssigneeId] = useState("");
  const [assigneeList, setAssigneeList] = useState([]);

  useEffect(() => {
    usersRef.on("value", (snapshot) => {
      const users = snapshot.val();
      const usersList = [];
      for (let id in users) {
        usersList.push({ ...users[id] });
      }
      const allAssignee = usersList.map((item) => {
        return (
          item.role === "Engineer" && {
            assigneeId: item.id,
            assigneeName: item.username,
          }
        );
      });
      setAssigneeList(allAssignee);
    });
  }, []);

  return (
    <div className="ticket-container">
      <Paper elevation={10} sx={{ width: 1 / 2 }}>
        <form className="text-input" onSubmit={addTodo}>
          <TextField
            required
            id="outlined-basic"
            label="Add Ticket"
            value={todo}
            variant="outlined"
            sx={{ width: 4.5 / 10 }}
            onChange={(e) => setTodo(e.target.value)}
          />
          <FormControl required sx={{ width: 4.5 / 10, textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assigneeId}
              label="Assigned To"
              onChange={(e) => setAssigneeId(e.target.value)}
            >
              {assigneeList.map((item) => {
                if (item) {
                  return (
                    <MenuItem key={item.assigneeId} value={item.assigneeId}>
                      {" "}
                      {item.assigneeName}{" "}
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Select>
          </FormControl>
          <Fab
            type="submit"
            color="primary"
            aria-label="add"
            onClick={(e) =>
              setTodoListEdit((prevState) => !prevState.todoList)
            }
          >
            <AddIcon />
          </Fab>
        </form>
      </Paper>
    </div>
  );
}

export default AddTicket;
