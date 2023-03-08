import UserService from "../services/user.service.js";
import {SUCCESS_CODE} from "../exceptions/status-codes.js";

class UserController {
    async register(req, res, next) {
        try {
            const {email, password, phoneNumber, firstName, lastName, role} = req.body;
            const userData = await UserService.registration(email, password, phoneNumber, firstName, lastName, role);

            res.status(SUCCESS_CODE).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(SUCCESS_CODE).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.status(SUCCESS_CODE).json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(SUCCESS_CODE).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async addFavorite(req, res, next) {
        try {
            const {userId, propertyId} = req.body;
            const user  = await UserService.addFavorite(userId, propertyId);
            res.cookie('favorites', JSON.stringify(user.favorites), { maxAge: 60 * 60 * 24 * 365, httpOnly: true });

            res.status(SUCCESS_CODE).json(user);
        } catch (e) {
            next(e);
        }
    }

    async removeFavorite(req, res, next) {
        try {
            const {userId, propertyId} = req.body;
            const user  = await UserService.removeFavorite(userId, propertyId);
            res.cookie('favorites', JSON.stringify(user.favorites), { maxAge: 60 * 60 * 24 * 365, httpOnly: true });

            res.status(SUCCESS_CODE).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();