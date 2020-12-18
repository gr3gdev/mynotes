const fs = require('fs')
const bcrypt = require('bcrypt')
const file = 'users.json'

let users = []

module.exports = {
    init: (callback) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                console.error('Aucun utilisateur')
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
        console.log(`Add user : ${user.username}`)
        bcrypt.hash(user.password, 8, (err, hash) => {
            if (err) {
                console.error(err)
            } else {
                user.password = hash
                users.push(user)
                fs.writeFile(file, JSON.stringify(users), (err) => {
                    callback(err, user)
                })
            }
        })
    },
    findByName: (name) => {
        return users.filter(u => u.username === name)[0]
    }
}