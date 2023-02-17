import {Router} from "express";
import upload from "../utils/uploader.js";
import AdminController from "../controllers/admin.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";

const router = new Router();

router.post("/create-prd", checkAuth, checkAdmin, upload.array('images', 10), AdminController.createPrd)

export default router;