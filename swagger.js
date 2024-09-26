const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config()

const doc = {
    info: {
        title: 'API Documentation',
        description: 'API Documentation for the project',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
}
const outputFile = "./swagger.json"
const routes = ["./routes/index"]

swaggerAutogen(outputFile, routes, doc)