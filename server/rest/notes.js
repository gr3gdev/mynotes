const notesData = require('../datas/notes.js')

module.exports = {
    list: (req, res) => {
        res.json(notesData.get())
	},
	save: (req, res) => {
        notesData.save(req.body, (err, data) => {
            if (err) {
                res.status(500).send("Problem to save datas")
            } else {
                res.json(data)
            }
        })
	}
}