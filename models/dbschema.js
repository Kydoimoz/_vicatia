import mongoose, { models, Schema } from "mongoose";
import ExamplePics from "../../vicatia/public/images/paw.png";
const dataSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    services: {
        type: [String],
        default: () => [],
    }
    ,
    pets_sit: {
       type: [String],
       default: () => [], 
    },
    workplaces: {
        type: [String],
        default: () => [],
    }
    ,
    description: {
        type: String,
        default: "i love exploring the animal world!", 
    },
    mypets: {
        type: [Object],
        default: [],
    }
    ,
    amount_pet:  {
        type: Number,
        default: 0,
    }
    ,
    image: {
        type: String,
        default: "https://static.wikia.nocookie.net/jorjorswackyjourney/images/3/30/Rihqw92yzpoypx8azfvc.png/revision/latest?cb=20180715145752", 
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    newsletter: {
        type: Boolean,
        required: [true, "newsletter must be checked.."]
    },
    lastName: {
        type: String,
        required: [true, "surname is required"]
    },
    verificationToken: {
        type: String,
        required: [true, "verification is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    expirationTime: {
        type: Date,
        required: true,
    }
    ,
    phoneNumber: {
        type: String,
        required: [true, "phonenumber is required"]
    },
    birthDate: {
        type: Date,
        required: [true, "birth date is required"]
    }
    ,
    country: {
        type: String,
        required: [true, "country is required"]
    },
    city: {
        type: String,
        required: [true, "city is required"]
    },
    gender: {
        type: String,
        required: [true, "gender is required"]
    },

}, { timestamps: true });
const User = (models && models.Users) ? models.Users : mongoose.model("Users", dataSchema);

module.exports = User;