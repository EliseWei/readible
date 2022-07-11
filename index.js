const buildNewProfileAndAlias = require('./src/newProfile')
const appendOrCreateSettings = require('./src/appendSettings')
const installExtensions = require('./src/extensions')
const installFont = require('./src/installFont')
const promptUser = require('./src/promptUser')
const config = require('./userconfig')

const setup = async ({ includeTracking, newCodeProfile, codeAlias, pathToSettings, pathToFonts } = {}) => {
  console.log('----------------------')
  try {
    if (newCodeProfile) {
      await buildNewProfileAndAlias(codeAlias, pathToSettings, includeTracking)
    } else {
      await appendOrCreateSettings(pathToSettings, includeTracking)
    }
    await installFont(pathToFonts)
    await installExtensions(includeTracking)
    console.log('🥳 Done!')
  } catch (err) {
    console.log(err)
  }
  console.log('----------------------')
}

if (config.newCodeProfile !== undefined) {
  console.log('Running with provided userconfig...')
  setup(config)
} else {
  promptUser(setup)
}

module.exports = setup
