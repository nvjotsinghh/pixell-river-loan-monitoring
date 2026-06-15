import { HTTP_STATUS, ERROR_CODES } from "../../../constants/httpStatus";
import { BaseError } from "./BaseError";

export class AuthorizationError extends BaseError {
  constructor(
    message = "Forbidden: Insufficient permissions",
    errorCode: string = ERROR_CODES.INSUFFICIENT_ROLE
  ) {
    super(message, HTTP_STATUS.FORBIDDEN, errorCode);
  }
}