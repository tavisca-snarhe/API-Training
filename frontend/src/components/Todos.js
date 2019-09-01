import React, { useState, useEffect } from "react";
import "./styles/Todo.css";
import TodosAPI from "./requests/apis";
import Todo from "./Todo";
import CreateTodo from "./TodoForm";

const Todos = () => {

  const [todosRemaining, setTodosRemaining] = useState(0);
  const [todos, setTodos] = useState([]);

  const getTodosFromAPI = async () => {
    const todos = await TodosAPI.getTodos();
    setTodos(todos);
  }

  useEffect(() => {
    getTodosFromAPI();
  }, []);

  useEffect(() => {
    setTodosRemaining(todos.filter(todo => !todo.completed).length);
  });

  const addTodo = async (title) => {
    await TodosAPI.addTodo({ title, completed: false });
    await getTodosFromAPI();  
  };

  const completeTodo = async (todo) => {
    await TodosAPI.updateTodo({title: todo.title, completed: true}, todo._id);
    await getTodosFromAPI();
  };

  const removeTodo = async (id) => {
    await TodosAPI.deleteTodo(id);
    await getTodosFromAPI();
  };

  return (
    <div className="todo-container">
      <div className="header">Pending todos ({todosRemaining})</div>
      <div className="tasks">
        {todos.map((todo, index) => (
          <Todo
            todo={todo}
            index={index}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            key={index}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTodo addTodo={addTodo} />
      </div>
    </div>
  );
}

export default Todos;
