const { prompt } = require('enquirer')

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
        initial: `/Library/Fonts`
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
                    return prompt({
                        type: 'input',
                        name: 'pathToSettings',
                        message: 'Path to your new settings file:',
                        initial: `${process.env.HOME}/code_profiles/${secondAnswers.codeAlias}/`
                    })
                })
                .then(moreAnswers => onComplete({ ...responseCollection, ...moreAnswers }))
        } else {
            prompt(
                {
                    type: 'input',
                    name: 'pathToSettings',
                    message: 'Path to your settings file:',
                    initial: `${process.env.HOME}/Library/Application\ Support/Code/User/settings.json`

                }
            ).then(moreAnswers => onComplete({ ...responseCollection, ...moreAnswers }))
        }
    })
}

module.exports = promptUser