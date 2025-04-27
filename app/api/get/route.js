import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Todo from "@/models/TodoModel";

export async function POST(request) {
  try {
    await connectDB();
    const { userId } = await request.json();

    const todos = await Todo.find({ userId }).sort({ createdAt: -1 }); // latest first
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { message: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}
