import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

router.get("/:uid", authenticate, authorize({ roles: ["admin"] }), userController.getUser);

export default router;