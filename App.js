import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import Footer from "./MyComponents/Footer";
import AddTodo from "./MyComponents/AddTodo";



function App() {
  // ✅ Load from localStorage initially
  const initTodo = () => {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  };

  const [todos, setTodos] = useState(initTodo);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ Add Todo
  //const addTodo = (title, desc) => {
  //  let sno = todos.length > 0 ? todos[todos.length - 1].sno + 1 : 1;
   // const newTodo = { sno: sno, title: title, desc: desc };
   // setTodos([...todos, newTodo]);
  //};

  const addTodo = (title, desc) => {
  const sno = todos.length > 0 ? todos[todos.length - 1].sno + 1 : 1;
  const newTodo = { sno, title, desc, completed: false }; // ✅ completed default false
  setTodos([...todos, newTodo]);
};

  // ✅ Delete Todo
  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
  };

  // ✅ Search filter
  //const filteredTodos = todos.filter((todo) =>
   // todo.title.toLowerCase().includes(searchQuery.toLowerCase())
 // );

  const filteredTodos = todos
  .filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => a.completed - b.completed); // ✅ unfinished first

  // ✅ Edit Todo
//const editTodo = (sno, updatedTitle, updatedDesc) => {
//  const updatedTodos = todos.map((todo) =>
//    todo.sno === sno ? { ...todo, title: updatedTitle, desc: updatedDesc } : todo
//  );
//  setTodos(updatedTodos);
//}; 

const toggleComplete = (sno) => {
  const updatedTodos = todos.map((todo) =>
    todo.sno === sno ? { ...todo, completed: !todo.completed } : todo
  );
  setTodos(updatedTodos);
};

const editTodo = (sno, updatedTitle, updatedDesc) => {
  const updatedTodos = todos.map((todo) =>
    todo.sno === sno ? { ...todo, title: updatedTitle, desc: updatedDesc } : todo
  );
  setTodos(updatedTodos);
};

  return (
    <>
      <Header title="My Todos List" searchBar={true} setSearchQuery={setSearchQuery} />
      <AddTodo addTodo={addTodo} />
     <Todos 
  todos={filteredTodos} 
  searchQuery={searchQuery} 
  onDelete={onDelete} 
  onEdit={editTodo} 
  toggleComplete={toggleComplete}
/></>
  );
}

export default App;
