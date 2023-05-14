import {Router} from "express";
import uploadMultipleFiles from "../utils/uploader.js";
import AdminController from "../controllers/admin.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkRole from "../middlewares/checkRole.js";
import deleteDirectory from "../middlewares/deleteDirectory.js";
import deleteFileMiddleware from "../middlewares/deleteFileMiddleware.js";
import addFileMiddleware from "../middlewares/addFileMiddleware.js";

const router = new Router();

router.post("/create-prd", checkAuth, checkRole(["admin", "locale"]), uploadMultipleFiles, AdminController.createPrd);
router.delete("/delete-prd/:dirId/:prdId", checkAuth, checkRole(["admin", "locale"]), deleteDirectory, AdminController.deletePrd);
router.delete("/delete-user/:userId", checkAuth, checkRole(["admin", "locale"]), AdminController.deleteUser);
router.delete("/delete-img/:dirId/:filename/:prdId", checkAuth, checkRole(["admin", "locale"]), deleteFileMiddleware, AdminController.deleteImg);
router.post("/add-img/:dirId/:prdId", checkAuth, checkRole(["admin", "locale"]), addFileMiddleware, AdminController.addImg);
router.post("/get-prd/:page", checkAuth, checkRole(["admin", "locale"]), AdminController.getProducts);
router.post("/get-users/:page", checkAuth, checkRole(["admin", "locale"]), AdminController.getUsers);
router.put("/update-prd/:prdId", checkAuth, checkRole(["admin", "locale"]), AdminController.updatePrd);
router.put("/update-user/:userId", checkAuth, checkRole(["admin", "locale"]), AdminController.updateUser);

export default router;