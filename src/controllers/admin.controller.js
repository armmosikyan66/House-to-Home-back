import AdminService from "../services/admin.service.js";
import {CREATED_CODE, SUCCESS_CODE} from "../exceptions/status-codes.js";

class AdminController {
    async createPrd(req, res, next) {
        try {
            const product = await AdminService.createNewProduct(req.body, req.files, req.user);

            res.status(CREATED_CODE).json(product)
        } catch (e) {
            next(e)
        }
    }

    async deletePrd(req, res, next) {
        try {
            const product = await AdminService.deletePrd(req.params.prdId);

            res.status(SUCCESS_CODE).json(product)
        } catch (e) {
            next(e)
        }
    }

    async deleteImg(req, res, next) {
        try {
            const {dirId, filename, prdId} = req.params;
            const product = await AdminService.deleteImg(dirId, filename, prdId);

            res.status(SUCCESS_CODE).json(product);
        } catch (e) {
            next(e)
        }
    }

    async addImg(req, res, next) {
        try {
            const {prdId} = req.params;
            const product = await AdminService.addImg(prdId, req.files);

            res.status(SUCCESS_CODE).json(product);
        } catch (e) {
            next(e)
        }
    }

    async getProducts(req, res, next) {
        try {
            const product = await AdminService.getAdminPrd(Number(req.body || 1));

            res.status(SUCCESS_CODE).json(product);
        } catch (e) {
            next(e)
        }
    }
}

export default new AdminController();