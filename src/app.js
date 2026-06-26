import express from "express";
import { dbConnect } from "./config/database.js";
import { User } from "./models/user.js";
const app = express();

// Express Middleware
app.use(express.json());

// Signup API
app.post("/signup", async (req, res, next) => {
    try {
        const user = new User(req.body)

        await user.save();
        res.send({ message: `${user.firstName + " " + user.lastName} created successfully` })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error creating user")
    }
});

// Feed API
app.get("/feed", (req, res) => {
    try {
        res.send({ message: "feed" })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error in feed")
    }
});


// Get by email API

app.get("/useremail", async (req, res) => {
    const mailID = req.body.email;
    try {
        const usermail = await User.find({ email: mailID })

        if (!mailID) {
            return res.status(400).send("Please provide email")
        } else if (usermail.length === 0) {
            return res.status(404).send("No user found")
        } else {
            res.send(usermail)
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error in getting user")
    }

})


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


