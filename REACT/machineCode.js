///+++++++++++++++++++++++++++++++CReate Todo App++++++++++++++++++++++++++++++++++++++

import React, { useState } from "react";
import { Edit } from "lucide-react";
import { Delete } from "lucide-react";

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (editId) {
        // If editing, update the specific todo
        const updatedTodos = todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputValue } : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
      } else {
        // If not editing, add a new todo
        const newTodo = { id: Date.now(), text: inputValue }; // Unique ID for each todo
        setTodos([...todos, newTodo]);
      }
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (item) => {
    setInputValue(item.text);
    setEditId(item.id);
  };

  return (
    <div className="flex justify-center p-5 bg-red-400">
      <div>
        <h1 className="text-center text-lg font-semibold">Todo</h1>
        <form onSubmit={handleSubmit} className="flex justify-center gap-3">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a todo"
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-green-600 rounded-md px-3 py-2 text-white"
          >
            {editId ? "Update" : "Submit"}
          </button>
        </form>
        <div className="mt-5">
          {todos.map((item) => (
            <ul key={item.id} className="list-none">
              <li className="flex justify-between items-center bg-white p-2 mb-2 rounded-md shadow-md">
                <span>{item.text}</span>
                <div className="flex gap-2">
                  <Edit
                    className="cursor-pointer"
                    onClick={() => handleEdit(item)}
                  />
                  <Delete
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
