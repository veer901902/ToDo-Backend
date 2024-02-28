import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

require("dotenv").config();

export default async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ error: "Todo ID is required" });
      return;
    }
    // Check if todo with given id exists
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await prisma.todo.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Successfully deleted the todo" });
  } catch (error) {
    next(error);
  }
}
