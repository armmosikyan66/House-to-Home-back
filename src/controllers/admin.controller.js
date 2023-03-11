import AdminService from "../services/admin.service.js";
import {CREATED_CODE, SUCCESS_CODE} from "../exceptions/status-codes.js";

class AdminController {
    async createPrd(req, res, next) {
        try {
            const product = await AdminService.createNewProduct(req.body, req.images, req.user);

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

    async deleteUser(req, res, next) {
        try {
            const user = await AdminService.deleteUser(req.params.userId);

            res.status(SUCCESS_CODE).json(user)
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
            const product = await AdminService.addImg(prdId, req.image);

            res.status(SUCCESS_CODE).json(product);
        } catch (e) {
            next(e)
        }
    }

    async getProducts(req, res, next) {
        try {
            const product = await AdminService.getAdminPrd(Number(req.params.page || 1));

            res.status(SUCCESS_CODE).json(product);
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await AdminService.getUsers(Number(req.params.page || 1));

            res.status(SUCCESS_CODE).json(users);
        } catch (e) {
            next(e)
        }
    }

    async updatePrd(req, res, next) {
        try {
            const users = await AdminService.updatePrd(req.body, req.params.prdId);

            res.status(SUCCESS_CODE).json(users);
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req, res, next) {
        try {
            const users = await AdminService.updateUser(req.body, req.params.userId);

            res.status(SUCCESS_CODE).json(users);
        } catch (e) {
            next(e)
        }
    }
}

export default new AdminController();