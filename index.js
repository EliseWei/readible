const buildNewProfileAndAlias = require('./src/newProfile')
const appendOrCreateSettings = require('./src/appendSettings')
const installExtensions = require('./src/extensions')
const installFont = require('./src/installFont')
const promptUser = require('./src/promptUser')
const config = require('./userconfig')

const setup = ({ newCodeProfile, codeAlias, pathToSettings, pathToFonts } = {}) => {
  if (newCodeProfile) {
    buildNewProfileAndAlias(codeAlias, pathToSettings)
      .then(() => installFont(pathToFonts))
      .then(() => installExtensions())
      .then(() => console.log('Done!'))
      .catch(console.log)
  } else {
    appendOrCreateSettings(pathToSettings)
      .then(() => installFont(pathToFonts))
      .then(() => installExtensions())
      .then(() => console.log('Done!'))
      .catch(console.log)
  }
}

if (config.newCodeProfile !== undefined) {
  console.log('Running with provided userconfig...')
  setup(config)
} else {
  promptUser(setup)
}

module.exports = setup
