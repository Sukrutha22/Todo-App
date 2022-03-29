
import { useEffect, useState } from 'react';
import './App.css';

function App() {
const [todo, setTodo] = useState('')
const [todoList, setTodoList] = useState([])

const addTodo = () =>{
  setTodoList([...todoList, {id: Date.now(), text: todo, status: 'true'}])
}

useEffect(()=>{
  console.log(todo)
  console.log(todoList)
})
  return (
    <div className="App">
      <div className="todo-container">
        <div className="text-input">
          <input onChange={(e) => setTodo(e.target.value)} type="text" placeholder='Add todo'/>
          <button onClick={()=>{addTodo()}}>
            <i className='fa fa-plus'></i>
          </button>
        </div>
        <div className={todoList ? "todo-list" : "display-none"}>
          <ul>

            {todoList.map((item)=>{
              if (item.status==='true'){
                return(
                  <li>
                  <div className="todo-item">
                    <div className='todo-content'>
                    <p className='todo-text'>{item.text}
                    </p>
                    <p className='todo-date'>{item.id}</p>
                    </div>
                   
                    <i className='fa fa-minus	' 
                      onClick={(e) =>{
                        item.status='false'
                        setTodoList(todoList.filter(obj=>{
                          if (obj.id === item.id){
                            obj.status='false'
                          }
                          return obj;
                        }))

                      }}
                      value={item.status}
                    ></i>
                  </div>
                </li>
                )
              }
              return null
            })}
           
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;