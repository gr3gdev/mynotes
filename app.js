const express = require('express')
const app = express()

const NotesController = require('./rest/NotesController')

app.use('/api/notes', NotesController)

app.use('/*', (req, res) => {
    const cert = req.connection.getPeerCertificate()
    if (req.client.authorized) {
        const path = req.params[0] ? req.params[0] : 'index.html'
        res.sendFile(path, {root: './build'});
    } else if (cert.subject) {
        res.status(403)
		   .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
    } else {
        res.status(401)
		   .send(`Sorry, but you need to provide a client certificate to continue.`)
    }
})

module.exports = app