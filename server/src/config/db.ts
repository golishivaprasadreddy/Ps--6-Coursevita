import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/file-manager");
        console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection failed", err);
    }
}