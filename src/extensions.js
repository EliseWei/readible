const { exec } = require('child_process')

const extensions = [
  'SpeedyLom.dislexic-vscode',
  'streetsidesoftware.code-spell-checker',
  'vscode-icons-team.vscode-icons'
]

const installExtensions = async () => {
  console.group('Installing extensions...')
  await Promise.all(extensions.map(extension => {
    return exec(`code --force --install-extension ${extension}`,
      { shell: process.env.SHELL },
      (error) => {
        if (error) {
          console.log(error)
          console.log(`⚠️ Failed to install ${extension}`);
        }
      })
  }))
  console.log('✅ Extensions installed')
  console.groupEnd()
}
module.exports = installExtensions
