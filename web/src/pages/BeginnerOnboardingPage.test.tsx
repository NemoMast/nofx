import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LanguageProvider } from '../contexts/LanguageContext'
import { BeginnerOnboardingPage } from './BeginnerOnboardingPage'

const prepare = vi.hoisted(() => vi.fn())
vi.mock('../lib/api', () => ({
  api: {
    prepareBeginnerOnboarding: prepare,
    getCurrentBeginnerWallet: vi.fn(),
  },
}))

describe('onboarding language switch', () => {
  beforeEach(() => {
    localStorage.clear()
    prepare.mockReset()
    prepare.mockResolvedValue({
      address: '0x0000000000000000000000000000000000000001',
      private_key: 'test-private-key',
      balance_usdc: '2.00',
      env_saved: false,
    })
  })

  it('switches within the overlay without creating or replacing the wallet', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <BeginnerOnboardingPage />
        </LanguageProvider>
      </MemoryRouter>
    )
    expect(await screen.findByText('钱包地址')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: '界面语言' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText('Wallet address')).toBeInTheDocument()
    expect(screen.getByText('test-private-key')).toBeInTheDocument()
    expect(
      screen.getByText('0x0000000000000000000000000000000000000001')
    ).toBeInTheDocument()
    expect(prepare).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByRole('button', { name: '中文' }))
    expect(screen.getByRole('button', { name: '继续设置' })).toBeInTheDocument()
    expect(prepare).toHaveBeenCalledTimes(1)
  })
})
