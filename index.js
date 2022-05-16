const buildNewProfileAndAlias = require('./newProfile')
const appendOrCreateSettings = require('./appendSettings')
const installExtensions = require('./extensions')
const installFont = require('./installFont')
const promptUser = require('./promptUser')

const setup = ({ newCodeProfile, codeAlias, pathToSettings, pathToFonts } = {}) => {
    if (newCodeProfile) {
        buildNewProfileAndAlias(codeAlias, pathToSettings)
            .then(() => installFont(pathToFonts))
            .then(() => installExtensions())
            .then(() => console.log('Alias created. Restart your terminal.'))
            .catch(console.log)
    } else {
        appendOrCreateSettings(pathToSettings)
            .then(() => installFont(pathToFonts))
            .then(() => installExtensions())
            .then(() => console.log('Done!'))
            .catch(console.log)
    }
}

promptUser(setup)

module.exports = setup