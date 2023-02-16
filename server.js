import dotenv from "dotenv";
dotenv.config();
import  express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.js";
import router from "./src/routes/routes.js";
import "./src/database/db.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    app.listen(PORT, ()=> console.log("\nlistening on port " + PORT))
}

start();