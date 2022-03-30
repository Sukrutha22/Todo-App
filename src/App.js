import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([0]);
  const [date, setDate] = useState("");

  const addTodo = () => {
    setTodoList([...todoList, { id: Date.now(), text: todo, status: "true" }]);
  };

  useEffect(() => {
    const today = new Date()
    setDate(today.toDateString());
  }, [todo]);

  return (
    <div className="App">
      <div className="todo-container">
        <div className="text-input">
          <input
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder="Add todo"
          />
          <button
            onClick={() => {
              addTodo();
            }}
          >
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="todo-list">
          <ul>
            {todoList.map((item) => {
              if (item.status === "true") {
                return (
                  <li>
                    <div className="todo-item">
                      <div className="todo-content">
                        <p className="todo-text">
                          <b>{item.text}</b>
                        </p>
                        <p className="todo-date">{date}</p>
                      </div>

                      <i
                        className="fa fa-minus	"
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
                      ></i>
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;