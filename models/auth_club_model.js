const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    clubName: {
        type: String,
        trim: true,
        required: [true, "Must provide clubname"],
        unique: [true, "Clubname should be unique."]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Must provide email."],
        unique: [true, "Email should be unique."]
    },
    password: {
        type: String,
        required: [true, "Must provide password"],
        minlength: [6, "Length of password should be atleast 6 characters."]
    },
    imageUri: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },
    description: {
        type: String,
        default: "No description provided."
    }
});

module.exports = mongoose.model("clubAuthentication", schema);