const fs = require('fs')
const bcrypt = require('bcrypt-nodejs')
const file = 'users.json'
let users = []

generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = {
    init: (callback) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                console.log('Aucun utilisateur')
            }
            if (data) {
                users = JSON.parse(data)
            }
            callback(err)
        })
    },
    get: () => {
        return users
    },
    add: (user, callback) => {
        user.password = generateHash(user.password)
        users.push(user)
        fs.writeFile(file, JSON.stringify(users), (err) => {
            callback(err, user)
        })
    },
    findByName: (name) => {
        return users.filter(u => u.username === name)[0]
    }
}