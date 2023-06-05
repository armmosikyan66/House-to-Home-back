import {AuthError, NotFound} from "../exceptions/index.js";
import TokenService from "../services/token.service.js";
import {NOT_EXISTS, REQUIRED} from "../utils/constants.js";
import UserRepositories from "../repositories/user.repositories.js";
import TokenRepositories from "../repositories/token.repositories.js";

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

        const userData = TokenService.validateRefreshToken(JSON.parse(accessToken));
        new UserRepositories().getById(userData._id).then(cond => {
            if (!cond) {
                throw new NotFound(NOT_EXISTS("User"));
            }
            new TokenRepositories().findOne({user: cond.id}).then(res => {
                if (!res) {
                    throw new NotFound(NOT_EXISTS("User"));
                }
                req.user = cond;
                next();
            })
        });
    } catch (e) {
        return next(new AuthError(e.message));
    }
};
