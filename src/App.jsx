import AddItem from "./Components/AddItem";
import List from "./Components/List";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import React from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("ToDoList");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.log("Error reading from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ToDoList", JSON.stringify(items));
  }, [items]);

  const addTask = () => {
    if (input.trim() !== "") {
      setItems([...items, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleCheck = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleEdit = (id) => {
    const editedItem = items.find((item) => item.id === id);
    setInput(editedItem.text);
    handleDelete(id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        React To-Do
      </h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Routes>
          <Route
            path="/"
            element={
              <AddItem input={input} setInput={setInput} addTask={addTask} />
            }
          />
        </Routes>
        <List
          items={items}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
