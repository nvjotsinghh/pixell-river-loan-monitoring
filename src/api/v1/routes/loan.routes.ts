import { Router } from "express";
import { loanController } from "../controllers/loan.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

// GET /loans — analyst, manager, admin
router.get(
  "/",
  authenticate,
  authorize({ roles: ["analyst", "manager", "admin"] }),
  loanController.getAll
);

// GET /loans/:id — analyst, manager, admin
router.get(
  "/:id",
  authenticate,
  authorize({ roles: ["analyst", "manager", "admin"] }),
  loanController.getById
);

// POST /loans — manager, admin
router.post(
  "/",
  authenticate,
  authorize({ roles: ["manager", "admin"] }),
  loanController.create
);

// PUT /loans/:id — manager, admin
router.put(
  "/:id",
  authenticate,
  authorize({ roles: ["manager", "admin"] }),
  loanController.update
);

// DELETE /loans/:id — admin only
router.delete(
  "/:id",
  authenticate,
  authorize({ roles: ["admin"] }),
  loanController.delete
);

export default router;