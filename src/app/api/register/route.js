import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');

  return { hash, salt };
}

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    console.log("Incoming user data:", { username, email, password });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json({ error: "User already exists" }, { status: 409 });

    const { hash, salt } = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        salt
      },
    });

    return NextResponse.json({ message: `User ${newUser} created` }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}