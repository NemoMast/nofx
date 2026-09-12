import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext'
import { faqCategories } from '../../data/faqData'
import { faqCategoriesZh } from '../../data/faqDataZh'
import { FAQLayout } from './FAQLayout'

vi.mock('../common/DeepVoidBackground', () => ({
  DeepVoidBackground: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

function Toggle() {
  const { setLanguage } = useLanguage()
  return <button onClick={() => setLanguage('en')}>English</button>
}

describe('FAQ translations', () => {
  afterEach(() => vi.unstubAllGlobals())
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    )
  })

  it('covers every existing answer and preserves outbound links', () => {
    expect(faqCategoriesZh.map((category) => category.id)).toEqual(
      faqCategories.map((category) => category.id)
    )
    faqCategories.forEach((category, index) => {
      const zh = faqCategoriesZh[index]
      expect(zh.title).not.toBe(category.title)
      expect(zh.items.map((item) => item.id)).toEqual(
        category.items.map((item) => item.id)
      )
      category.items.forEach((item, itemIndex) => {
        const translated = zh.items[itemIndex]
        expect(translated.question).not.toBe(item.question)
        const hrefs = (blocks: typeof item.blocks) =>
          blocks.flatMap((block) =>
            block.type === 'links' ? block.links.map((link) => link.href) : []
          )
        expect(hrefs(translated.blocks)).toEqual(hrefs(item.blocks))
      })
    })
  })

  it('searches Chinese answers and switches the whole FAQ back to English', () => {
    render(
      <LanguageProvider>
        <Toggle />
        <FAQLayout />
      </LanguageProvider>
    )
    fireEvent.change(screen.getByRole('textbox', { name: '搜索常见问题…' }), {
      target: { value: '余额仍为零' },
    })
    expect(
      screen.getByRole('heading', { name: '已经充值 USDC，为什么余额仍为零？' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'NOFX 是什么？' })
    ).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '清空搜索' }))
    fireEvent.click(screen.getByRole('button', { name: 'English' }))
    expect(
      screen.getByRole('heading', { name: 'What is NOFX?' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Search FAQ...' })
    ).toBeInTheDocument()
  })
})
