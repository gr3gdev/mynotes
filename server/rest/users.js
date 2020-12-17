const signToken = require('../serverAuth.js').signToken
const bcrypt = require('bcrypt-nodejs')
const usersData = require('../datas/users.js')

validPassword = (user, password) => {
	return bcrypt.compareSync(password, user.password)
}

module.exports = {
	authenticate: (req, res) => {
        const user = usersData.findByName(req.body.username)
        if (!user || !validPassword(user, req.body.password)) {
            res.json({
                success: false, 
                message: "Username or password incorrect"
            })
        } else {
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
        }
	}
}