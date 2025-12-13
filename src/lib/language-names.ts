export const languages = [
  { code: 'en', label: 'English', flag: 'GB' },
  { code: 'es', label: 'Spanish', flag: 'ES' },
  { code: 'fr', label: 'French', flag: 'FR' },
  { code: 'de', label: 'German', flag: 'DE' },
  { code: 'it', label: 'Italian', flag: 'IT' },
  { code: 'pt', label: 'Portuguese', flag: 'PT' },
  { code: 'ja', label: 'Japanese', flag: 'JP' },
  { code: 'ko', label: 'Korean', flag: 'KR' },
  { code: 'zh', label: 'Chinese', flag: 'CN' },
  { code: 'ru', label: 'Russian', flag: 'RU' },
  // Add more as needed
] as const;

export const native_languages = [
    { code: 'en', label: 'English', flag: 'GB'}
]

// Helper function: "GB" → United Kingdom
export function codeToFlag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join('');
}