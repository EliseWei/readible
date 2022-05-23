const { access, copyFile } = require('fs/promises')
const { constants } = require('fs')
const path = require('path')

function installFont(pathToFonts) {
  const fontFileName = 'OpenDyslexicMono-Regular.otf'
  const pathToFontFile = path.join('resources', fontFileName)
  const pathToFontDestination = path.join(pathToFonts, fontFileName)

  console.log('copying font file...')
  return copyFile(
    path.resolve(__dirname, pathToFontFile),
    pathToFontDestination,
    constants.COPYFILE_EXCL
  ).catch(err => {
    if (err.message.match("file already exists")) {
      console.log('You already have this font.')
    } else {
      console.log("Oh no!", err)
    }
  })
}

module.exports = installFont
