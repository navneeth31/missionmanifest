import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div 
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo._id} onClick={() => completeTodo(todo._id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <MdDelete
          onClick={() => removeTodo(todo._id)}
          className='delete-icon'
        />
        <FiEdit
          onClick={() => setEdit({ id: todo._id, value: todo.text })}
          className='edit-icon'
        />
        
      </div>
    </div>
  ));
};

export default Todo;