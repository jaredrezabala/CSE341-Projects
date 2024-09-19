require('dotenv').config()

const MongoClient = require('mongodb').MongoClient

let database;

const initDB = (callback) => {
    if (database){
        console.log('DB is already initialized!')
        return callback(null, database)
    }
    MongoClient.connect(process.env.MONGO_URL)
    .then(client => {
        database = client
        callback(null, database)
    })
    .catch(err => {
        callback(err)
    })
}
const getDatabase = () => {
    if (!database){
       throw Error('Database is not initizialed')
    }
    return database
}
module.exports = {
    initDB,
    getDatabase
} 