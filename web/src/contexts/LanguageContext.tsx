import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import type { Language } from '../i18n/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      // The old UI forced `language=en`; only trust an explicit new preference.
      const saved = localStorage.getItem('nofx-ui-language')
      return saved === 'en' ? 'en' : 'zh'
    } catch {
      return 'zh'
    }
  })

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    document.title =
      language === 'zh'
        ? 'NOFX - AI 自动交易看板'
        : 'NOFX - AI Auto Trading Dashboard'
    try {
      localStorage.setItem('nofx-ui-language', language)
      localStorage.setItem('language', language)
    } catch {
      // Language selection still works when storage is blocked by the browser.
    }
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang === 'en' ? 'en' : 'zh')
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
