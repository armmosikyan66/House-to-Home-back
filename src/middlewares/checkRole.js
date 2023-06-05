import {AccessClosed} from "../exceptions/index.js";

export default function(roles)  {
    return (req, res, next,) => {
        const user = req.user;

        if(!roles.includes(user.role)) {
            return next(new AccessClosed(`Role: ${user.role} is not allowed`));
        }

        next()
    }
}