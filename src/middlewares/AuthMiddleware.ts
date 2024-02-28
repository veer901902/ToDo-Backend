import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

require("dotenv").config();

const prisma = new PrismaClient();

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({ error: "Auth Error" });
      return;
    }

    const token = authHeader?.split(" ")[1];
    if(!process.env.JWT_SECRET){
        throw new Error("JWT SECRET not found");
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({where:{id: decoded.id}, select:{id: true, name: true, email: true}});

    if(!user){
        return res.status(403).json({error: "User does not found"});
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
