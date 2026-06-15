import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/AuthorizationError";
import { AuthenticationError } from "../errors/AuthenticationError";
import { ERROR_CODES } from "../../../constants/httpStatus";

export interface AuthorizationOptions {
  roles: string[];
}

export function authorize(options: AuthorizationOptions) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = res.locals.user;

    if (!user) {
      next(
        new AuthenticationError(
          "Unauthorized: No token provided",
          ERROR_CODES.TOKEN_NOT_FOUND
        )
      );
      return;
    }

    const userRole: string | undefined = user.role;

    if (!userRole) {
      next(
        new AuthorizationError(
          "Forbidden: No role assigned",
          ERROR_CODES.ROLE_NOT_FOUND
        )
      );
      return;
    }

    if (!options.roles.includes(userRole)) {
      next(
        new AuthorizationError(
          "Forbidden: Insufficient role",
          ERROR_CODES.INSUFFICIENT_ROLE
        )
      );
      return;
    }

    next();
  };
}