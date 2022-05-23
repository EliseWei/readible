const { writeFile, readFile } = require('fs/promises')
const additionalSettings = require('./resources/additionalSettings')

function appendOrCreateSettings(pathToSettings) {
  console.group('Creating settings...')
  return readFile(pathToSettings, { encoding: 'utf-8' })
    .then(contents => {
      // This is the append
      const originalSettings = JSON.parse(contents)
      const combinedSettings = { ...originalSettings, ...additionalSettings }
      return writeFile(pathToSettings, JSON.stringify(combinedSettings))
        .then(() => console.log('✅ Settings added'))
    })
    .catch(err => {
      if (err.message.match("Unexpected token")) {
        console.log(err, "\n❓ The most likely cause of this is slightly malformed JSON")
      } else if (err.message.match("no such file")) {
        console.log("🔎 No settings file found at the specified location. Creating a new one.")
        // This is the create
        return writeFile(pathToSettings, JSON.stringify(additionalSettings))
          .then(() => console.log('✅ Settings added'))
      } else {
        console.log("❗️ Oh no!", err)
      }
    })
    .finally(() => console.groupEnd())
}
module.exports = appendOrCreateSettings
