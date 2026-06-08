const express = require("express")
const dotenv = require("dotenv")




const redis = require('./redis');

async function start() {
    await redis.connect();

    app.listen(3000, () => {
        console.log('Server running');
    });
}

start();








dotenv.config();
const app = express();
app.use(express.json());


const urlRoutes = require('./routes/url')
app.use('/api', urlRoutes)

app.listen(process.env.PORT, function(){
    console.log("working")
})
