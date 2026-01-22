import { headers } from 'next/headers'
import { cookies } from 'next/headers'

/**
 * Gets the preferred language from headers or cookies.
 * Falls back to 'en' if not found.
 * 
 * This is used for server-side content fetching.
 * Client-side language is handled by react-i18next.
 */
export async function getServerLanguage(): Promise<string> {
  const headersList = await headers()
  const cookieStore = await cookies()
  
  // Check cookie first (set by client-side i18n)
  const langCookie = cookieStore.get('i18next')?.value
  if (langCookie && ['en', 'fr', 'zh'].includes(langCookie)) {
    return langCookie
  }
  
  // Check Accept-Language header
  const acceptLanguage = headersList.get('accept-language')
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,fr;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code] = lang.trim().split(';')
        return code.split('-')[0].toLowerCase()
      })
    
    // Return first supported language
    for (const lang of languages) {
      if (['en', 'fr', 'zh'].includes(lang)) {
        return lang
      }
    }
  }
  
  // Default to English
  return 'en'
}
