import { BaseError } from "../errors/BaseError";

export function isOperationalError(error: unknown): error is BaseError {
  return error instanceof BaseError && error.isOperational;
}

export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}

export function extractErrorCode(error: unknown): string {
  if (error instanceof BaseError) return error.errorCode;
  return "INTERNAL_ERROR";
}