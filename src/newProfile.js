const appendOrCreateSettings = require('./appendSettings')
const { mkdir, appendFile, readFile } = require('fs/promises')
const path = require('path')

function createNewProfile(codeAlias, pathToSettings) {
  const dataPath = path.join(pathToSettings, 'data', 'User')
  return mkdir(dataPath, { recursive: true })
    .then(() => {
      return appendOrCreateSettings(path.join(dataPath, 'settings.json'))
    })
    .then(() => {
      console.group('Creating alias...')
      const aliasString = `alias ${codeAlias}="code --user-data-dir ${path.join(pathToSettings, 'data')}"\n`
      const shellConfig = `.${path.basename(process.env.SHELL)}rc`
      const aliasPath = path.join(process.env.HOME, shellConfig)
      console.log(`🔎 Looking for config at ${aliasPath}`)
      return readFile(aliasPath, { encoding: 'utf-8' })
        .then(contents => {
          return appendFile(aliasPath, aliasString)
            .then(() => console.log('✅ Alias created. Restart your terminal.'))
        })
        .catch(err => {
          console.log(`❗️ No config file found at ${aliasPath}`)
          console.log(`Please add the following to your aliases:\n ${aliasString}`)
        })
        .finally(() => console.groupEnd())
    })
}

module.exports = createNewProfile
