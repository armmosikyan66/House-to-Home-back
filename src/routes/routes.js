import {Router} from "express";
import {authValidation} from "../middlewares/authValidation.js";
import validationChecker from "../middlewares/validationChecker.js";
import UserController from "../controllers/user.controller.js";

const router = new Router();

router.post("/register", authValidation, validationChecker, UserController.register)

export default router;