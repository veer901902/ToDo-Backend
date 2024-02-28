import { Request, Response, NextFunction } from "express";

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorMessage = err.message || "Server Error";
  
  res.status(500).json({error: "Server Error"});
}


