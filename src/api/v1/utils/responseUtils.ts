import { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  message = "Success"
): void {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}

export function sendError(
  res: Response,
  statusCode: number,
  errorCode: string,
  message: string
): void {
  res.status(statusCode).json({
    success: false,
    errorCode,
    message,
    timestamp: new Date().toISOString(),
  });
}