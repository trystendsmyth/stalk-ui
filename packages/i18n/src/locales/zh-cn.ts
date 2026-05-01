import type { MessageDictionary } from '../types'

// Simplified Chinese (zh-CN). Mainland conventions; punctuation uses
// full-width forms where appropriate.
export const zhCN = {
  dialog: {
    close: '关闭',
    closeDialog: '关闭对话框',
  },
  combobox: {
    noResults: '未找到结果',
    placeholder: '选择一个选项...',
  },
} satisfies MessageDictionary
