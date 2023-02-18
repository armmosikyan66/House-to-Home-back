import fs from 'fs/promises';
import {NotFound, ServiceUnavailable} from "../exceptions/index.js";
import * as path from "path";

async function deleteDirectory(req, res, next) {
    try {
        const dirPath = path.join('static', 'uploads', req.params.dirId);

        const dirExists = await fs.stat(dirPath);
        if (!dirExists.isDirectory()) {
            return next(new NotFound("Invalid directory ID"))
        }

        await fs.rm(dirPath, {recursive: true});

        next();
    } catch (err) {
        return next(new ServiceUnavailable(err.message));
    }
}

export default deleteDirectory;