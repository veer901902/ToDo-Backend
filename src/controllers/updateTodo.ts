import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

require("dotenv").config();

export default async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const { id, title, description, done } = req.body;

    const dataToUpdate: {
      title?: string;
      description?: string;
      done?: boolean;
    } = {};
    
    if (title) dataToUpdate.title = title;
    if (description) dataToUpdate.description = description;
    if (done)
      dataToUpdate.done = typeof done === "string" ? done === "true" : done;

    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
    });
    res.status(201).json(updatedTodo);
  } catch (error) {
    next(error);
  }
}
