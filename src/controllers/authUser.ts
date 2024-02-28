import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

const prisma = new PrismaClient();

require("dotenv").config();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function authUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please enter all the fields" });
      return;
    }

    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({ error: "Please give valid input" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    if (!existingUser) {
      res.status(400).json({ error: "Please signup first" });
      return;
    }

    // Check if JWT_SECRET is defined before using it
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret not provided");
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res
      .status(201)
      .json({ _id: existingUser.id, email: existingUser.email, token });
  } catch (error) {
    next(error);
  }
}
