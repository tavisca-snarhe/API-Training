const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Todo = require('./app/models/todos.model.js');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



app.get('/todos', (req, res) => {
    Todo.find()
    .then(todos => {
        res.send(todos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
});

app.post('/todo', (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            message: "Todo must have title"
        });
    }
    const todo = new Todo({
        title: req.body.title || "Untitled Todo", 
        completed: req.body.completed || false
    });

    todo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
});

app.put('/todo/:id', (req, res) => {
    if(!req.body.todo) {
        return res.status(400).send({
            message: "Must contain todo."
        });
    }

    Todo.findByIdAndUpdate(req.params.id, {
        title: req.body.todo.title || "Untitled Todo",
        completed: req.body.todo.completed
    }, { new: true })
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.id
            });
        }
        res.send(todo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating todo with id " + req.params.id
        });
    });
});

app.delete('/todo/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.id
            });
        }
        res.send({message: "Todo deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete todo with id " + req.params.id
        });
    });
});

app.listen(8009, () => {
    console.log("Server is listening on port 8009");
});