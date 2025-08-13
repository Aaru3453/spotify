import mongoose from "mongoose";
import 'dotenv/config';

const connectDb = async() => {
    try {
        console.log("Connecting to MongoDb....", process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "SpotifyClone",
            serverSelectionTimeoutMS:30000,
        });
        
        console.log("MongoDB Connected Successfully");

    } catch (error) {
        console.log("MongoDb Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDb;