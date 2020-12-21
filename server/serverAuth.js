const jwt = require('jsonwebtoken')
const fs = require('fs')
const logger = require('./logger')
const usersData = require('./datas/users')
const generate = require('./generate')

const file = 'data/token'

const getJwtSecret = (callback) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            // Create jwt secret
            const jwtSecret = generate('@?.aAzZ&eEéèRrTtYyUuùIiOoPpQqSsDdFfGgHhJjKkLlMmWwXxCcçVvBbNn#_-0129384756:!', 128)
            fs.writeFile(file, jwtSecret, (err) => {
                if (err) {
                    logger.error(`Error when generate JWT : ${err}`)
                } else {
                    callback(jwtSecret)
                }
            })
        } else {
            callback(data)
        }
    })
}

function signToken(user, callback) {
	delete user.password
    getJwtSecret((secret) => {
        jwt.sign(user, secret, {
            expiresIn: '1h'
        }, (err, token) => callback(err, token))
    })
}

function verifyToken(req, res, next) {
	const token = req.get('token') || req.body.token || req.query.token
	if (!token) {
        res.sendStatus(403)
    } else {
        getJwtSecret((secret) => {
            jwt.verify(token, secret, (err, decodedData) => {
                if (err) {
                    res.status(403).send("Not authorized")
                } else {
                    usersData.findByName(decodedData.username, (user) => {
                        if (!user) {
                            res.status(403).send("Not authorized")
                        } else {
                            req.user = user
                            next()
                        }
                    })
                }
            })
        })
    }
}

module.exports = {
	signToken,
	verifyToken
}