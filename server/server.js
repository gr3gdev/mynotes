const app = require('./app')
const fs = require('fs')
const logger = require('./logger')
const usersData = require('./datas/users')
const notesData = require('./datas/notes')

app.listen(3000, () => {
    logger.info('Server started on 3000')
    // Init user
    const username = process.env.MYNOTES_USERNAME || 'user'
    notesData.init((e) => {
        logger.info('Notes intialised')
    })
    usersData.read((e, users) => {
        if (e) {
            fs.readFile('data/configure', 'utf8', (err, data) => {
                if (err) {
                    logger.error(`Error when read configure file : ${err}`)
                } else {
                    usersData.add({
                        username: username,
                        password: data.replace(/\r|\n/g, '')
                    }, (err) => {
                        if (err) {
                            logger.error(`Error when add user : ${err}`)
                        } else {
                            logger.info('User created')
                            fs.unlink('data/configure', (err) => {
                                if (err) {
                                    logger.error(`Error when remove configure file : ${err}`)
                                } else {
                                    logger.info('Configure file removed')
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
