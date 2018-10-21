const express = require("express")
const bodyParser = require("body-parser")

const mongo = require('mongodb').MongoClient
const connection = "mongodb://noyna:noynanaja1503@ds237723.mlab.com:37723/heroku_jd1n2lm8"
const app = express()

app.use(bodyParser.json())
const port = process.env.PORT || 3000

// app.get("/" ,(req , res)  =>  {

//     let co1 = coordinateCreator("16:00", 58)
//     let co2 = coordinateCreator("16:05", 60)

//     const result = [co1,co2]
//     res.json(result)
// })

app.post("/record",(req,res) => {
    const username = req.body.username
    const bpm = req.body.bpm


    // const value = coordinateCreator(Date(),bpm,username)
    // database.push(value)

    insertUserBPM(username, bpm)
    res.send()
})

app.get("/record/:username", (req, res) => {
    // const result =  database.filter(value => value.username == req.params.username)
    // res.json(result)

    findBPMforUser(req.params.username, (result) => {
        res.json(result)
    })
 
})

function coordinateCreator(time,bpm,username) {
    return {time: time, bpm: bpm, username: username}
}

function findBPMforUser(username, callback) { 
    mongo.connect(connection,  { useNewUrlParser: true }, (error, database) => { 
        database.db("heroku_jd1n2lm8")
        .collection("BPM")
        .find({ username: username})
        .toArray((error, results)  =>  {

            const response = results.map((result)  => { 

                return{ timestamp: result.timestamp, username: result.username, bpm: result.bpm}
            })

            callback(response)
            
        })
    })
}

function insertUserBPM(username, bpm) {
    mongo.connect(connection, { useNewUrlParser: true }, (error, database)  => {
        database.db("heroku_jd1n2lm8")
        .collection("BPM")
        .insert({timestamp: (new Date()).getTime(), username: username, bpm: bpm})
    })
}

app.listen(port)