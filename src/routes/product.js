import {Router} from "express";
import ProductController from "../controllers/product.controller.js";

const router = new Router();

router.post("/get-all/:lang/:page", ProductController.getAll);
router.get('/uploads/:folder/:filename', ProductController.getImages);
router.get("/get-one/:id", ProductController.getOnePrd);
router.get("/get-recommended/:lang/:status", ProductController.getRecommended);
router.get("/get-saved", ProductController.getSaved);

// http://localhost:5000/api/uploads/1676644061417/images-1676644061420.jpg

export default router;