import React, { useRef, useState } from "react";
import "./Todo.css"; 

const Todo = () => {

  const myRef = useRef();
  const [state, setState] = useState([]);
  const [editStates, setEditStates] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    const data = e.target.todo.value;
    setState([...state, data]);
    setEditStates([...editStates, false]);
    e.target.reset();
  };

  const onDelete = (id) => {
    const filteredArray = state.filter((item, index) => index !== id);
    setState(filteredArray);
  };

  const save = (id) => {
    const newdata = myRef.current.value;
    const newState = [...state];
    newState[id] = newdata;
    setState(newState);
    setEditStates((prevStates) =>
      prevStates.map((state, index) => (index === id ? false : state))
    );
  };


  const toggleEdit = (id) => {
    setEditStates((prevStates) =>
      prevStates.map((state, index) => (index === id ? !state : state))
    );
  };


  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form className="todo-form" onSubmit={addTodo}>
        <input type="text" placeholder="Enter your task..." id="todo" />
        <button type="submit" id="add">Add</button>
      </form>
      <div>
        {state.map((item, index) =>
          editStates[index] === false ? (
            <div key={index} className="todo-item">
              <span>{item}</span>
              <button className="delete-button" onClick={() => onDelete(index)}>
                Delete
              </button>
              <button className="edit-button" onClick={() => toggleEdit(index)}>
                Edit
              </button>
            </div>
          ) : (
            <div key={index} className="edit-item">
              <input
                type="text"
                placeholder={item}
                id="edit"
                ref={myRef}
                defaultValue={item}
              />
              <button className="save-button" onClick={() => save(index)}>
                Save
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Todo;
