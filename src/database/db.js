import {mongoUrl} from "../utils/constants.js";
import mongoose from "mongoose";

(async () => {
    const options = {
        keepAlive: "true",
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    await mongoose.set('strictQuery', true);
    await mongoose.connect("mongodb+srv://Arman:Armmosikyan2005@cluster0.zsnzjyd.mongodb.net/?retryWrites=true&w=majority", options);

    await mongoose.set("debug", true);

    mongoose.connection.on("error", (err) => {
        console.error("Mongoose connection: error - " + err);
    });

    mongoose.connection.on("connected", () => {
        console.info("Mongoose connection: connected");
    });

    mongoose.connection.on("open", () => {
        console.info("Mongoose connection: open");
    });

    mongoose.connection.on("reconnected", () => {
        console.info("Mongoose connection: reconnected");
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("Mongoose connection: disconnected");
    });

    return mongoose;
})();