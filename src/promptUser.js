const { prompt } = require('enquirer')
const path = require('path')

const promptUser = async (onComplete) => {
  const responseCollection = {}
  try {
    const fontPathDefault = process.platform === 'win32'
      ? path.join('/usr', 'share', 'fonts')
      : path.join('/Library', 'Fonts')
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
      initial: fontPathDefault
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
      const pathToNewSettings = path.join(process.env.HOME, 'code_profiles', secondAnswers.codeAlias)
      const moreAnswers = await prompt({
        type: 'input',
        name: 'pathToSettings',
        message: 'Path to your new settings file:',
        initial: pathToNewSettings
      })
      Object.assign(responseCollection, moreAnswers)
    } else {
      const pathToOldSettings = path.join(process.env.HOME, 'Library', 'Application\ Support', 'Code', 'User', 'settings.json')
      const moreAnswers = await prompt(
        {
          type: 'input',
          name: 'pathToSettings',
          message: 'Path to your settings file:',
          initial: pathToOldSettings

        }
      )
      Object.assign(responseCollection, moreAnswers)
    }
    onComplete(responseCollection)
  } catch (err) {
    console.log('Process cancelled')
  }
}

module.exports = promptUser
