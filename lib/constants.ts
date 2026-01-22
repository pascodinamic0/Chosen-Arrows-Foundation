/**
 * Application constants
 */

export const languages = ['en', 'fr', 'zh'] as const

export const languageNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  zh: '中文',
}

export const contentSectionKeys = [
  'hero',
  'values',
  'impact',
  'community',
  'cta',
  'footer',
  'navigation',
  'about',
  'contact',
  'mentorship',
  'donate',
  'donate-form',
  'not-found',
] as const

export type ContentSectionKey = typeof contentSectionKeys[number]
