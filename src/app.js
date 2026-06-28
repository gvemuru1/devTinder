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
        // const userExists = await User.findOne({ email: user.email });
        // if (userExists) {
        //     return res.status(400).send("User already exists")
        // } else {
        await user.save();
        res.send({ message: `${user.firstName + " " + user.lastName} created successfully` })
        // }
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).send("User already exists");
        } else {
            return res.status(500).send("Error creating user");
        }
    }
});

//Edit user API
app.patch("/edituser", async (req, res) => {

    try {
        const mailID = req.body.email;

        if (!mailID) {
            return res.status(400).send("Please provide email ID");
        }
        const userUpdate = await User.findOneAndUpdate({ email: mailID }, req.body, { returnDocument: "after" });
        if (userUpdate) {
            res.send(`${mailID} updated successfully`);
        } else {
            res.status(404).send("User not found");
        }
    }
    catch (err) {
        return res.status(500).send("Error in editing user")
    }

}
);

// Feed API
app.get("/feed", async (req, res) => {
    try {

        const homefeed = await User.find({});
        res.send(homefeed);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error in feed")
    }
});

// Get all by email API
app.get("/useremails", async (req, res) => {
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

// Get one by email API
app.get("/useremail", async (req, res) => {
    const mailID = req.body.email;
    try {
        const usermail = await User.findOne({ email: mailID })

        if (!mailID) {
            return res.status(400).send("Please provide email ID")
        } else if (usermail === null) {
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

// delete by email

app.delete("/useremail", async (req, res) => {
    const mailID = req.body.email;
    try {
        if (!mailID) {
            return res.status(400).send("Please provide email ID")
        } else {
            const usermail = await User.deleteOne({ email: mailID })
            if (usermail.deletedCount === 0) {
                return res.status(404).send("No user found")
            } else {
                res.send(`${mailID} deleted successfully`)
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500).send("failed to delete user")
    }

}
);

// startup
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


