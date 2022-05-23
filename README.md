# Readible

A tool for quickly setting up a baseline for a more readable VS Code experience. This includes many customizations recommended for users with dyslexia, including VS Code extensions, a lower-contrast color theme, and an open-source typeface. Different adjustments will work for different people, so this is **only a starting point**. I highly recommend testing additional customizations to see what works best.

## To use
- Clone the repo, `npm install`, and `node .` from the root of the project.
- Follow the prompts (sensible defaults have been inferred, where possible):
  1. Either modify your default code profile or create a new one. A new one is useful if you want to use the accessible settings separately from your existing setup, for example, only when doing live code demos.
  2. Where you'd like your new font file to go. Probably with your other fonts.
  3. If creating a new code profile, what command you'd like to use to run it, and where you'd like it to be stored.
  4. If not creating a new code profile, where to find your existing settings.
- The script should install everything and provide some useful feedback. You may need to manually add the new alias for a new code profile (Windows users, especially).

Alternately, the object in userconfig.js can be un-commented and populated with the same information, if you prefer, before running `node i`

You will either see an immediate change in your VS Code appearance (if you chose to modify your default code profile) or you can run your chosen command to start a new instance of VS Code which will use the alternate profile.

## Acknowledgements
- Jenn Hall for [Personalising VSCode for Dyslexia](https://jenn-hall.medium.com/personalising-vscode-for-dyslexia-60aac1a36b4d) from which _many_ suggestions have been drawn
- SpeedyLom for his [dislexic color theme](https://github.com/SpeedyLom/dislexic-vscode), which I have customized only slightly
- The fine folks who created [the Open Dyslexic typeface](https://www.opendyslexic.org/)
