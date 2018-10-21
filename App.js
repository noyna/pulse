const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
const port = process.env.PORT || 3000

var database =[]

app.get("/" ,(req , res)  =>  {

    let co1 = coordinateCreator("16:00", 58)
    let co2 = coordinateCreator("16:05", 60)

    const result = [co1,co2]
    res.json(result)
})

app.post("/record",(req,res) => {
    const username = req.body.username
    const bpm = req.body.bpm


    const value = coordinateCreator(Date(),bpm,username)
    database.push(value)
    res.send()
})

app.get("/record/:username", (req, res) => {
    const result =  database.filter(value => value.username == req.params.username)
    res.json(result)
})

function coordinateCreator(time,bpm,username) {
    return {time: time, bpm: bpm, username: username}
}

app.listen(port)