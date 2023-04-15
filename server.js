import dotenv from "dotenv";
dotenv.config();
import  express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.js";
import auth from "./src/routes/user.js";
import "./src/database/db.js"
import product from "./src/routes/product.js";
import {fileURLToPath} from "url";
import {dirname} from "path";
import * as path from "path";
import admin from "./src/routes/admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    // origin: "https://house-to-home-front.vercel.app"
    origin: "http://localhost:3000"
}));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/api', auth);
app.use('/api', product);
app.use('/api/admin', admin);
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});
  
app.use(errorHandler);

const start = async () => {
    app.listen(PORT, ()=> console.log("\nlistening on port " + PORT))
}

start();
