"use client";

import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Loader, Edit, Trash, Plus, Save } from "lucide-react";

const List = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);
  const [data, setData] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) {
      toast.error("Not Logged in");
      return;
    }
    fetchItems();
  }, [session, status]);

  const fetchItems = async () => {
    const userId = session.user.email;
    const response = await fetch("/api/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      toast.error("Failed to fetch items");
      return;
    }

    const data = await response.json();
    if (!data.todos || data.todos.length === 0) {
      toast.error("No items found");
    } else {
      setItems(data.todos);
    }
  };

  const handleCheck = async (id, checked) => {
    const newCheckState = checked;

    try {
      const response = await fetch("/api/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, check: newCheckState }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const data = await response.json();

      toast.success(data.message);

      if (!data || !data.todo) {
        toast.error("Failed to fetch updated todo");
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, check: newCheckState } : item
        )
      );
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    }
  };

  const handleAddItem = async () => {
    if (!data.trim()) {
      toast.error("Please enter a todo title");
      return;
    }

    const response = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.email, title: data }),
    });

    if (!response.ok) {
      toast.error("Failed to add item");
      return;
    }

    toast.success("Todo added successfully!");
    setData("");
    fetchItems();
  };

  const handleDelete = async (id) => {
    const response = await fetch("/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      toast.error("Failed to delete item");
      return;
    }
    toast.success("Todo deleted successfully!");
    const data = await response.json();

    if (!data.todos) {
      setItems([]);
      return;
    }

    setItems(data.todos);

    fetchItems();
  };

  const handleStartEdit = (id, currentTitle) => {
    setIsEdit(true);
    setEditId(id);
    setData(currentTitle);
  };

  const handleEdit = async (id) => {
    if (!data.trim()) {
      toast.error("Please enter a todo title");
      return;
    }
    try {
      const response = await fetch("/api/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, title: data }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      const updatedData = await response.json();
      toast.success(updatedData.message);

      fetchItems();
      setData("");
      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    }
  };


  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader className="animate-spin text-gray-600" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isEdit ? "Edit Todo" : "Add a New Todo"}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEdit ? handleEdit() : handleAddItem();
        }}
        className="space-y-4"
      >
        <div>
          <input
            id="todo"
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Enter todo..."
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 space-x-2 text-base"
        >
          {isEdit ? <Save size={20} /> : <Plus size={20} />}
          <span>{isEdit ? "Update" : "Add"}</span>
        </button>
      </form>
      <Toaster />

      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Todo List
      </h1>
      <ul className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">No items in list</p>
        ) : (
          items.map((item, index) => (
            <li
              key={index}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg shadow-sm border
        ${
          item.check
            ? "bg-green-100 text-green-700 border-green-300"
            : "bg-yellow-100 text-yellow-700 border-yellow-300"
        }
        hover:scale-[1.02] transition-all duration-300 space-y-2 sm:space-y-0`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={item.check}
                  onChange={(e) => handleCheck(item._id, e.target.checked)}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span
                  className={`font-semibold text-lg ${
                    item.check ? "line-through text-gray-500" : ""
                  }`}
                >
                  {item.title}
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 text-sm"
                  onClick={() => handleStartEdit(item._id, item.title)}
                >
                  <Edit size={18} />
                  <span>Edit</span>
                </button>
                <button
                  className="text-red-600 hover:text-red-800 flex items-center space-x-1 text-sm"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <Toaster />
    </div>
  );
};

export default List;
