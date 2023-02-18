import multer from 'multer';
import * as path from "path";
import * as fs from "fs";
import fileFilter from "./helpers/fileFilter.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directoryPath = path.join('static', 'uploads', Date.now().toString());
        fs.mkdir(directoryPath, { recursive: true }, (err) => cb(err, directoryPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024
    }
});

export default upload;
