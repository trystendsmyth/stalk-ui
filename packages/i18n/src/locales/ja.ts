import type { MessageDictionary } from '../types'

// Japanese (ja). Plain-form verb labels, standard for buttons and controls.
export const ja = {
  dialog: {
    close: '閉じる',
    closeDialog: 'ダイアログを閉じる',
  },
  combobox: {
    noResults: '結果が見つかりません',
    placeholder: 'オプションを選択...',
  },
  textEditor: {
    bold: '太字',
    italic: '斜体',
    underline: '下線',
    strikethrough: '取り消し線',
    code: 'コード',
    link: 'リンク',
    setLink: 'リンクを設定',
    emoji: '絵文字',
    undo: '元に戻す',
    redo: 'やり直す',
    textColor: '文字色',
    highlight: 'ハイライト',
  },
} satisfies MessageDictionary
