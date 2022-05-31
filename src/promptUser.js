const { prompt } = require('enquirer')
const path = require('path')
const getDefaultPaths = require('./getDefaultPaths')

const promptUser = async (onComplete) => {
  const responseCollection = {}
  const defaultPaths = await getDefaultPaths()
  try {
    const answers = await prompt([{
      type: 'toggle',
      name: 'newCodeProfile',
      message: 'Use default code_profile or make a new one?',
      disabled: 'Use default',
      enabled: 'Create new'
    }, {
      type: 'input',
      name: 'pathToFonts',
      message: 'Path to your fonts:',
      initial: defaultPaths.fonts
    }])
    Object.assign(responseCollection, answers)
    if (answers.newCodeProfile) {
      const secondAnswers = await prompt({
        type: 'input',
        name: 'codeAlias',
        message: 'Alias to run VS Code with new profile:',
        initial: 'demo'
      })
      Object.assign(responseCollection, secondAnswers)
      const pathToNewSettings = path.join(defaultPaths.codeProfiles, secondAnswers.codeAlias)
      const moreAnswers = await prompt({
        type: 'input',
        name: 'pathToSettings',
        message: 'Path to your new settings file:',
        initial: pathToNewSettings
      })
      Object.assign(responseCollection, moreAnswers)
    } else {
      const moreAnswers = await prompt(
        {
          type: 'input',
          name: 'pathToSettings',
          message: 'Path to your settings file:',
          initial: defaultPaths.currentSettings

        }
      )
      Object.assign(responseCollection, moreAnswers)
    }
    onComplete(responseCollection)
  } catch (err) {
    console.log('Process cancelled')
    console.log(err)
  }
}

module.exports = promptUser
