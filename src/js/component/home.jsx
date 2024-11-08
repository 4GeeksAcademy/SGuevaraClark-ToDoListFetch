import React from "react";
import { useEffect, useState } from 'react';
import './../../styles/index.css';

const Home = () => {
  const url = 'https://playground.4geeks.com/todo';
  const [userData, setUserData] = useState([]);
  const [tarea, setTarea] = useState('');

  const crearUsuario = async () => {
    try {
      const response = await fetch(url + '/users/sebas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Something went wrong!');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    crearUsuario()
    getUserData()
  }, [])

  const getUserData = async () => {
    try {
      const response = await fetch(url + '/users/sebas');
      if (!response.ok) throw new Error('Something went wrong!');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error)
    }
  }

  const crearTarea = async () => {
    try {
      const payload = {
        label: tarea,
        is_done: false
      }
      const response = await fetch(url + '/todos/sebas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Something went wrong!');
      const data = await response.json();
      console.log(data);
      getUserData();
      setTarea('');
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    crearTarea();
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(url + '/todos/' + id, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Something went wrong!');
      getUserData();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <div className="todo-wrapper">
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={tarea}
            onChange={e => setTarea(e.target.value)}
            placeholder="Enter new task"
            className="todo-input"
            required
          />
          <button type='submit' className="add-button">
            Add Task
          </button>
        </form>

        <ul className="todo-list">
          {userData.todos?.map(element => (
            <li key={element.id} className="todo-item">
              <span className="todo-text">{element.label}</span>
              <button
                onClick={() => handleDelete(element.id)}
                className="delete-button"
                aria-label="Delete task"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
