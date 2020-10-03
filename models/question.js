const mongoose = require("mongoose") // requiring the mongoose package

const questionSchema = new mongoose.Schema({
    question: {
        type: String, 
        //unique: true,
        required: true, 
    },
    authorID: {
        type: String, 
        required: true,
    },
    schema_version: {
        type: Number,
        default : 2,
    },
})

const questionModel = mongoose.model("question", questionSchema) // creating the model from the schema

module.exports = questionModel // exporting the model