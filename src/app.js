import express from "express";
import { dbConnect } from "./config/database.js";
import { User } from "./models/user.js";
const app = express();

// Express Middleware
app.use(express.json());


const calDOB = (dob) => {
    const today = new Date();
    const dov = new Date(dob);
    let age = today.getFullYear() - dov.getFullYear();
    const month = today.getMonth() - dov.getMonth();
    if (month < 0 || month === 0 && today.getDate() < dob.getDate()) {
        age--;
    }
    return age;
}

// Signup API
app.post("/signup", async (req, res) => {
    try {
        const { password, conformpassword, ...safeData } = req.body;
        if (!password || !conformpassword) {
            return res.status(400).send("Passwords are required");
        } else if (password !== conformpassword) {
            return res.status(400).send("Passwords do not match");
        } else {
            const user = new User({ ...safeData, password });
            const age = calDOB(user.dob);
            user.age = age;
            if (age < 18) {
                return res.status(400).send("User must be 18 years old");
            }

            await user.save();
            res.send({ message: `${user.firstname + " " + user.lastname} created successfully` })
        }

    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).send("User already exists");
        } else {
            // console.log(err)
            return res.status(500).send("Error creating user :" + err);
        }
    }
});

//Edit user API
app.patch("/user", async (req, res) => {

    try {
        const { email: mailID, dob, age, ...safeData } = req.body
        if (!mailID) {
            return res.status(400).send("Please provide email ID");
        }



        const userUpdate = await User.findOneAndUpdate(
            {
                email: mailID
            },
            safeData,
            {
                returnDocument: "after",
                runValidators: true
            });

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

// Get one by email API
app.get("/byemail", async (req, res) => {
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
app.delete("/user", async (req, res) => {
    const mailID = req.body.email;
    try {
        if (!mailID) {
            return res.status(400).send("Please provide email ID")
        } else {
            const usermail = await User.deleteOne({ email: mailID }, { returnDocument: "after", runValidators: true })
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


