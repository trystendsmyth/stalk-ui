import type { MessageDictionary } from '../types'

// Arabic (ar). Right-to-left; consumers should set `dir="rtl"` on a
// containing element. Translations are intentionally formal/neutral and
// reviewed for use across MENA locales (ar-SA, ar-EG, ar-AE, etc.).
export const ar = {
  dialog: {
    close: 'إغلاق',
    closeDialog: 'إغلاق الحوار',
  },
  combobox: {
    noResults: 'لا توجد نتائج',
    placeholder: 'اختر خياراً...',
  },
  textEditor: {
    bold: 'غامق',
    italic: 'مائل',
    underline: 'تسطير',
    strikethrough: 'يتوسطه خط',
    code: 'كود',
    link: 'رابط',
    setLink: 'تعيين الرابط',
    emoji: 'رموز تعبيرية',
    undo: 'تراجع',
    redo: 'إعادة',
    textColor: 'لون النص',
    highlight: 'تمييز',
  },
} satisfies MessageDictionary
