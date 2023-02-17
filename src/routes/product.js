import {Router} from "express";
import ProductController from "../controllers/product.controller.js";
import upload from "../utils/uploader.js";

const router = new Router();

router.post("/get-all/:lang/:page", ProductController.getAll)
// todo remove here and create admin routes
router.post("/create-prd", upload.array('images', 10), (req, res, next) => res.json({success: req.files.map((file) => `/uploads/${file.filename}`)}))
router.get('/uploads/:folder/:filename', ProductController.getImages);
router.get("/get-one/:id", ProductController.getOnePrd);
router.get("/get-recommended/:lang/:status", ProductController.getRecommended);
router.get("/get-saved", ProductController.getSaved);

// http://localhost:5000/api/uploads/1676644061417/images-1676644061420.jpg

export default router;