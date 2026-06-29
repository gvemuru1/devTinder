import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String

    },
    username: {
        type: String

    }, email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true

    },
    phoneNumber: {
        type: Number

    },
    age: {
        type: Number
    },
    skills: {
        type: [String],
        default: []
    },
    photourl: {
        type: String,
        default: null
    },
    bio: {
        type: String
    },
    password: {
        type: String,
        required: true
    }

});

userSchema.index({ email: 1 }, { unique: true, sparse: true });

const User = mongoose.model('user', userSchema, { timestamps: true });

export { User }
