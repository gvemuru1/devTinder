import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.MONGODB_URI

const dbConnect = async () => {
    await mongoose.connect(URI);
};

export { dbConnect, URI };
