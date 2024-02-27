import { Request, Response, NextFunction } from "express";

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = res.statusCode || 500;
  res.status(status).json({message: err.message});
}


