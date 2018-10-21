const express = require("express")
const app = express()

app.get("/" ,(req , res)  =>  {

    let co1 = coordinateCreator("16:00", 58)
    let co2 = coordinateCreator("16:05", 60)

    const result = [co1,co2]
    res.json(result)
})

function coordinateCreator(time,bpm) {
    return {time: time, bpm: bpm}
}

app.listen(3000)