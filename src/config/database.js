import mongoose from "mongoose";

const URI = "mongodb+srv://gurucharanv:Sailaja%4024@cluster0.p8bpcrg.mongodb.net/"

const dbConnect = async () => {
    await mongoose.connect(URI);
};

export { dbConnect, URI };
