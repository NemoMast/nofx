import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Download,
  ExternalLink,
  KeyRound,
  ShieldCheck,
  Wallet,
  Zap,
} from 'lucide-react'
import { ROUTES } from '../../router/paths'
import { useLanguage } from '../../contexts/LanguageContext'

const getSetupSteps = (language: string) => [
  {
    title: language === 'zh' ? '创建 NOFX 账号' : 'Create your NOFX account',
    detail:
      language === 'zh'
        ? '此账号统一管理自动交易配置、钱包授权状态和交易看板。'
        : 'Your account keeps the Autopilot configuration, wallet authorization state, and trading dashboard in one place.',
    icon: KeyRound,
    action: language === 'zh' ? '创建账号' : 'Create account',
    to: ROUTES.register,
  },
  {
    title: language === 'zh' ? '为 AI 费用钱包充值' : 'Fund the AI fee wallet',
    detail:
      language === 'zh'
        ? 'NOFX 使用 Base 链上的 USDC 钱包支付 Claw402.ai 数据和模型调用费用，此钱包与交易保证金分开。'
        : 'NOFX prepares a Base USDC wallet for Claw402.ai data and model calls. This wallet is separate from trading collateral.',
    icon: CircleDollarSign,
    action: language === 'zh' ? '打开充值二维码' : 'Open deposit QR',
    to: ROUTES.login,
    returnUrl: `${ROUTES.traders}?setup=claw402`,
  },
  {
    title: language === 'zh' ? '授权 Hyperliquid' : 'Authorize Hyperliquid',
    detail:
      language === 'zh'
        ? '连接交易钱包，授权 NOFX 代理并确认构建者费用，资金保留在你的 Hyperliquid 账户中。'
        : 'Connect your trading wallet, approve the NOFX Agent, and approve the builder fee. Funds remain in your Hyperliquid account.',
    icon: Wallet,
    action: language === 'zh' ? '连接交易所' : 'Connect exchange',
    to: ROUTES.login,
    returnUrl: `${ROUTES.traders}?setup=hyperliquid`,
  },
  {
    title: language === 'zh' ? '充值交易用 USDC' : 'Deposit trading USDC',
    detail:
      language === 'zh'
        ? '向 Hyperliquid 充值 USDC 后启动 NOFX 自动交易，系统将自动创建并启动策略。'
        : 'Add USDC on Hyperliquid, then start NOFX Autopilot. The strategy is created and launched automatically.',
    icon: Zap,
    action: language === 'zh' ? '打开 Hyperliquid' : 'Open Hyperliquid',
    href: 'https://app.hyperliquid.xyz/',
  },
]

const getPipeline = (language: string) => [
  language === 'zh'
    ? '读取 Claw402.ai 实时信号看板，优先分析美股，再分析加密货币。'
    : 'Read the live Claw402.ai board, with US stocks prioritized before crypto.',
  language === 'zh'
    ? '读取各候选品种的当前方向、历史方向及成本与清算结构。'
    : 'Load current direction, direction history, and cost/liquidation structure for each candidate.',
  language === 'zh'
    ? '结合原始 OHLCV K 线确认信号，仅在条件充分时按全额仓位和 10 倍杠杆交易。'
    : 'Confirm with raw OHLCV candles, then trade full-size 10x only when the setup is strong enough.',
]

