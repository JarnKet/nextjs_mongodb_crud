import connectMONGODB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMONGODB();
  await Topic.create({ title, description });
  return NextResponse.json(
    { message: "Topic created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMONGODB();
  const topics = await Topic.find({});
  return NextResponse.json({ topics }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMONGODB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Topic deleted successfully" },
    { status: 200 }
  );
}
