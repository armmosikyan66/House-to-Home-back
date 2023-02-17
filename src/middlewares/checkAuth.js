import {AuthError} from "../exceptions/index.js";
import TokenService from "../services/token.service.js";
import {REQUIRED} from "../utils/constants.js";

export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(new Error(REQUIRED("Authorization Header ")));
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            return next(new AuthError("token not found"));
        }

        const userData = TokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(new AuthError("user not authorized"));
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(new AuthError(e.message));
    }
};