export function TraderLaunchGuestPage() {
  const { language } = useLanguage()
  const setupSteps = getSetupSteps(language)
  const pipeline = getPipeline(language)
  return (
    <div className="min-h-[calc(100vh-4rem)] overflow-hidden bg-nofx-bg px-4 py-10 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="grid gap-8 rounded-2xl border border-nofx-gold/20 bg-nofx-bg-lighter p-6 md:p-8 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-nofx-gold/25 bg-nofx-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-nofx-gold">
              <ShieldCheck className="h-3.5 w-3.5" />
              NOFX Autopilot
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-nofx-text md:text-5xl">
              {language === 'zh'
                ? '一个策略，四步配置，即可开始交易。'
                : 'One strategy. Four setup steps. Then it trades.'}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-nofx-text-muted">
              {language === 'zh'
                ? 'NOFX 运行由 Claw402 驱动的单一策略，结合信号看板、各市场详情、清算结构和 K 线执行交易，无需手动选择策略或品种。'
                : 'NOFX runs a single Claw402-driven strategy: board, per-market details, liquidation structure, candles, execution. No strategy picker, no manual symbol picking required.'}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to={ROUTES.login}
                onClick={() =>
                  sessionStorage.setItem(
                    'returnUrl',
                    `${ROUTES.traders}?setup=claw402`
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-nofx-gold px-5 py-3 text-sm font-bold text-white transition hover:bg-nofx-gold/90"
              >
                {language === 'zh' ? '开始设置' : 'Start setup'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={ROUTES.register}
                className="inline-flex items-center justify-center rounded-xl border border-nofx-gold/20 bg-nofx-bg-deeper px-5 py-3 text-sm font-semibold text-nofx-text transition hover:border-nofx-gold/40 hover:bg-nofx-bg-deeper"
              >
                {language === 'zh' ? '创建账号' : 'Create account'}
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {setupSteps.map((step, index) => {
              const Icon = step.icon
              const cardClass =
                'group rounded-xl border border-nofx-gold/20 bg-nofx-bg-deeper p-4 text-left transition hover:border-nofx-gold/35 hover:bg-nofx-gold/[0.06]'
              const content = (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-nofx-gold/20 bg-nofx-gold/10 text-nofx-gold">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs text-nofx-text-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-nofx-text">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-nofx-text-muted">
                    {step.detail}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-nofx-gold transition group-hover:text-nofx-gold/80">
                    {step.action}
                    {step.href ? (
                      <ExternalLink className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </div>
                </>
              )

              if (step.href) {
                return (
                  <a
                    key={step.title}
                    href={step.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cardClass}
                  >
                    {content}
                  </a>
                )
              }

              return (
                <Link
                  key={step.title}
                  to={step.to || ROUTES.login}
                  onClick={() => {
                    if (step.returnUrl) {
                      sessionStorage.setItem('returnUrl', step.returnUrl)
                    }
                  }}
                  className={cardClass}
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </section>

        <section className="grid gap-5 rounded-2xl border border-nofx-gold/20 bg-nofx-bg-lighter p-5 md:grid-cols-[0.78fr_1.22fr] md:p-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-nofx-gold">
              {language === 'zh'
                ? '还没有交易钱包？'
                : 'No trading wallet yet?'}
            </div>
            <p className="mt-3 text-sm leading-6 text-nofx-text-muted">
              {language === 'zh'
                ? 'NOFX 不需要你的主钱包私钥。请安装或解锁 EVM 钱包，向 Hyperliquid 充值 USDC，然后登录并授权 NOFX 代理。'
                : 'NOFX does not need your main-wallet private key. Install or unlock an EVM wallet, fund Hyperliquid with USDC, then authorize the NOFX Agent after sign-in.'}
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <a
              href="https://rabby.io/"
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-nofx-gold/20 bg-nofx-bg-deeper p-4 transition hover:border-nofx-gold/30 hover:bg-nofx-gold/[0.06]"
            >
              <Download className="mb-3 h-4 w-4 text-nofx-gold" />
              <div className="font-semibold text-nofx-text">
                {language === 'zh' ? '安装 Rabby' : 'Install Rabby'}
              </div>
              <p className="mt-2 text-sm leading-6 text-nofx-text-muted">
                {language === 'zh'
                  ? '连接 Hyperliquid 前，请先创建或导入 EVM 钱包。'
                  : 'Create or import an EVM wallet before connecting to Hyperliquid.'}
              </p>
            </a>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-nofx-gold/20 bg-nofx-bg-deeper p-4 transition hover:border-nofx-gold/30 hover:bg-nofx-gold/[0.06]"
            >
              <ExternalLink className="mb-3 h-4 w-4 text-nofx-gold" />
              <div className="font-semibold text-nofx-text">MetaMask</div>
              <p className="mt-2 text-sm leading-6 text-nofx-text-muted">
                {language === 'zh'
                  ? '已安装 MetaMask？请解锁钱包，然后回到 NOFX 继续设置。'
                  : 'Already use MetaMask? Unlock it, then continue setup inside NOFX.'}
              </p>
            </a>
            <a
              href="https://app.hyperliquid.xyz/"
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-nofx-gold/20 bg-nofx-gold/10 p-4 transition hover:bg-nofx-gold/15"
            >
              <ExternalLink className="mb-3 h-4 w-4 text-nofx-gold" />
              <div className="font-semibold text-nofx-text">
                {language === 'zh' ? '打开 Hyperliquid' : 'Open Hyperliquid'}
              </div>
              <p className="mt-2 text-sm leading-6 text-nofx-text-muted">
                {language === 'zh'
                  ? '在 Hyperliquid 中充值 USDC，交易资金将保留在你的账户里。'
                  : 'Deposit USDC there. Trading funds stay in your Hyperliquid account.'}
              </p>
            </a>
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-nofx-gold/20 bg-nofx-bg-lighter p-5 md:grid-cols-[0.72fr_1.28fr] md:p-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-nofx-gold">
              {language === 'zh'
                ? '启动后的运行流程'
                : 'What runs after launch'}
            </div>
            <p className="mt-3 text-sm leading-6 text-nofx-text-muted">
              {language === 'zh'
                ? '每个周期都会执行同一套交易流程，你只需完成充值、授权和启动。'
                : 'The same production path runs every cycle. The interface only asks you to fund, authorize, and start.'}
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {pipeline.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border border-nofx-gold/20 bg-nofx-bg-deeper p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-nofx-success" />
                <p className="text-sm leading-6 text-nofx-text">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
