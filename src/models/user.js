import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String

    },
    lastName: {
        type: String

    }, email: {
        type: String
    },
    phoneNumber: {
        type: Number

    },
    age: {
        type: Number
    }

});

const User = mongoose.model('user', userSchema)

export { User }
