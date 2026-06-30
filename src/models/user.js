import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: [3, "Name should be atleast 3 characters"],
        maxLength: [20, "Name should be less than 20 characters"],
        validate: [validator.isAlpha, "Only letters are allowed"]

    },
    lastname: {
        type: String,
        minLength: [3, "Name should be atleast 3 characters"],
        maxLength: [20, "Name should be less than 20 characters"],
        validate: [validator.isAlpha, "Only letters are allowed"]

    },
    username: {
        type: String,
        required: true,
        minLength: [5, "Username should be atleast 5 characters"],
        maxLength: [20, "Username should be less than 20 characters"],
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => {
                const userPattern = /^[a-zA-z0-9_]$/;
                return userPattern.test(v);
            }, message: "Only letters, numbers and underscores are allowed"
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please enter valid email"]

    },
    phonenumber: {
        countycode: {
            type: String,
            default: "+1",
            minLength: [0],
            maxLength: [3, "Invalid country code"]
        },
        number: {
            type: String,
            validate: {
                validator: (v) => {
                    const userPattern = /^[0-9]{10}$/;
                    return userPattern.test(v);
                }, message: "Please enter valid phone number"
            }
        }

    },
    age: {
        type: Number,
        min: 18,
        max: 99
    },
    skills: {
        type: [String],
        unique: false,
        lowercase: true,
        trim: true,
        default: []
    },
    photourl: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg",
        validate: [validator.isURL, "Please enter valid url"]
    },
    bio: {
        type: String,
        default: null,
        maxLength: [100, "Bio should be less than 100 characters"]
    },
    password: {
        type: String,
        required: true,
        validate: [validator.isStrongPassword, "Password should be strong"]
    },
    gender: {
        type: String,
        validate: {
            validator: (value) => {
                const gender = ["Male", "Female", "Other"]
                if (gender.includes(value)) {
                    return true;
                } else {
                    throw new Error("Gender must be Male, Female or Other")
                }
            }

        }
    }

}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });
const User = mongoose.model('user', userSchema);

export { User }
