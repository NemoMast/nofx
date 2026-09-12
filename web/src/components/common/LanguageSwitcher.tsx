import { Globe } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import type { Language } from '../../i18n/translations'

const languages: { code: Language; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
]

export function LanguageToggle({
  language,
  onChange,
  className = '',
}: {
  language: Language
  onChange: (language: Language) => void
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={language === 'zh' ? '界面语言' : 'Interface language'}
      className={`flex shrink-0 items-center gap-1 rounded-md p-1 border border-[rgba(26,24,19,0.14)] bg-nofx-bg-lighter ${className}`}
    >
      <Globe
        size={14}
        aria-hidden="true"
        className="text-nofx-text-muted ml-1.5 mr-0.5"
      />
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          aria-pressed={language === code}
          lang={code === 'zh' ? 'zh-CN' : 'en'}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
            language === code
              ? 'bg-nofx-gold/15 text-nofx-gold'
              : 'text-nofx-text-muted hover:text-nofx-text bg-transparent'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const { language, setLanguage } = useLanguage()
  return (
    <LanguageToggle
      language={language}
      onChange={setLanguage}
      className={inline ? '' : 'absolute top-4 right-4 z-50'}
    />
  )
}
