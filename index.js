const express = require("express");
const cors = require("cors");
const path = require("path")
const bodyParser = require('body-parser');
const {getFormattedWeatherData} = require('./weather.js')

const app = express();
require('dotenv').config()
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Setting Route
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + "/index.html"))
})

app.post('/find', async (req, res)=>{
    const city = req.body.city
    const unit = req.body.unit
    const data = await getFormattedWeatherData(city, unit)
    res.json(data)
})
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Listening on port 8000');
})