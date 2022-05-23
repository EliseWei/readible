const { exec } = require('child_process')

const extensions = [
  'SpeedyLom.dislexic-vscode',
  'streetsidesoftware.code-spell-checker',
  'vscode-icons-team.vscode-icons'
]

function installExtensions() {
  console.log(`installing extensions...`)
  Promise.all(extensions.map(extension => {
    return exec(`code --force --install-extension ${extension}`,
      { shell: '/bin/zsh' },
      (error) => {
        if (error) {
          console.log(error)
          console.log('\x1b[41m\x1b[1m', `⚠️ Failed to install ${extension}`);
        }
      })
  }))
}
module.exports = installExtensions
