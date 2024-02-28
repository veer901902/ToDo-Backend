import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import z from "zod";

const prisma = new PrismaClient();

require("dotenv").config();

const todoSchema = z.object({ title: z.string(), description: z.string() });

export default async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: "Please enter all the fields" });
      return;
    }

    const parsedData = todoSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({ error: "Please give valid input" });
      return;
    }

    const newTodo = await prisma.todo.create({
      data: { title, description, user_id: userId, done: false },
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
}
