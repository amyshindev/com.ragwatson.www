const CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const

const HANGUL_SYLLABLE_START = 0xac00
const HANGUL_SYLLABLE_END = 0xd7a3

function isJamo(char: string): boolean {
  const code = char.charCodeAt(0)
  return (
    (code >= 0x3131 && code <= 0x318e) ||
    (code >= 0x1100 && code <= 0x11ff)
  )
}

export function extractChosung(text: string): string {
  let result = ""
  for (const char of text) {
    const code = char.charCodeAt(0)
    if (code >= HANGUL_SYLLABLE_START && code <= HANGUL_SYLLABLE_END) {
      result += CHO[Math.floor((code - HANGUL_SYLLABLE_START) / 588)]
      continue
    }
    if (isJamo(char)) {
      result += char
    }
  }
  return result
}

export function matchesRecipientNickname(
  nickname: string,
  query: string,
): boolean {
  const q = query.trim()
  if (!q) return false
  if (nickname.includes(q)) return true

  const nicknameChosung = extractChosung(nickname)
  const queryChosung = extractChosung(q)
  if (!queryChosung) return false

  return nicknameChosung.startsWith(queryChosung)
}
