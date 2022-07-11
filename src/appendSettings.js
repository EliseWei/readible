const { writeFile, readFile } = require('fs/promises')
const additionalSettings = require('./resources/additionalSettings')
const trackingSettings = require('./resources/trackingSettings')

const appendOrCreateSettings = async (pathToSettings, includeTracking) => {
  console.group('Creating settings...')
  const settingsToAdd = includeTracking ? { ...trackingSettings, ...additionalSettings } : additionalSettings
  try {
    const contents = await readFile(pathToSettings, { encoding: 'utf-8' })
    // This is the append
    const originalSettings = JSON.parse(contents)
    const combinedSettings = { ...originalSettings, ...settingsToAdd }
    await writeFile(pathToSettings, JSON.stringify(combinedSettings))
    console.log('✅ Settings added')
  } catch (err) {
    if (err.message.match('Unexpected token')) {
      console.log(err, '\n❓ The most likely cause of this is slightly malformed JSON')
    } else if (err.message.match('no such file')) {
      console.log('🔎 No settings file found at the specified location. Creating a new one.')
      // This is the create
      try {
        await writeFile(pathToSettings, JSON.stringify(settingsToAdd))
        console.log('✅ Settings added')
      } catch (err) {
        console.log('❗️ Oh no!', err)
      }
    } else {
      console.log('❗️ Oh no!', err)
    }
  }
  console.groupEnd()
}
module.exports = appendOrCreateSettings
