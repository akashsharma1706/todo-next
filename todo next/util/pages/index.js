// pages/index.js

import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('/api/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error('Error fetching todos:', err));
    }, []);

    const handleAddTodo = async () => {
        await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newTodo }),
        });
        setNewTodo('');
        // Refresh the todo list after adding a new todo
        const updatedTodos = await fetch('/api/todos').then(res => res.json());
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>{todo.text}</li>
                ))}
            </ul>
            <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    );
};

export default TodoList;
