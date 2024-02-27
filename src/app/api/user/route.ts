import bcrypt from "bcryptjs";
import prisma from "@/libs/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          hashedPassword: hashedPassword,
        },
      });
      return NextResponse.json({ newUser: newUser });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      error: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Error getting user" });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      currentUser
        ? {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
          }
        : "usuario nao encontrado"
    );
  } catch (error) {
    return NextResponse.json({ message: "Error getting user" , error});
  }
}
