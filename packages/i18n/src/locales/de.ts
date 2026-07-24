import type { MessageDictionary } from '../types'

// German (de). Neutral infinitive style for control labels (no Sie/du register).
export const de = {
  dialog: {
    close: 'Schließen',
    closeDialog: 'Dialog schließen',
  },
  combobox: {
    noResults: 'Keine Ergebnisse gefunden',
    placeholder: 'Option auswählen...',
  },
  textEditor: {
    bold: 'Fett',
    italic: 'Kursiv',
    underline: 'Unterstrichen',
    strikethrough: 'Durchgestrichen',
    code: 'Quellcode',
    link: 'Hyperlink',
    setLink: 'Link festlegen',
    emoji: 'Emojis',
    undo: 'Rückgängig',
    redo: 'Wiederholen',
    textColor: 'Textfarbe',
    highlight: 'Hervorheben',
  },
} satisfies MessageDictionary
