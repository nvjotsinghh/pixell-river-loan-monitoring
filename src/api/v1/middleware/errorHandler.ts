import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/BaseError";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { extractErrorMessage, extractErrorCode } from "../utils/errorUtils";
import { sendError } from "../utils/responseUtils";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof BaseError) {
    console.error(`[${err.errorCode}] ${err.message}`);
    sendError(res, err.statusCode, err.errorCode, err.message);
    return;
  }

  // Unhandled/unexpected errors
  console.error("Unhandled error:", err);
  sendError(
    res,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    extractErrorCode(err),
    extractErrorMessage(err)
  );
}