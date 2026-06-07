const express = require("express")
const dotenv = require("dotenv")


dotenv.config();
const app = express();
app.use(express.json());


const urlRoutes = require('./routes/url')
app.use('/api', urlRoutes)

app.listen(process.env.PORT, function(){
    console.log("working")
})