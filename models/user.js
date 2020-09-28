const mongoose = require("mongoose") 

const userSchema = new mongoose.Schema({
    auth0ID: {
        type: String, 
        unique: true,
        required: true, 
    },
})

const userModel = mongoose.model("user", userSchema) // creating the model from the schema

module.exports = userModel // exporting the model