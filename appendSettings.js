const { writeFile, readFile } = require('fs/promises')
const additionalSettings = require('./additionalSettings')

function appendOrCreateSettings(pathToSettings) {
    return readFile(pathToSettings, { encoding: 'utf-8' })
        .then(contents => {
            const originalSettings = JSON.parse(contents)
            const combinedSettings = { ...originalSettings, ...additionalSettings }
            return writeFile(pathToSettings, JSON.stringify(combinedSettings))
        })
        .catch(err => {
            if (err.message.match("Unexpected token")) {
                console.log(err, "\nThe most likely cause of this is slighty malformed JSON")
            } else if (err.message.match("no such file")) {
                console.log("No settings file found at the specified location. Creating a new one.")
                return writeFile(pathToSettings, JSON.stringify(additionalSettings))
            } else {
                console.log("Oh no!", err)
            }
        })
}
module.exports = appendOrCreateSettings