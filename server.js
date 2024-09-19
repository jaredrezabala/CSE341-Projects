const express = require('express');
const app = express();
require('dotenv').config()
const mongodb = require('./modules/mongodb')


app.use("/", require('./routes'))

mongodb.initDB((err) => {
    if(err) {
        console.log(err)
    }
    else{
        app.listen(process.env.PORT, ()=>{
            console.log(`Server and Database running on http://${process.env.HOST}:${process.env.PORT}`)})
    }
})

app.get("/", (req, res) =>{
    res.send("Hello World");
})