import {AccessClosed, AuthError} from "../exceptions/index.js";
import {REQUIRED} from "../utils/constants.js";
import TokenService from "../services/token.service.js";

export default function(roles)  {
    return (req, res, next,) => {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(new Error(REQUIRED("Authorization Header ")));
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            return next(new AuthError("token not found"));
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if(!roles.includes(userData.role)) {
            return next(new AccessClosed(`Role: ${userData.role} is not allowed`));
        }

        next()
    }
}