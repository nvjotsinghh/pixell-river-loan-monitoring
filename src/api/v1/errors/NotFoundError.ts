import { HTTP_STATUS, ERROR_CODES } from "../../../constants/httpStatus";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(message, HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND);
  }
}