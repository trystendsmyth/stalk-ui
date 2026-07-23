import type { MessageDictionary } from '../types'

// Korean (ko). Noun-form button labels with polite -세요 prompts.
export const ko = {
  dialog: {
    close: '닫기',
    closeDialog: '대화 상자 닫기',
  },
  combobox: {
    noResults: '결과가 없습니다',
    placeholder: '옵션을 선택하세요...',
  },
  textEditor: {
    bold: '굵게',
    italic: '기울임꼴',
    underline: '밑줄',
    strikethrough: '취소선',
    code: '코드',
    link: '링크',
    setLink: '링크 설정',
    emoji: '이모지',
    undo: '실행 취소',
    redo: '다시 실행',
    textColor: '글자 색',
    highlight: '강조 표시',
  },
} satisfies MessageDictionary
