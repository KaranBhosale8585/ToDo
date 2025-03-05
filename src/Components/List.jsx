import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const List = ({ items, handleDelete, handleCheck, handleEdit }) => {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h3>
      </div>
      <hr className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          {items.filter((item) => !item.completed).length} tasks left
        </span>
      </div>

      {/* Check if there are no tasks */}
      {items.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-200 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheck(item.id)}
                  className="h-5 w-5 cursor-pointer"
                  aria-label={`Mark ${item.text} as completed`}
                />
                <span
                  className={`${
                    item.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  } flex`}
                >
                  {item.text}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="text-blue-500 hover:text-blue-600 transition cursor-pointer"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-600 transition cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default List;
