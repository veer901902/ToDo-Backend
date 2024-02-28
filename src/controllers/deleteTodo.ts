import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { todo } from "node:test";

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

    await prisma.todo.delete({where:{id:parseInt(id)}});
    res.status(204).json({message:"Successfully deleted the todo"});
  } catch (error) {
    next(error);
  }
}
