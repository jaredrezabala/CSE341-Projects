const mongodb = require('../modules/mongodb')
const mongoConnect = require('mongodb')
const ObjectId = mongoConnect.ObjectId
const BodyParser = require('body-parser')
const { Collection } = require('mongodb')

const getAll = async(req, res) =>{
        //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('users').find()
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users)
    })
}
const getSingle = async(req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId})
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users[0])
    })
}

const addNewUser = async(req, res) => {
    //#swagger.tags=['Users']
    const { firstName, lastName, email, favoriteColor, birthday } = req.body
    if(!firstName || !lastName || !email){
        res.status(400).json({message: 'Please fill in all fields.'})
    }
    const newUser = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    }
    try{
        const db = mongodb.getDatabase().db()
        const result = await db.collection('users').insertOne(newUser)
        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertedId
        })
    }catch(error){
        res.status(500).json({ message: 'Failed to add new user', error:error.message})
    }
}
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id)
    const  { firstName, lastName, email, favoriteColor, birthday } = req.body
    if(!firstName || !lastName || !email) {
        res.status(400).json({message: 'Please fill in all fields.'})
    }
    try{
        const updateUser = {
            $set: { firstName, lastName, email, favoriteColor, birthday }
        }

        const result = await mongodb.getDatabase().db().collection('users').updateOne({_id: userId},  updateUser)
        
        if(result.matchedCount === 0) {
            res.status(404).json({message: 'User not found.'})
        }
        res.status(200).json({
            message: 'User updated successfully',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        })
    } catch(error){
        res.status(500).json({ message: 'Failed to update user', error:error.message})
    } 
}
const deleteUser = async(req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id)
    try{
        const result = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId})
        if (result.deletedCount === 0){
            res.status(404).json({message: 'User not found.'})
        }
            res.status(200).json({
                message: 'User deleted successfully',
                deletedCount: result.deletedCount
            })
    }catch(error){
        res.status(500).json({ message: 'Failed to delete user', error:error.message})
    }
}
module.exports = {
    getAll,
    getSingle,
    addNewUser,
    updateUser,
    deleteUser
}