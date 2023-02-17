import multer from 'multer';
import * as path from "path";
import * as fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directoryPath = path.join('static', 'uploads', Date.now().toString());
        // Use the `fs` module to create the directory
        fs.mkdir(directoryPath, { recursive: true }, (err) => cb(err, directoryPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

export default upload;
