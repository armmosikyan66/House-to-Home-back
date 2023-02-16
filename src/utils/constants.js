export const VALIDATION_ERROR = "Request didn't pass validation";
export const SOMETHING_WENT_WRONG = "Something went wrong, please try again";
export const ALREADY_EXISTS = resource => `${resource} already exists!`;
export const NOT_EXISTS = resource => `${resource} doesn't exist!`;
export const IS_INVALID = resource => `${resource} is invalid`;
export const mongoUrl = process.env.DB_URL;