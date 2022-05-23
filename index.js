const buildNewProfileAndAlias = require('./src/newProfile')
const appendOrCreateSettings = require('./src/appendSettings')
const installExtensions = require('./src/extensions')
const installFont = require('./src/installFont')
const promptUser = require('./src/promptUser')

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
