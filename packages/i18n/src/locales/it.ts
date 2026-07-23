import type { MessageDictionary } from '../types'

// Italian (it). Informal imperative, the common register for Italian UI copy.
export const it = {
  dialog: {
    close: 'Chiudi',
    closeDialog: 'Chiudi finestra di dialogo',
  },
  combobox: {
    noResults: 'Nessun risultato trovato',
    placeholder: "Seleziona un'opzione...",
  },
  textEditor: {
    bold: 'Grassetto',
    italic: 'Corsivo',
    underline: 'Sottolineato',
    strikethrough: 'Barrato',
    code: 'Codice',
    link: 'Collegamento',
    setLink: 'Imposta collegamento',
    emoji: 'Faccine',
    undo: 'Annulla',
    redo: 'Ripristina',
    textColor: 'Colore del testo',
    highlight: 'Evidenzia',
  },
} satisfies MessageDictionary
