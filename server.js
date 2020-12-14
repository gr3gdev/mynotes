const app = require('./app')
const fs = require('fs')
const https = require('https')

const sslDir = process.env.SSL_DIR || '/app/ssl'
const opts = { 
    key: fs.readFileSync(`${sslDir}/server_key.pem`), 
    cert: fs.readFileSync(`${sslDir}/server_cert.pem`),
    requestCert: true,
    rejectUnauthorized: false,
    ca: [ 
        fs.readFileSync(`${sslDir}/server_cert.pem`) 
    ]
}

https.createServer(opts, app)
    .listen(3000, () => console.log(`Server started on 3000`))
