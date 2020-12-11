const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const fs = require('fs')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

fs.readFile('notes.json', (err, data) => {
    let notes = []
    if (err) {
        console.log('Aucune note')
    }
    if (data) {
        notes = JSON.parse(data)
    }
    
    // SAVE NOTES
    router.post('/', (req, res) => {
        notes = req.body
        fs.writeFile('notes.json', JSON.stringify(notes), (err) => {
            if (err) {
                res.status(500).send("Problem to save datas")
            }
        })
        res.status(200).send(notes)
    })

    // RETURNS ALL THE NOTES
    router.get('/', (req, res) => {
        res.status(200).send(notes)
    })
})


module.exports = router