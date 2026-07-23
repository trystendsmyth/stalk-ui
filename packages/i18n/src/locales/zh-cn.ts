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
  textEditor: {
    bold: '加粗',
    italic: '斜体',
    underline: '下划线',
    strikethrough: '删除线',
    code: '代码',
    link: '链接',
    setLink: '设置链接',
    emoji: '表情符号',
    undo: '撤销',
    redo: '重做',
    textColor: '文字颜色',
    highlight: '高亮',
  },
} satisfies MessageDictionary
