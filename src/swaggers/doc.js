const swaggerJsDoc = require('swagger-jsdoc')
require('dotenv').config()

const swaggerDefinition = {
  info: {
    title: 'API Facebook Clone',
    version: '1.0.0',
    description: 'This is the REST API for project Facebook Clone',
  },
  host: process.env.API_HOST,
  basePath: '/api',
  tags: [
    {
      name: 'Academic Sessions',
      description: 'Manage academic sessions',
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      schema: 'bearer',
      name: 'Authorization',
      in: 'header',
      prefix: 'Bearer ',
    },
  },
  definitions: {},
}

const options = {
  swaggerDefinition,
  explorer: true,
  apis: ['**/*.js'],
}
module.exports = swaggerJsDoc(options)
