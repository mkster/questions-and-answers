const mongoose = require("mongoose")

//pushed to heroku likle this: https://medium.com/crowdbotics/deploy-a-mern-stack-app-on-heroku-b0c255744a70
//heroko thingy: stormy-hollows-66753
//heroku config:set MONGODB_URI=mongodb+srv://max:ggWxuDqlrbGk3WzQ@cluster0.zq8om.mongodb.net/Cluster0 -a stormy-hollows-66753


const db ='mongodb+srv://max:ggWxuDqlrbGk3WzQ@cluster0.zq8om.mongodb.net/Cluster0?retryWrites=true&w=majority'
//const db = "mongodb://localhost/QuestionsAndAnswers"
mongoose.connect(db, {
    keepAlive: true, // keeping the connection alive
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Question = require("./question") // requiring the todo model that we just created in mongodb
module.exports.Answer = require("./answer") // requiring the todo model that we just created in mongodb
