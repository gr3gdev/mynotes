const express = require('express')
const app = express()
const router = new express.Router()
const bodyParser = require('body-parser')

const notesRoutes = require('./routes/notes')
const usersRoutes = require('./routes/users')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/notes', notesRoutes)
app.use('/api/users', usersRoutes)
app.use('/*', (req, res) => {
    const path = req.params[0] ? req.params[0] : 'index.html'
    res.sendFile(path, {root: './client'});
})

module.exports = app
