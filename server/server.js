const app = require('./app')
const usersData = require('./datas/users.js')
const notesData = require('./datas/notes.js')

app.listen(3000, () => {
    console.log('Server started on 3000')
    // Init user
    const username = process.env.MYNOTES_USERNAME || 'user'
    const password = process.env.MYNOTES_PASSWORD || 'password'
    notesData.init((e) => {
        console.log('Notes intialised')
    })
    usersData.init((e) => {
        if (e) {
            usersData.add({
                username: username,
                password: password
            }, (err) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log('User created')
                }
            })
        }
    })
})
