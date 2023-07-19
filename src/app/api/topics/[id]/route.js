import connectMONGODB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMONGODB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json("Topic updated successfully", { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMONGODB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
