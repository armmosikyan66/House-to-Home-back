import {Router} from "express";
import {authValidation} from "../middlewares/authValidation.js";
import validationChecker from "../middlewares/validationChecker.js";
import UserController from "../controllers/user.controller.js";
import checkAuth from "../middlewares/checkAuth.js";

import {fileURLToPath} from "url";
import {dirname} from "path";
import * as path from "path";

const router = new Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/register", authValidation, validationChecker, UserController.register);
router.get('/activate/:link', UserController.activate)
router.post('/report', UserController.report)
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get('/refresh', UserController.refresh);
router.post("/add-favorite", checkAuth, UserController.addFavorite);
router.post("/remove-favorite", checkAuth, UserController.removeFavorite);
router.post("/check", (req, res) => {
    res.status(200).json({
        status: "success",
        dirname: __dirname,
        process: process.cwd()
    })
})

export default router;