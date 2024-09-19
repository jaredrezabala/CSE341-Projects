const mongodb = require('../modules/mongodb')
const mongoConnect = require('mongodb')
const ObjectId = mongoConnect.ObjectId

const getAll = async(req, res) =>{
    const result = await mongodb.getDatabase().db().collection('users').find()
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users)
    })
}
const getSingle = async(req, res) => {
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId})
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users[0])
    })
}
module.exports = {
    getAll,
    getSingle
}