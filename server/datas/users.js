const fs = require('fs')
const bcrypt = require('bcryptjs')
const logger = require('../logger')

const file = 'data/users.json'

function read(callback) {
    let users = []
    fs.readFile(file, (err, data) => {
        if (err) {
            logger.info('Aucun utilisateur')
        }
        if (data) {
            users = JSON.parse(data)
        }
        callback(err, users)
    })
}

function add(user, callback) {
    read((err, users) => {
        logger.info(`Add user : ${user.username}`)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    logger.error(`Error when encrypt user datas : ${err}`)
                } else {
                    user.password = hash
                    users.push(user)
                    fs.writeFile(file, JSON.stringify(users), (err) => {
                        callback(err, user)
                    })
                }
            })
        })
    })
}

function findByName(name, callback) {
    read((err, users) => {
        const filter = users.filter(u => u.username === name)
        let user = null
        if (filter.length === 1) {
            user = filter[0]
        } else if (filter.length > 1) {
            logger.error('More than one user with username=${name}')
        }
        callback(user)
    })
}

module.exports = {
    read,
    add,
    findByName
}
