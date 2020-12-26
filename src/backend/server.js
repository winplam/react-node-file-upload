const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const api = require('../backend/routes/user.routes')

// MongoDB Configuration
const dbURI = 'mongodb://localhost:27017/react-fileupload-db'
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.Promise = global.Promise
mongoose.connect(dbURI, dbOptions).then(() => {console.log('Database successfully connected')},
  error => {console.log('Database could not be connected: ' + error)})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// app.use('/public', express.static('public'))
app.use('/api', api)

const port = process.env.PORT || 4000
const server = app.listen(port, () => {console.log('Connected to port ' + port)})

app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {next(new Error('Something went wrong'))})
})

app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})
