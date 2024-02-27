import prisma from "@/libs/prismadb";
import { authOptions } from "@/@utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "No session found." });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser?.id) {
      return NextResponse.json({ message: "No user found." });
    }

    const task = await prisma.task.create({
      data: { ...body, userId: currentUser.id },
    });

    return NextResponse.json({ task, status: 201 });
  } catch (error) {
    console.log("ERROR CREATING TASK: " + error);
    return NextResponse.json({ message: "Error creating task", status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "No session found." });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser?.id) {
      return NextResponse.json({ message: "No user found." });
    }

    const userTasks = await prisma.task.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return NextResponse.json({ tasks: userTasks });
  } catch (error) {
    console.log("ERROR GETTING TASK: " + error);
    return NextResponse.json({ message: "Error getting task", status: 500 });
  }
}
