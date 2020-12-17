const express = require('express')
const app = express()
const router = new express.Router()
const bodyParser = require('body-parser')

const notesRoutes = require('./routes/notes')
const usersRoutes = require('./routes/users')

app.use(express.static(`${__dirname}/client`))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/notes', notesRoutes)
app.use('/api/users', usersRoutes)
app.use('*', (req, res) => {
    res.sendFile(`${__dirname}/client/index.html`)
})

module.exports = app