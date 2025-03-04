import { Router } from "express";

import userController from "./userController";

const router = Router();

router.get("/user/:id", userController.getUser);

export default router;
