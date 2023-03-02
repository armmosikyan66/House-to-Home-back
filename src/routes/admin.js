import {Router} from "express";
import upload from "../utils/uploader.js";
import AdminController from "../controllers/admin.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkRole from "../middlewares/checkRole.js";
import deleteDirectory from "../middlewares/deleteDirectory.js";
import deleteFileMiddleware from "../middlewares/deleteFileMiddleware.js";
import addFileMiddleware from "../middlewares/addFileMiddleware.js";

const router = new Router();

router.post("/create-prd", checkAuth, checkRole(["admin", "locale"]),  upload.array('images', 10), AdminController.createPrd);
router.delete("/delete-prd/:dirId/:prdId", checkAuth, checkRole(["admin", "locale"]), deleteDirectory, AdminController.deletePrd);
router.delete("/delete-img/:dirId/:filename/:prdId", checkAuth, checkRole(["admin", "locale"]), deleteFileMiddleware, AdminController.deleteImg);
router.post("/add-img/:dirId/:prdId", checkAuth, checkRole(["admin", "locale"]), addFileMiddleware, AdminController.addImg);
router.get("/get-prd/:page", checkAuth, checkRole(["admin", "locale"]), AdminController.getProducts)

export default router;