import React from "react";
import "./styles/Todo.css";

const Todo = ({ todo, completeTodo, removeTodo }) => {
    return (
      <div
        className="task"
        style={{ textDecoration: todo.completed ? "line-through" : "" }}
      >
        {todo.title}
  
        <button onClick={() => removeTodo(todo._id)}>
        ❌
        </button>
        <button onClick={() => completeTodo(todo)}>✔️</button>
      </div>
    );
  }

export default Todo;