import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList.js";
import { useState, useRef, useEffect } from "react";
import './App.css';

const LOCAL_STORAGE_KEY = "todoApptodos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((storedTodos) => {
      return [...storedTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="App">
        <div className="App-header">
          <h1>Todoest</h1>
          <small style={{fontSize:'10px'}}>A tiny TodoList</small>
        <div className="Todo-card">
            <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <input ref={todoNameRef} type="text" />
        <div className="button">
            <button onClick={handleAddTodo} className="primary">Add Todos</button>
            <button onClick={handleClearTodo} className="danger">Clear Todos</button>
        </div>
        <div>{todos.filter((todo) => !todo.complete).length} Left Todos</div>
        </div>
    </div>
  );
}

export default App;
