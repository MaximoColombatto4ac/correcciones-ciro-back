import mongoose from "mongoose";
import EnvVars from "./constants/EnvVars";



export const db = async () => {
    try {
        mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/torneoApp');
        console.log("db is connnected");
    } catch (error) {
        console.log(error);
    }
} 