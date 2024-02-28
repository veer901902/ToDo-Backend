import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

require("dotenv").config();

export default async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction
){
   
}