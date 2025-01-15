import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = await params;
    await connect();
    const post = await Post.findById(id);
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { id } = await params;
    await connect();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};
