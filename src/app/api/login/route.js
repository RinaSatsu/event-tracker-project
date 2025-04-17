import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json({ error: "User does not exist" }, { status: 401 });

    const hashedPass = crypto.pbkdf2Sync(password, user.salt, 100000, 64, "sha512").toString("hex");

    if (hashedPass !== user.password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Login successful", user: { id: user.id, username: user.username } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to authenticate user" }, { status: 500 });
  }
}