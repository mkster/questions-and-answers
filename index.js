
const express = require("express") // our express server
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 3001 // port that the server is running on => localhost:3001
const db = require("./models/")
const path = require('path');
const cors = require("cors")
const { connect } = require("mongoose")


app.use(cors())
app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload

function success(res, payload) {
    return res.status(200).json(payload)
}

//get all
app.get("/questions", async (req, res, next) => {
    try {
        const teams = await db.Question.find({})
        return success(res, teams)
    } catch (err) {
        next({ status: 400, message: err })
    }
})

//answers to question id
app.get("/question/:id/answers", async (req, res, next) => {
    try {
        let questionID = req.params.id
        const teams = await db.Answer.find({ questionID: questionID})
        return success(res, teams)
    } catch (err) {
        next({ status: 400, message: err })
    }
})

//answer to question id by author
app.get("/question/:questionID/answers/:authorID", async (req, res, next) => {
    try {
        const questionID = req.params.questionID
        const authorID = req.params.authorID;
        const teams = await db.Answer.findOne({ questionID: questionID, authorID: authorID })
        return success(res, teams)
    } catch (err) {
        next({ status: 400, message: err })
    }
})



//create
app.post("/question", async (req, res, next) => {
    try {
        const question = await db.Question.create(req.body)
        return success(res, question)
    } catch (err) {
        next({ status: 400, message: "err is " + err })
    }
})

//create
app.post("/answer", async (req, res, next) => {
    try {
        const answer = await db.Answer.create(req.body)
        return success(res, answer)
    } catch (err) {
        next({ status: 400, message: err })
    }
})

//send frontend
app.use(express.static('./frontend/build'));

// If no API routes are hit, send the React app, this doenst work but doesnt seem neccesary?
app.use(function (req, res) {
    const uid = path.join(__dirname, './frontend/build/index.html')
    res.sendFile(uid);
});


//idk if this can still be reached with the above
app.use((err, req, res, next) => {
    console.log("other: " + err.status + " " + err.message)
    return res.status(err.status || 400).json({
        status: err.status || 400,
        message: err.message || "there was an error processing request",
    })
})


app.listen(PORT, () => {
    // listening on port 3000
    console.log(`listening on port ${PORT}`) // print this when the server starts
})