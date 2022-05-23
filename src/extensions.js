const { exec } = require('child_process')

const extensions = [
  'SpeedyLom.dislexic-vscode',
  'streetsidesoftware.code-spell-checker',
  'vscode-icons-team.vscode-icons'
]

function installExtensions() {
  console.group('Installing extensions...')
  return Promise.all(extensions.map(extension => {
    return exec(`code --force --install-extension ${extension}`,
      { shell: process.env.SHELL },
      (error) => {
        if (error) {
          console.log(error)
          console.log('\x1b[41m\x1b[1m', `⚠️ Failed to install ${extension}`);
        }
      })
  }))
    .then(() => console.log('✅ Extensions installed'))
    .finally(() => console.groupEnd())
}
module.exports = installExtensions
