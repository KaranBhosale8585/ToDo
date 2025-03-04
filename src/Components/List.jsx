import React from "react";
import { FaTrash } from "react-icons/fa";

const List = ({ items, handleDelete, handleCheck }) => {
  return (
    <main>
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
                className="h-5 w-5"
              />
              <span
                className={`${
                  item.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {item.text}
              </span>
            </div>
            <button
              className="text-red-500 hover:text-red-700 transition"
              onClick={() => handleDelete(item.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default List;
