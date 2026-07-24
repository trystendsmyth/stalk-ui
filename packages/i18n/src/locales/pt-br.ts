import type { MessageDictionary } from '../types'

// Brazilian Portuguese (pt-BR). Imperative register, Brazilian conventions.
export const ptBR = {
  dialog: {
    close: 'Fechar',
    closeDialog: 'Fechar diálogo',
  },
  combobox: {
    noResults: 'Nenhum resultado encontrado',
    placeholder: 'Selecione uma opção...',
  },
  textEditor: {
    bold: 'Negrito',
    italic: 'Itálico',
    underline: 'Sublinhado',
    strikethrough: 'Tachado',
    code: 'Código',
    link: 'Hiperlink',
    setLink: 'Definir link',
    emoji: 'Emojis',
    undo: 'Desfazer',
    redo: 'Refazer',
    textColor: 'Cor do texto',
    highlight: 'Realce',
  },
} satisfies MessageDictionary
