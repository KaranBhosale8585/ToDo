import React from "react";
import { FaSave } from "react-icons/fa";

const AddItem = ({ input, setInput, addTask }) => {
  return (
    <form
      className="flex flex-col sm:flex-row gap-2 mb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        value={input}
        placeholder="Enter task..."
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        onClick={addTask}
        className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
        aria-label="Add Task"
      >
        <FaSave className="mr-2" /> Save
      </button>
    </form>
  );
};

export default AddItem;
