import * as path from "path";
import multer from "multer";
import * as fs from "fs";
import {ServiceUnavailable} from "../exceptions/index.js";
import fileFilter from "../utils/helpers/fileFilter.js";

const upload = multer({
    storage: multer.memoryStorage() ,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024
    }
});

function addFileMiddleware(req, res, next) {
    const dirId = req.params.dirId;
    const dirPath = path.join('static', 'uploads', dirId);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    upload.single('image')(req, res, function(err) {
        if (err) {
            return next(new ServiceUnavailable(`Error uploading image: ${err}`))
        }

        const filename = req.file.originalname;
        const filePath = path.join(dirPath, filename);

        fs.writeFile(filePath, req.file.buffer, function(err) {
            if (err) {
                return next(new ServiceUnavailable(`Error saving file: ${err}`))
            }

            next();
        });
    });
}

export default addFileMiddleware;