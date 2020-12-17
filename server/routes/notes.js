const express = require('express')
const notesRouter = new express.Router()
const notesRest = require('../rest/notes.js')
const verifyToken = require('../serverAuth.js').verifyToken

const fs = require('fs')

notesRouter.use(verifyToken)
notesRouter.route('/')
    .get(notesRest.list)
    .post(notesRest.save)

module.exports = notesRouter