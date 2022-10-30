const path = require('path')
const express = require('express')
const compression = require('compression')
const session = require('express-session')
const cors = require('cors')
const { morganLogger } = require('./middlewares/morgan')
const routes = require('./configs/routes')
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swaggers/doc');
const settings = require('./configs/settings')

const app = express()
app.use(compression())
app.use(express.json({ limit: '50mb' }))
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb'
  })
)
app.use(express.static(path.join(__dirname, '../public')))
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: settings.sessionSecret,
  })
)

app.use(cors())
app.options('*', cors())
app.use(morganLogger())

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes)

app.use((req, res) => {
  res.status(404).send({ url: `${req.path} not found` })
})

module.exports = app
