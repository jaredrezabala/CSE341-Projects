const express = require('express')
const router = express.Router()

router.get("/", (req, res) =>{
    //#swagger.tags=['Hello World']
    res.send('Hello World')})

router.use("/users", require("./users"))
module.exports = router