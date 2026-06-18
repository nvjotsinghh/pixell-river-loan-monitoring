import { Router } from "express";
import { userController } from "../controllers/user.controller";
// import { authenticate } from "../middleware/authenticate";
// import { authorize } from "../middleware/authorize";

const router = Router();

// router.post(
//   "/set-claims",
//   authenticate,
//   authorize({ roles: ["admin"] }),
//   userController.setClaims
// );

router.post("/set-claims", userController.setClaims);

export default router;