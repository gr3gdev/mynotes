const express = require('express')
const app = express()
const router = new express.Router()
const bodyParser = require('body-parser')

const notesRoutes = require('./routes/notes')
const usersRoutes = require('./routes/users')

const path = process.env.MYNOTES_CONTEXT || 'mynotes'

let url_notes = '/api/notes'
let url_users = '/api/users'
if (path.length > 0) {
    url_notes = `/${path}${url_notes}`
    url_users = `/${path}${url_users}`
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('./client'))

app.use(url_notes, notesRoutes)
app.use(url_users, usersRoutes)
app.use('/*', (req, res) => {
    res.sendFile(`${path}/index.html`, {root: './client'});
})

module.exports = app
