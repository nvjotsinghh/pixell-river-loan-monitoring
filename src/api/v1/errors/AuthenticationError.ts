import { HTTP_STATUS, ERROR_CODES } from "../../../constants/httpStatus";
import { BaseError } from "./BaseError";

export class AuthenticationError extends BaseError {
  constructor(
    message = "Unauthorized",
    errorCode: string = ERROR_CODES.TOKEN_INVALID
  ) {
    super(message, HTTP_STATUS.UNAUTHORIZED, errorCode);
  }
}