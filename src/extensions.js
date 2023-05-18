const { exec } = require('child_process')

const extensions = [
  'SpeedyLom.dislexic-vscode',
  'streetsidesoftware.code-spell-checker',
  'vscode-icons-team.vscode-icons'
];

const trackingExtensions = [
  'Gruntfuggly.todo-tree',
  'ezrafree.markdown-preview',
  'bierner.markdown-checkbox'
];

const installExtensions = async (includeTracking) => {
  console.group('Installing extensions...')
  const extToInstall = includeTracking ? [...extensions, ...trackingExtensions] : extensions
  await Promise.all(extToInstall.map(extension => {
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
};
module.exports = installExtensions;
