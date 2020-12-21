const dateFormat = () => {
    const d = new Date()
    const month = `${d.getMonth() + 1}`.padStart(2, '0')
    const day = `${d.getDay()}`.padStart(2, '0')
    const hours = `${d.getHours()}`.padStart(2, '0')
    const minutes = `${d.getMinutes()}`.padStart(2, '0')
    const seconds = `${d.getSeconds()}`.padStart(2, '0')
    const millisecondes = `${d.getMilliseconds()}`.padStart(3, '0')
    return `${d.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}.${millisecondes}`
}

const info = (message) => {
    console.log(`${dateFormat()} [INFO] ${message}`)
}

const error = (message) => {
    console.log(`${dateFormat()} [ERROR] ${message}`)
}

module.exports = {
    info, error
}