import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String

    },
    lastName: {
        type: String

    },
    username: {
        type: String,
        required: true

    }, email: {
        type: String,
        required: true

    },
    phoneNumber: {
        type: Number

    },
    age: {
        type: Number
    }

});

userSchema.index({ email: 1, username: 1 }, { unique: true, sparse: true });

const User = mongoose.model('user', userSchema)

export { User }
