import {Router} from "express";
import {authValidation} from "../middlewares/authValidation.js";
import validationChecker from "../middlewares/validationChecker.js";
import UserController from "../controllers/user.controller.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = new Router();

router.post("/register", authValidation, validationChecker, UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get('/refresh', UserController.refresh);
router.post("/add-favorite", checkAuth, UserController.addFavorite);
router.post("/remove-favorite", checkAuth, UserController.removeFavorite);

export default router;