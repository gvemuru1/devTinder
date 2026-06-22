import { User } from "./user.js";

app.use("/signup", async (req, res, next) => {
    try {
        const user = new User({
            firstName: "harsha",
            lastName: "bommireddy",
            phoneNumber: 3280718501,
            email: "harsahbommi@gmail.com",
            age: 30
        })

        await user.save();
        res.send({ message: `${user.firstName + " " + user.lastName} created successfully` })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error creating user")
    }
});
