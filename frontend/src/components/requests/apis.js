import { backend_url } from '../../configs/config';

const getTodos = () => 
    new Promise((resolve, reject) => {
        fetch(`${backend_url}/todos`, { method: 'GET' }).then(data => {
            return data.json();
        }).then(todos => {
            resolve(todos);
        }).catch(err => {
            reject(err);
        })
    });

const addTodo = (todo) =>
    new Promise((resolve, reject) => {
        const options = { 
            method: "POST", 
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({	
                title: todo.title,
                completed: todo.completed
            }) 
        };
        console.log(options);
        fetch(`${backend_url}/todo`, options)
        .then(data => {
            return data.json();
        })
        .then(todo => {
            console.log("done", todo);
            resolve(todo);
        })
        .catch(err => {
            console.log("error foud");
            reject(err);
        })
    }); 

const updateTodo = (todo, id) =>
    new Promise((resolve, reject) => {
        fetch(`${backend_url}/todo/${id}`, { 
            method: 'PUT', 
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({	
                todo: todo
            })
        })
        .then(data => {
            return data.json();
        })
        .then(todo => {
            resolve(todo);
        })
        .catch(err => {
            reject(err);
        })
    }); 

const deleteTodo = (id) =>
    new Promise((resolve, reject) => {
        fetch(`${backend_url}/todo/${id}`, { 
            method: 'DELETE'
        })
        .then(data => {
            return data.json();
        })
        .then(todo => {
            resolve(todo);
        })
        .catch(err => {
            reject(err);
        })
    }); 

const Todos = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}

export default Todos;