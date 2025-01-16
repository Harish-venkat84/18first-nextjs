import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  try {
    await connect();
    const posts = await Post.find(username && { username });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
};

export const POST = async (request) => {
  const body = request.json();

  const newPost = new Post(await body);

  try {
    await connect();
    await newPost.save();
    return NextResponse.json({ message: "post created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "An unknown error occurred" }, { status: 500 });
  }
};
