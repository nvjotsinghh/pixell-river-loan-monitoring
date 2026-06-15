import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebase";
import { AuthenticationError } from "../errors/AuthenticationError";
import { ERROR_CODES } from "../../../constants/httpStatus";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError(
        "Unauthorized: No token provided",
        ERROR_CODES.TOKEN_NOT_FOUND
      );
    }

    const token = authHeader.split("Bearer ")[1];

    const decodedToken = await auth.verifyIdToken(token);
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      next(error);
    } else {
      next(
        new AuthenticationError(
          "Unauthorized: Invalid token",
          ERROR_CODES.TOKEN_INVALID
        )
      );
    }
  }
}