const appendOrCreateSettings = require('./appendSettings')
const { mkdir, appendFile, readFile } = require('fs/promises')
const path = require('path')

const createNewProfile = async (codeAlias, pathToSettings, includeTracking) => {
  const dataPath = path.join(pathToSettings, 'data', 'User')
  try {
    await mkdir(dataPath, { recursive: true })
    await appendOrCreateSettings(path.join(dataPath, 'settings.json'), includeTracking)
  } catch (err) {
    console.log('Failed to create a new profile\n', err)
  }

  console.group('Creating alias...')
  const aliasString = `alias ${codeAlias}="code --user-data-dir ${path.join(pathToSettings, 'data')}"\n`
  const shellConfig = `.${path.basename(process.env.SHELL)}rc`
  const aliasPath = path.join(process.env.HOME, shellConfig)
  console.log(`🔎 Looking for config at ${aliasPath}`)
  try {
    await readFile(aliasPath, { encoding: 'utf-8' })
    try {
      await appendFile(aliasPath, aliasString)
      console.log('✅ Alias created. Restart your terminal in order to use it.')
    } catch (err) {
      console.log('❗️Oh no!', err)
    }
  } catch (err) {
    console.log(`❗️ No config file found at ${aliasPath}`)
    console.log(`Please add the following to your aliases:\n ${aliasString}`)
  }
  console.groupEnd()
}

module.exports = createNewProfile
