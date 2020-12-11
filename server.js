const app = require('./app')
const fs = require('fs')
const https = require('https')

const opts = { 
    key: fs.readFileSync('server_key.pem'), 
    cert: fs.readFileSync('server_cert.pem'),
    requestCert: true,
    rejectUnauthorized: false,
    ca: [ 
        fs.readFileSync('server_cert.pem') 
    ]
}

const port = process.env.PORT || 3000

https.createServer(opts, app)
    .listen(port, () => console.log(`Server started on ${port}`))
