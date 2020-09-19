const mongoose = require("mongoose") 

const answerSchema = new mongoose.Schema({
    answer: {
        type: String, 
        unique: true,
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
})

const answerModel = mongoose.model("answer", answerSchema) // creating the model from the schema

module.exports = answerModel // exporting the model