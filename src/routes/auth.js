import {Router} from "express";
import {authValidation} from "../middlewares/authValidation.js";
import validationChecker from "../middlewares/validationChecker.js";
import UserController from "../controllers/user.controller.js";

const router = new Router();

router.post("/register", authValidation, validationChecker, UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get('/refresh', UserController.refresh);

export default router;