import type { MessageDictionary } from '../types'

// French (fr). Infinitive style for control labels, per French UI convention.
export const fr = {
  dialog: {
    close: 'Fermer',
    closeDialog: 'Fermer la boîte de dialogue',
  },
  combobox: {
    noResults: 'Aucun résultat trouvé',
    placeholder: 'Sélectionner une option...',
  },
  textEditor: {
    bold: 'Gras',
    italic: 'Italique',
    underline: 'Souligné',
    strikethrough: 'Barré',
    code: 'Code en ligne',
    link: 'Lien',
    setLink: 'Définir le lien',
    emoji: 'Émojis',
    undo: 'Annuler',
    redo: 'Rétablir',
    textColor: 'Couleur du texte',
    highlight: 'Surlignage',
  },
} satisfies MessageDictionary
