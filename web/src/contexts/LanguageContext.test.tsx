import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LanguageProvider, useLanguage } from './LanguageContext'
import { LanguageSwitcher } from '../components/common/LanguageSwitcher'

function LanguageProbe() {
  const { language } = useLanguage()
  return <output>{language}</output>
}

function renderLanguage() {
  return render(
    <LanguageProvider>
      <LanguageProbe />
      <LanguageSwitcher />
    </LanguageProvider>
  )
}

describe('Chinese and English interface preferences', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('defaults to Chinese even when the former English-only UI wrote legacy state', () => {
    localStorage.setItem('language', 'en')
    renderLanguage()
    expect(screen.getByRole('status')).toHaveTextContent('zh')
    expect(document.documentElement.lang).toBe('zh-CN')
  })

  it('switches immediately, exposes selection and remembers English after remount', async () => {
    const view = renderLanguage()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('status')).toHaveTextContent('en')
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    await waitFor(() =>
      expect(localStorage.getItem('nofx-ui-language')).toBe('en')
    )
    expect(document.documentElement.lang).toBe('en')
    view.unmount()
    renderLanguage()
    expect(screen.getByRole('status')).toHaveTextContent('en')
    fireEvent.click(screen.getByRole('button', { name: '中文' }))
    expect(screen.getByRole('status')).toHaveTextContent('zh')
  })

  it('falls back to Chinese when a saved preference is invalid', () => {
    localStorage.setItem('nofx-ui-language', 'invalid')
    renderLanguage()
    expect(screen.getByRole('status')).toHaveTextContent('zh')
  })

  it('still switches when browser storage is unavailable', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    renderLanguage()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('status')).toHaveTextContent('en')
  })
})
