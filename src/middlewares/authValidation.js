import {body} from "express-validator";

export const authValidation = [
    body('email').isEmail().withMessage("invalid"),
    body('firstName').isLength({min: 3}).withMessage("letters"),
    body('lastName').isLength({min: 3}).withMessage("letters"),
    body('phoneNumber').isMobilePhone().withMessage("invalid"),
    body('password').isLength({min: 8}).withMessage("letters"),
    body('role').isIn(['admin', 'user', "local", undefined]),
]