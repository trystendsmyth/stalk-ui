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
} satisfies MessageDictionary
