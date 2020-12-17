const fs = require('fs')
const file = 'notes.json'
let notes = []

module.exports = {
    init: (callback) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                console.log('Aucune note')
            }
            if (data) {
                notes = JSON.parse(data)
            }
            callback(err)
        })
    },
    get: () => {
        return notes
    },
    save: (newNotes, callback) => {
        notes = newNotes
        fs.writeFile(file, JSON.stringify(notes), (err) => {
            callback(err, notes)
        })
    }
}