import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Todo from "@/models/TodoModel";

export async function PATCH(request) {
  try {
    await connectDB();
    const { id, title, check } = await request.json();

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, check },
      { new: true }
    );

    return NextResponse.json(
      { message: "Todo updated successfully!", todo: updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { message: "Failed to update todo" },
      { status: 500 }
    );
  }
}
