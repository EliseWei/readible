const { access, copyFile } = require('fs/promises')
const { constants } = require('fs')
const path = require('path')

const installFont = async (pathToFonts) => {
  console.group('Attempting to install fonts...')
  const fontFileName = 'OpenDyslexicMono-Regular.otf'
  const pathToFontFile = path.join('resources', fontFileName)
  const pathToFontDestination = path.join(pathToFonts, fontFileName)

  try {
    await access(pathToFonts, constants.W_OK)
    try {
      await copyFile(
        path.resolve(__dirname, pathToFontFile),
        pathToFontDestination,
        constants.COPYFILE_EXCL
      )
      console.log('✅ Font file copied')
    } catch (err) {
      if (err.message.match('file already exists')) {
        console.log('✅ You already have this font.')
      } else {
        console.log('❗️ Oh no!', err)
      }
    }
  } catch (err) {
    if (err.message.match('no such file or directory')) {
      console.log(`❗️ ${pathToFonts} does not exist. You can manually copy ${path.resolve(__dirname, pathToFontFile)}, when you're certain where it should go`)
    } else if (err.message.match('permission denied')) {
      console.log('🛑 No permission to write to fonts folder. You can change the permissions or manually copy')
      console.log(`${path.resolve(__dirname, pathToFontFile)} to\n${pathToFontDestination}`)
    } else {
      console.log('❗️ Oh no!', err)
    }
  }
  console.groupEnd()
}

module.exports = installFont
