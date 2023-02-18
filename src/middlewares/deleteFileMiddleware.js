import * as fs from "fs";
import * as path from "path";
import {Conflict} from "../exceptions/index.js";

function deleteFileMiddleware(req, res, next) {
    const dirPath = path.join('static', 'uploads', req.params.dirId, req.params.filename);

    fs.unlink(dirPath, (err) => {
        if (err) {
            return next(new Conflict(`Error deleting file: ${err}`))
        }

        next()
    });
}

export default deleteFileMiddleware;