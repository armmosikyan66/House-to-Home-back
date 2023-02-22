import {Router} from "express";
import upload from "../utils/uploader.js";
import AdminController from "../controllers/admin.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import deleteDirectory from "../middlewares/deleteDirectory.js";
import deleteFileMiddleware from "../middlewares/deleteFileMiddleware.js";
import addFileMiddleware from "../middlewares/addFileMiddleware.js";

const router = new Router();

router.post("/create-prd", checkAuth, checkAdmin,  upload.array('images', 10), AdminController.createPrd);
router.delete("/delete-prd/:dirId/:prdId", checkAuth, checkAdmin, deleteDirectory, AdminController.deletePrd);
router.delete("/delete-img/:dirId/:filename/:prdId", checkAuth, checkAdmin, deleteFileMiddleware, AdminController.deleteImg);
router.delete("/add-img/:dirId/:prdId", checkAuth, checkAdmin, addFileMiddleware, AdminController.addImg);

export default router;