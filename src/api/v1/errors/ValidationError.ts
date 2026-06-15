import { HTTP_STATUS, ERROR_CODES } from "../../../constants/httpStatus";
import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  constructor(message = "Validation failed") {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR);
  }
}