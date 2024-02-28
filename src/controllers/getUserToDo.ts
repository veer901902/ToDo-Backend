import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

require("dotenv").config();

export default async function getUserToDo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;

    const userTodos = await prisma.todo.findMany({
      where: { user_id: userId },
    });

    if (!userTodos) {
      return res.status(404).json({ error: "User todos not found" });
    }

    res.status(200).json(userTodos);
  } catch (error) {
    next(error);
  }
}
