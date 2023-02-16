import dotenv from "dotenv";
dotenv.config();
import  express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.js";
import router from "./src/routes/routes.js";
import "./src/database/db.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    app.listen(5000, ()=> console.log("\nlistening on port " + 5000))
}

start();