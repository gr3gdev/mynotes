const signToken = require('../serverAuth.js').signToken
const bcrypt = require('bcrypt')
const usersData = require('../datas/users.js')

module.exports = {
	authenticate: (req, res) => {
        console.log(`Authenticate request : ${req.body.username}`)
        const user = usersData.findByName(req.body.username)
        if (!user) {
            res.json({
                success: false, 
                message: "Username or password incorrect"
            })
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    console.error(err)
                }
                if (result) {
                    signToken(user, (err, token) => {
                        if (err) {
                            console.error(err)
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
	}
}