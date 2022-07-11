module.exports = {
  "todo-tree.regex.regex": "(//|#|<!--|;|/\\*|^|^[ \\t]*(-|\\d+.))\\s*($TAGS)",
  "todo-tree.general.tags": [
    "TODO",
    "[ ]",
    "[x]"
  ],
  "todo-tree.highlights.customHighlight": {
    "TODO": {
      "iconColour": "#e8426e",
      "icon": "circle"
    },
    "[ ]": {
      "iconColour": "#e8426e",
      "foreground": "#fdff00",
      "background": "#e8426e",
      "icon": "circle"
    },
    "[x]": {
      "iconColour": "#439D4D",
      "foreground": "#e9f4fa",
      "background": "#439D4D",
    }
  },
  "todo-tree.tree.flat": true,
  "todo-tree.tree.expanded": true,
  "todo-tree.tree.labelFormat": "${after}"
}
