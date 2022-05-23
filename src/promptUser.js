const { prompt } = require('enquirer')
const path = require('path')

function promptUser(onComplete) {
  const responseCollection = {}
  prompt([{
    type: 'toggle',
    name: 'newCodeProfile',
    message: 'Use default code_profile or make a new one?',
    disabled: 'Use default',
    enabled: 'Create new'
  }, {
    type: 'input',
    name: 'pathToFonts',
    message: 'Path to your fonts:',
    initial: path.join('/Library', 'Fonts')
  }]).then(answers => {
    Object.assign(responseCollection, answers)
    if (answers.newCodeProfile) {
      prompt({
        type: 'input',
        name: 'codeAlias',
        message: 'Alias to run VS Code with new profile:',
        initial: 'demo'
      })
        .then((secondAnswers) => {
          Object.assign(responseCollection, secondAnswers)
          const pathToNewSettings = path.join(process.env.HOME, 'code_profiles', secondAnswers.codeAlias)
          return prompt({
            type: 'input',
            name: 'pathToSettings',
            message: 'Path to your new settings file:',
            initial: pathToNewSettings
          })
        })
        .then(moreAnswers => onComplete({ ...responseCollection, ...moreAnswers }))
    } else {
      const pathToOldSettings = path.join(process.env.HOME, 'Library', 'Application\ Support', 'Code', 'User', 'settings.json')
      prompt(
        {
          type: 'input',
          name: 'pathToSettings',
          message: 'Path to your settings file:',
          initial: pathToOldSettings

        }
      ).then(moreAnswers => onComplete({ ...responseCollection, ...moreAnswers }))
    }
  })
}

module.exports = promptUser
