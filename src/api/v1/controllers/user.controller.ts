import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebase";
import { sendSuccess } from "../utils/responseUtils";

export const userController = {
  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const uid = req.params.uid as string;
      const user = await auth.getUser(uid);
      sendSuccess(res, user, 200, "User retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  async setClaims(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { uid, role } = req.body;
      await auth.setCustomUserClaims(uid, { role });
      sendSuccess(res, { uid, role }, 200, "Custom claims set successfully");
    } catch (error) {
      next(error);
    }
  },
};