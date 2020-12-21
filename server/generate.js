module.exports = (characters, size) => {
    const charactersLength = characters.length
    let result = ''
    let last = -1
    let same = 0
    for (let i = 0; i < size; i++) {
        let rand = Math.floor(Math.random() * charactersLength)
        if (last === rand) {
            same++
        }
        while (last === rand && same > 1) {
            rand = Math.floor(Math.random() * charactersLength)
        } 
        if (last !== rand) {
            same = 0
        }
        result += characters.charAt(rand)
        last = rand
    }
    return result
}