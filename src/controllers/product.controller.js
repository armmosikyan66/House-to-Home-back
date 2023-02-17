import ProductService from "../services/product.service.js";
import {SUCCESS_CODE} from "../exceptions/status-codes.js";
import {fileURLToPath} from "url";
import path, {dirname} from "path";

class ProductController {
    async getAll(req, res, next) {
        try {
            const {lang, page} = req.params;
            const product = await ProductService.getAll(lang, page, req.body);

            res.status(SUCCESS_CODE).json(product);
        } catch (e) {
            next(e);
        }
    }

    async getImages(req, res, next) {
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const filePath = path.join(__dirname, '../../static', 'uploads', req.params.folder, req.params.filename);
            res.status(SUCCESS_CODE).sendFile(filePath);
        } catch (e) {
            next(e);
        }
    }

    async getOnePrd(req, res, next) {
        try {
            const product = await ProductService.getOne(req.params.id);
            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async getRecommended(req, res, next) {
        try {
            const {status, lang} = req.params;
            const product = await ProductService.getRecommended(status, lang);

            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async getSaved(req, res, next) {
        try {
            const product = await ProductService.getSavedPrd(JSON.parse(req.cookies.favorites));

            res.status(SUCCESS_CODE).json(product);
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();