const mongoose = require("mongoose") 

const answerSchema = new mongoose.Schema({
    answer: {
        type: String, 
        unique: false,
        required: true, 
    },
    questionID: {
        type: String,
        required: true,
    },
    authorID: {
        type: String, 
        required: true, 
    },
    schema_version: {
        type: Number,
        default: 2,
    },
})

const answerModel = mongoose.model("answer", answerSchema) // creating the model from the schema

module.exports = answerModel // exporting the model