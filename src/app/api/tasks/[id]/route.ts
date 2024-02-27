import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = params;

    const taskToUpdate = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!id || !taskToUpdate) {
      return NextResponse.json({ message: "Cannot get a task to update." });
    }

    await prisma.task.update({
      where: {
        id: taskToUpdate.id,
      },
      data: { ...body },
    });

    return NextResponse.json({
      message: "Task successfully updated.",
      status: 201,
    });
  } catch (error) {
    console.log("ERROR UPDATING TASK: " + error);
    return NextResponse.json({ message: "Error updating task", status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const taskToDelete = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!id || !taskToDelete?.id) {
      return NextResponse.json({
        message: "Cannot get a task to delete.",
      });
    }

    await prisma.task.delete({
      where: {
        id: taskToDelete.id,
      },
    });

    return NextResponse.json({
      message: "Task successfully deleted.",
      status: 204,
    });
  } catch (error) {
    console.log("ERROR DELETING TASK: " + error);
    return NextResponse.json({ message: "Error deleting task", status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const taskToPatch = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!id || !taskToPatch) {
      return NextResponse.json({
        message: "Cannot get a task to change status.",
      });
    }

    await prisma?.task.update({
      where: {
        id: taskToPatch.id,
      },
      data: {
        isCompleted: !taskToPatch.isCompleted,
      },
    });

    return NextResponse.json({
      message: "Task successfully updated.",
      status: 204,
    });
  } catch (error) {
    console.log("ERROR PATCHING TASK: " + error);
    return NextResponse.json({ message: "Error deleting task", status: 500 });
  }
}
