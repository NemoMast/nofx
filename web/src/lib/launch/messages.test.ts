import { describe, expect, it } from 'vitest'
import { localizeLaunchMessage } from './messages'

const prerequisites = [
  [
    'No enabled AI model is ready. Create or fund the Claw402 wallet first.',
    '没有可用的已启用 AI 模型，请先创建 Claw402 钱包或为其充值。',
  ],
  [
    'No Hyperliquid account is connected. Connect Hyperliquid and authorize the NOFX agent first.',
    '尚未连接 Hyperliquid 账户，请先连接 Hyperliquid 并授权 NOFX 代理。',
  ],
  [
    'The Hyperliquid account is disabled. Enable it first.',
    'Hyperliquid 账户已停用，请先启用。',
  ],
  [
    'The Hyperliquid agent key is missing. Reconnect Hyperliquid and save the agent wallet.',
    '缺少 Hyperliquid 代理密钥，请重新连接 Hyperliquid 并保存代理钱包。',
  ],
  [
    'Hyperliquid builder authorization is not complete. Finish wallet authorization first.',
    'Hyperliquid 构建者授权尚未完成，请先完成钱包授权。',
  ],
  [
    'The Hyperliquid wallet address is missing. Reconnect Hyperliquid first.',
    '缺少 Hyperliquid 钱包地址，请先重新连接 Hyperliquid。',
  ],
  ['Launch prerequisites are not ready yet.', '启动条件尚未满足。'],
  ['Failed to launch NOFX Autopilot', '启动 NOFX 自动交易失败'],
  ['Failed to create Claw402 strategy', '创建 Claw402 策略失败'],
  ['Failed to run launch preflight', '执行启动前检查失败'],
]

describe('launch message localization', () => {
  it.each(prerequisites)(
    'localizes the known instruction: %s',
    (english, chinese) => {
      expect(localizeLaunchMessage(english, 'zh')).toBe(chinese)
      expect(localizeLaunchMessage(english, 'en')).toBe(english)
    }
  )

  it.each([
    'Exchange rejected BTC order: nonce 1234',
    'Balance 0.75 USDC is below required 1.00 USDC',
    '钱包服务暂时不可用，请稍后重试。',
    '__proto__',
    '',
  ])('preserves unknown external content verbatim: %s', (message) => {
    expect(localizeLaunchMessage(message, 'zh')).toBe(message)
    expect(localizeLaunchMessage(message, 'en')).toBe(message)
  })
})
