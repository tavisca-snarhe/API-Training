import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodosAPI from "./requests/apis";

function Todo({ todo, completeTodo, removeTodo }) {
  return (
    <div
      className="task"
      style={{ textDecoration: todo.completed ? "line-through" : "" }}
    >
      {todo.title}

      <button style={{ background: "red" }} onClick={() => removeTodo(todo._id)}>
        X
      </button>
      <button onClick={() => completeTodo(todo)}>Complete</button>
    </div>
  );
}

function CreateTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new todo"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function Todos() {
  const [todosRemaining, setTodosRemaining] = useState(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    TodosAPI.getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTodosRemaining(todos.filter(todo => !todo.completed).length);
  });

  const addTodo = async title => {
    TodosAPI.addTodo({ title, completed: false })
      .then(d => {
        TodosAPI.getTodos()
          .then(data => {
            setTodos(data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  };

  const completeTodo = todo => {
    TodosAPI.updateTodo({title: todo.title, completed: true}, todo._id)
      .then(d => {
        TodosAPI.getTodos()
          .then(data => {
            setTodos(data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  };

  const removeTodo = id => {
    TodosAPI.deleteTodo(id)
      .then(d => {
        TodosAPI.getTodos()
          .then(data => {
            setTodos(data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
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
