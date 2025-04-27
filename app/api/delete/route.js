import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Todo from "@/models/TodoModel";

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();

    await Todo.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Todo deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { message: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
