// import { PrismaClient } from "@prisma/client";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import z from "zod";

// const prisma = new PrismaClient();

// require("dotenv").config();

// const registerSchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string().min(6),
// });

// export default async function registerUser(req: Request, res: Response) {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Please enter all fields");
//   }

//   const parsedData = registerSchema.safeParse(req.body);

//     if(!parsedData.success){
//       res.status(400);
//       throw new Error("Please give valid input");
//     }

//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   const newUser = await prisma.user.create({
//     data: { name, email, password },
//     select: { id: true, name: true, email: true, password: true },
//   });

//   if (!process.env.JWT_SECRET) {
//     throw new Error("JWT secret not provided");
//   }
//   const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
//     expiresIn: "30d",
//   });

//   if (newUser) {
//     res.status(201).json({
//       _id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//       password: newUser.password,
//       token
//     });
//   } else {
//     res.status(400);
//     throw new Error("Failed to create the user");
//   }
// }

import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

const prisma = new PrismaClient();

require("dotenv").config();

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction // Add next parameter for error handling
) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please enter all fields" });
    }

    const parsedData = registerSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({ error: "Please give valid input" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: { name, email, password },
      select: { id: true, name: true, email: true }, // Exclude password from being returned
    });

    // Check if JWT_SECRET is defined before using it
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret not provided");
    }

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    // Pass the error to Express's error handling middleware
    next(error);
  }
}

