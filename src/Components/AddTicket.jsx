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

function AddTicket() {
    
  const [todo, setTodo] = useState("");
  const { setTodoListEdit } = useContext(TodoContext);
  const today = new Date();
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(today.toDateString());
  }, [todo]);

  const addTodo = (e) => {
    e.preventDefault();
    Firebase.auth().onAuthStateChanged((user) => {
      Firebase.firestore().collection("todos").add({
        text: todo,
        completed: "false",
        date: date,
        assignorId: user.uid,
        assigneeId: assigneeId,
      });
    });
  };

  const [assigneeId, setAssigneeId] = useState("");
  const [assigneeList, setAssigneeList] = useState([]);
  useEffect(() => {
    Firebase.firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        const allAssignee = snapshot.docs.map((item) => {
          return (
            item.data().role === "Engineer" && {
              assigneeId: item.data().id,
              assigneeName: item.data().username,
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
              setTodoListEdit((prevState) => !prevState.todoListEdit)
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
