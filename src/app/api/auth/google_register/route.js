import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password, googleUserId, googleProfileImage } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields (name, email, password) are required" }, { status: 400 });
  }

  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "user login successfully" }, { status: 201 });
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
      googleUserId,
      googleProfileImage,
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
