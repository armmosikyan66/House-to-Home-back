import {AuthError} from "../exceptions/index.js";
import UserModel from "../models/UserModel.js";

export default function (req, res, next) {
    try {
        const user = UserModel
            .findById(req.user.id)
            .then((user) => {
                if (!user) {
                    return next(new AuthError("User not found"));
                }

                return user;
            })

        if (user.role === "user") {
            return next(new AuthError("user not admin"));
        }

        next();
    } catch (e) {
        return next(new AuthError(e.message));
    }
};
