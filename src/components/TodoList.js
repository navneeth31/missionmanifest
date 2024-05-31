import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const base_url = 'http://localhost:5000/user-api';

const fetchTodoList = async (setTodos) => {
  try {
    let username = localStorage.getItem('username');
    const response = await axios.get(base_url + '/gettodos/' + username);
    setTodos(response.data.todos);
  } catch (error) {
    toastMsg('error', 'Error fetching todo list: ' + error);
  }
};

const toastMsg = (type, msg) => {
  const uniqObject = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  if (type === 'success') {
    toast.success(msg, uniqObject);
  } else if (type === 'error') {
    toast.error(msg, uniqObject);
  }  else if (type === 'warn') {
    toast.warn(msg, uniqObject);
  } else {
    toast.info(msg, uniqObject);
  }
  
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  let username = localStorage.getItem('username');
  useEffect(() => {
    // Fetch the todo list when the component is mounted
    fetchTodoList(setTodos);
  }, []); 

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      toastMsg('error', 'Please provide valid Todo title');
      return;
    }
    todo.username = username;
    todo.isComplete = false;
    //http post req
    axios.post(base_url + '/add-todo',todo)
    .then(response=>{
      if (response.data.message === 1) {
        toastMsg('success', 'Todo item added successfully');
      } if (response.data.message === 2) {
        toastMsg('warn', 'Todo item already exist');
      } if (response.data.message === 0) {
        toastMsg('error', 'Error adding Todo item. Please try again');
      }
      fetchTodoList(setTodos);
    })
    .catch(error=>{
      toastMsg('error', 'Something went wrong while removing item');
    });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      toastMsg('error', 'Please provide valid Todo title');
      return;
    }
    //http post req
    axios.post(base_url + '/update-todo/' + todoId, newValue)
    .then(response=>{
      toastMsg('success', 'Todo item updated successfully');
      fetchTodoList(setTodos);
    })
    .catch(error=>{
      toastMsg('error', 'Something went wrong while removing item');
    });
  };

  const removeTodo = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(base_url + '/delete-todo/' + id)
        .then(response=>{
          toastMsg('error', 'Todo Item deleted successfully');
          fetchTodoList(setTodos);
        })
        .catch(error=> {
          toastMsg('error', 'Something went wrong while removing item');
        });
      }
    });
  };

  const completeTodo = id => {
    let clickedInfo = {
      isComplete: false
    };
    todos.map(todo => {
      if (todo._id === id) {
        todo.isComplete = !todo.isComplete;
        clickedInfo.isComplete = todo.isComplete;
      }
      return todo;
    });
    //http post req
    axios.post(base_url + '/update-todo/' + id, clickedInfo)
    .then(response=>{
      toastMsg((clickedInfo.isComplete ? 'success' : 'warn'), 'Todo item marked as ' + (clickedInfo.isComplete ? 'completed' : 'uncompleted'));
      fetchTodoList(setTodos);
    })
    .catch(error=>{
      toastMsg('error', 'Something went wrong while removing item');
    });
  };

  return (
      <>
      <h1 className="heading ">Today's Todo List</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;