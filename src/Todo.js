import React from 'react'

export default function Todo({todo , toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
  return (
    <div onClick={handleTodoClick} className="todo">
        <label>
            <input type="checkbox" checked={todo.complete}  />
        </label>
        <p>{todo.name}</p>
    </div>
  )
}
