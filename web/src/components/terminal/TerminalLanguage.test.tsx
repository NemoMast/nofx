import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext'
import { SignalMatrix } from './SignalMatrix'
import { RiskRadar } from './RiskRadar'
import { FlowMarkets } from './FlowMarkets'

function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  return (
    <button onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}>
      Toggle locale
    </button>
  )
}

describe('terminal language', () => {
  beforeEach(() => localStorage.clear())

  it('updates empty states in place when the language changes', () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
        <SignalMatrix />
        <FlowMarkets />
      </LanguageProvider>
    )
    expect(screen.getByText('信号矩阵')).toBeInTheDocument()
    expect(screen.getByText('暂无信号数据（claw402）。')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Toggle locale' }))
    expect(screen.getByText('Signal matrix')).toBeInTheDocument()
    expect(
      screen.getByText('No net-flow data (claw402 payment required).')
    ).toBeInTheDocument()
    expect(screen.queryByText('信号矩阵')).not.toBeInTheDocument()
  })

  it('keeps risk values stable while translating labels and verdicts', () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
        <RiskRadar account={{ total_equity: 100, margin_used_pct: 60 }} />
      </LanguageProvider>
    )
    expect(screen.getByText('风险雷达')).toBeInTheDocument()
    expect(screen.getByText('已用保证金')).toBeInTheDocument()
    expect(screen.getByText('紧张')).toBeInTheDocument()
    expect(screen.getByText('60.0%')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Toggle locale' }))
    expect(screen.getByText('MARGIN USED')).toBeInTheDocument()
    expect(screen.getByText('Tight')).toBeInTheDocument()
    expect(screen.getByText('60.0%')).toBeInTheDocument()
  })
})
