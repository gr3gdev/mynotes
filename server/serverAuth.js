const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.MYNOTES_JWT_SECRET || 'secret_to_be_defined'
const usersData = require('./datas/users.js')

function signToken(user, callback) {
	delete user.password
    jwt.sign(user, JWT_SECRET, {
        expiresIn: '1h'
    }, (err, token) => callback(err, token))
}

function verifyToken(req, res, next) {
	const token = req.get('token') || req.body.token || req.query.token
	if (!token) {
        res.sendStatus(403)
    } else {
        jwt.verify(token, JWT_SECRET, (err, decodedData) => {
            if (err) {
                res.status(403).send("Not authorized")
            } else {
                const user = usersData.findByName(decodedData.username)
                if (!user) {
                    res.status(403).send("Not authorized")
                } else {
                    req.user = user
                    next()
                }
            }
        })
    }
}

module.exports = {
	signToken,
	verifyToken
}