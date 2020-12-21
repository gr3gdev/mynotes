const bcrypt = require('bcryptjs')
const logger = require('../logger')
const signToken = require('../serverAuth').signToken
const usersData = require('../datas/users')

module.exports = {
	authenticate: (req, res) => {
        logger.info(`Authenticate request : ${req.body.username}`)
        usersData.findByName(req.body.username, (user) => {
            if (!user) {
                res.json({
                    success: false, 
                    message: "Username or password incorrect"
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        logger.error(`Error when validate user : ${err}`)
                    }
                    if (result) {
                        signToken(user, (err, token) => {
                            if (err) {
                                logger.error(`Error when sign token : ${err}`)
                            } else {
                                res.json({
                                    success: true,
                                    message: "Login successful",
                                    token
                                })
                            }
                        })
                    } else {
                        res.json({
                            success: false, 
                            message: "Username or password incorrect"
                        })
                    }
                })
            }
        })
	}
}
