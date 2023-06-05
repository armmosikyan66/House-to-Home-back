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

    async activate(req, res, next) {
        try {
            const activationLink = req.params.id;
            await UserService.activate(activationLink);

            res.status(SUCCESS_CODE).redirect("http://localhost:3000");
        } catch (e) {
            next(e)
        }
    }
    async report(req, res, next) {
        try {
            const {firstName, lastName, email, phoneNumber, message} = req.body;
            await UserService.sendReport(firstName, lastName, email, phoneNumber, message);

            res.status(SUCCESS_CODE).json("success")
        } catch (e) {
            next(e)
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
            const {refreshToken} = req.headers;
            console.log(req.cookies)
            const userData = await UserService.refresh(refreshToken.split(" ")[1]);
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

            res.status(SUCCESS_CODE).json(user);
        } catch (e) {
            next(e);
        }
    }

    async removeFavorite(req, res, next) {
        try {
            const {userId, propertyId} = req.body;
            const user  = await UserService.removeFavorite(userId, propertyId);

            res.status(SUCCESS_CODE).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();