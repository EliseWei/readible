const appendOrCreateSettings = require('./appendSettings')
const { mkdir, appendFile } = require('fs/promises')

function createNewProfile(codeAlias, pathToSettings) {
    const dataPath = pathToSettings + 'data/User'
    return mkdir(dataPath, { recursive: true })
        .then(() => {
            console.log('creating settings...')
            return appendOrCreateSettings(dataPath + '/settings.json')
        })
        .then(() => {
            console.log('creating alias...')
            const aliasString = `alias ${codeAlias}="code --user-data-dir ${pathToSettings}"\n`
            const path = process.env.HOME + '/.zshrc'
            return appendFile(path, aliasString)
        })
}

module.exports = createNewProfile