const express = require('express');
const app = express();
require('dotenv').config()
const mongodb = require('./modules/mongodb')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
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