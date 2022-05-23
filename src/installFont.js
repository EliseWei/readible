const { access, copyFile } = require('fs/promises')
const { constants } = require('fs')
const path = require('path')

function installFont(pathToFonts) {
  const fontFileName = 'OpenDyslexicMono-Regular.otf'
  const pathToFontFile = path.join('resources', fontFileName)
  const pathToFontDestination = path.join(pathToFonts, fontFileName)

  return access(pathToFonts, constants.W_OK)
    .then(() => {
      return copyFile(
        path.resolve(__dirname, pathToFontFile),
        pathToFontDestination,
        constants.COPYFILE_EXCL
      )
        .then(() => console.log('✅ Font file copied'))
        .catch(err => {
          if (err.message.match("file already exists")) {
            console.log('✅ You already have this font.')
          } else {
            console.log("❗️Oh no!", err)
          }
        })
    }).catch((err) => {
      console.log('🛑 No permission to write to fonts folder. You can change the permissions or manually copy')
      console.log(`${path.resolve(__dirname, pathToFontFile)} to\n${pathToFontDestination}`)
    })
}

module.exports = installFont
