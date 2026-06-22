import express from "express";
import { dbConnect } from "./config/database.js";
import { User } from "./models/user.js";
const app = express();

app.use(express.json());

app.use("/signup", async (req, res, next) => {

    const harsha = {
        firstName: "harsha",
        lastName: "bommireddy",
        phoneNumber: 3280718501,
        email: "harsahbommi@gmail.com",
        age: 30
    };

    try {
        const user = new User(harsha)

        await user.save();
        res.send({ message: `${user.firstName + " " + user.lastName} created successfully` })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error creating user")
    }
});




const startup = async () => {
    try {
        await dbConnect();
        console.log("DB Connected");
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        })
    }
    catch (error) {
        console.log(error, "Error in startup")
    }

}


startup();


