const path = require('path')
const os = require('os')

const getDefaultPaths = async () => {
  const codeSettings = path.join('Code', 'User', 'settings.json')
  const codeProfiles = path.join(os.homedir(), 'code_profiles')
  if (os.platform() === 'darwin') {
    // MacOS
    return {
      fonts: path.join('/Library', 'Fonts'),
      currentSettings: path.join(os.homedir(), 'Library', 'Application\ Support', codeSettings),
      codeProfiles
    }
  } else if (os.platform() === 'linux' && os.release().toLowerCase().includes('microsoft')) {
    // Windows subsystem linux
    const APPDATA = await $('wslvar', 'APPDATA')
    const winPath = await $('wslpath', `${APPDATA}`)
    return {
      fonts: path.join('/usr', 'share', 'fonts'),
      currentSettings: path.join(winPath, codeSettings),
      codeProfiles
    }
  } else {
    // Proper linux or anything else.
    return {
      fonts: path.join('/usr', 'share', 'fonts'),
      currentSettings: path.join(os.homedir(), '.config', codeSettings),
      codeProfiles
    }
  }
}

module.exports = getDefaultPaths
