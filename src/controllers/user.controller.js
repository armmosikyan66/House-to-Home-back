import UserService from "../services/user.service.js";
import {validationResult} from "express-validator";

class UserController {
    async register(req, res, next) {
        try {
            const {email, password, phoneNumber, firstName, lastName, role} = req.body;
            const userData = await UserService.registration(email, password, phoneNumber, firstName, lastName, role);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();