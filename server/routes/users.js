const express = require('express')
const usersRouter = new express.Router()
const usersRest = require('../rest/users.js')

usersRouter.post('/authenticate', usersRest.authenticate)

module.exports = usersRouter