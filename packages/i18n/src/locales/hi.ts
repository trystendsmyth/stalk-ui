import type { MessageDictionary } from '../types'

// Hindi (hi). Polite imperative (करें) register, standard for UI copy.
export const hi = {
  dialog: {
    close: 'बंद करें',
    closeDialog: 'संवाद बंद करें',
  },
  combobox: {
    noResults: 'कोई परिणाम नहीं मिला',
    placeholder: 'एक विकल्प चुनें...',
  },
  textEditor: {
    bold: 'बोल्ड',
    italic: 'इटैलिक',
    underline: 'रेखांकित',
    strikethrough: 'स्ट्राइकथ्रू',
    code: 'कोड',
    link: 'लिंक',
    setLink: 'लिंक सेट करें',
    emoji: 'इमोजी',
    undo: 'पूर्ववत करें',
    redo: 'फिर से करें',
    textColor: 'टेक्स्ट का रंग',
    highlight: 'हाइलाइट',
  },
} satisfies MessageDictionary
