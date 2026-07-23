import type { MessageDictionary } from '../types'

// Russian (ru). Imperative register for control labels.
export const ru = {
  dialog: {
    close: 'Закрыть',
    closeDialog: 'Закрыть диалоговое окно',
  },
  combobox: {
    noResults: 'Результатов не найдено',
    placeholder: 'Выберите вариант...',
  },
  textEditor: {
    bold: 'Полужирный',
    italic: 'Курсив',
    underline: 'Подчёркнутый',
    strikethrough: 'Зачёркнутый',
    code: 'Код',
    link: 'Ссылка',
    setLink: 'Задать ссылку',
    emoji: 'Эмодзи',
    undo: 'Отменить',
    redo: 'Повторить',
    textColor: 'Цвет текста',
    highlight: 'Выделение цветом',
  },
} satisfies MessageDictionary
