import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Todo from "@/models/TodoModel";

export async function POST(request) {
  try {
    await connectDB();
    const { title, userId } = await request.json();

    const newTodo = new Todo({ title, userId, check: false });
    await newTodo.save();

    return NextResponse.json(
      { message: "Todo created successfully!", todo: newTodo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json(
      { message: "Failed to add todo" },
      { status: 500 }
    );
  }
}
