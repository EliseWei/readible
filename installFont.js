const { access, copyFile } = require('fs/promises')
const { constants } = require('fs')

function installFont(pathToFonts) {
    const fontFileName = '/OpenDyslexicMono-Regular.otf'
    console.log('copying font file...')
    copyFile('.' + fontFileName, pathToFonts + fontFileName, constants.COPYFILE_EXCL)
        .catch(err => {
            if (err.message.match("file already exists")) {
                console.log('You already have this font.')
            } else {
                console.log("Oh no!", err)
            }
        })
}

module.exports = installFont