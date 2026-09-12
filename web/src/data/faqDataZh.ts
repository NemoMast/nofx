import { faqCategories, type FAQBlock, type FAQCategory } from './faqData'

const p = (text: string): FAQBlock => ({ type: 'p', text })
const note = (text: string): FAQBlock => ({ type: 'note', text })
const list = (...items: string[]): FAQBlock => ({ type: 'list', items })
const steps = (...items: string[]): FAQBlock => ({ type: 'steps', items })
const answers: Record<string, { question: string; blocks: FAQBlock[] }> = {
  'what-is-nofx': {
    question: 'NOFX 是什么？',
    blocks: [
      p(
        'NOFX 是开源、可自行部署的 AI 交易终端。其核心模式是 NOFX 自动交易：AI 读取 Claw402.ai 信号榜单，结合 Signal Lab 和清算结构验证候选品种，通过原始 K 线确认时机，然后在 Hyperliquid 执行交易。整个系统运行在你自己的机器上，密钥保存在你自己的服务器。'
      ),
      p(
        '你也可以在策略工作室构建自定义策略，同时运行多个 AI 交易员，并在排行榜上比较表现。'
      ),
    ],
  },
  'what-do-i-need': {
    question: '启动自动交易前需要准备什么？',
    blocks: [
      p('需要两个已入金的账户，配置页的启动向导会引导你完成：'),
      list(
        'AI 费用钱包：Base 网络的 USDC 钱包，用于支付 AI 模型与行情数据调用费用。启动至少需要 `1 USDC`。',
        'Hyperliquid 账户：已完成交易授权，至少有 `12 USDC` 可用保证金。'
      ),
      p(
        '点击启动后，服务器会检查全部前置条件，并明确指出缺失的步骤，避免启动配置不完整的交易机器人。'
      ),
    ],
  },
  'which-markets': {
    question: '支持交易哪些市场？',
    blocks: [
      p(
        '自动交易支持 Hyperliquid 永续合约，包括 BTC、ETH、SOL 等主流加密资产，以及覆盖美股、指数、大宗商品和外汇的 xyz 合成市场。一个账户即可交易多类资产。'
      ),
      p(
        '在策略工作室手动创建的交易员还可以连接 Binance、Bybit、OKX、Bitget、KuCoin、Gate、Aster 和 Lighter。'
      ),
    ],
  },
  'ai-models': {
    question: '使用哪些 AI 模型？需要 API 密钥吗？',
    blocks: [
      p(
        '无需自行准备 API 密钥。NOFX 通过 Claw402 按量付费服务调用模型，费用钱包使用 Base USDC 按次支付，按需使用 DeepSeek 等受支持的模型。'
      ),
      p(
        '高级用户也可在配置 → 模型中填写自己的 OpenAI、Claude、Gemini、DeepSeek、Qwen、Grok、Kimi 密钥，或配置兼容 OpenAI 的接口。'
      ),
    ],
  },
  'is-it-profitable': {
    question: '能保证赚钱吗？',
    blocks: [
      p(
        '不能。AI 按系统化流程交易，但市场充满不确定性，历史表现不能保证未来收益。不要相信任何保收益承诺。'
      ),
      p(
        '仪表盘分别展示已实现和未实现盈亏、毛收益减手续费后的净收益、盈利因子，以及基于实际初始资金计算的最大回撤。请关注这些指标，从小额开始，仅使用能够承受损失的资金。'
      ),
      note('交易存在较大的亏损风险。NOFX 是软件，不提供投资建议。'),
    ],
  },
  'ai-fee-wallet': {
    question: 'AI 费用钱包是什么？',
    blocks: [
      p(
        '这是 Base 网络上的专用 EVM 钱包，用于支付 AI 模型调用和付费行情数据费用（x402 微支付）。它与交易保证金完全独立，不直接操作 Hyperliquid。'
      ),
      list(
        '设置向导会创建钱包，或复用已有钱包。',
        '请仅向该地址充值 Base 网络 USDC。',
        '启动至少需要 `1 USDC`；充值后余额会自动刷新。',
        '每轮费用因模型而异，通常从不足一美分到几美分。'
      ),
    ],
  },
  'fee-wallet-private-key': {
    question: 'AI 费用钱包私钥保存在哪里？',
    blocks: [
      p(
        '私钥在你自己的服务器上本地生成，使用 AES-256 加密后保存到数据库，并在新手设置页展示一次。请做好备份；如果数据库丢失，私钥无法恢复。'
      ),
      note(
        '此钱包仅用于支付 AI 调用费用，请只存放所需费用，不要用于长期储蓄。'
      ),
    ],
  },
  'hyperliquid-authorization': {
    question: 'Hyperliquid 授权如何工作？安全吗？',
    blocks: [
      p(
        'NOFX 使用 Hyperliquid 代理钱包，因此无需提供主钱包私钥。连接流程包含四个签名步骤：'
      ),
      steps(
        '连接 EVM 钱包，例如 Rabby、MetaMask、OKX 或 Coinbase Wallet。',
        '授权新生成的 NOFX 代理钱包，有效期为 180 天，仅具备交易权限。',
        '授权构建者费用，即用于支持平台的小额逐单费用。',
        '将代理密钥加密保存到 NOFX 服务器。'
      ),
      p(
        '代理钱包只能下单和平仓，不能提取资金。保证金始终保留在你自己的 Hyperliquid 账户中。'
      ),
    ],
  },
  'launch-preflight': {
    question: '启动前会检查哪些条件？',
    blocks: [
      p('创建或修改任何配置前，服务器会通过实时数据验证整个流程：'),
      list(
        'AI 模型已启用，并且具备可用凭据。',
        'AI 费用钱包密钥有效，链上查询的 Base USDC 余额至少为 `1 USDC`。',
        'Hyperliquid 账户已完成代理与构建者费用授权，且可以访问。',
        '交易资金至少为 `12 USDC`，包含现有持仓权益。'
      ),
      p(
        '每项失败检查都会说明具体修复方法，并跳转到对应设置步骤。每次启动时服务器都会执行同样的检查，避免意外绕过。'
      ),
    ],
  },
  'relaunch-behavior': {
    question: '再次点击启动会怎样？',
    blocks: [
      p(
        '启动操作具有幂等性。如果已有 NOFX 自动交易实例，系统会使用当前策略配置更新并重启它，不会创建重复实例。如果正在执行决策，重启可能需要一分钟，界面会等待其完成。'
      ),
    ],
  },
  'deposit-not-showing': {
    question: '已经充值 USDC，为什么余额仍为零？',
    blocks: [
      list(
        'AI 费用钱包：确认通过 Base 网络将 USDC 转到页面显示的准确地址。余额缓存约 30 秒，设置面板会每隔几秒自动检查。',
        'Hyperliquid：充值进入你自己的 Hyperliquid 账户，余额步骤会轮询实时状态。可点击向导中的刷新按钮。',
        '如果链上 RPC 暂时无法访问，面板会显示余额未知，而非零。请稍后重试。'
      ),
    ],
  },
  'autopilot-pipeline': {
    question: '自动交易策略的具体流程是什么？',
    blocks: [
      p(
        '每轮决策执行四个阶段，每一阶段都可以淘汰候选品种；只有全部通过才会交易：'
      ),
      steps(
        '构建品种池：读取 Claw402.ai 实时排名，在主流加密资产及 xyz 合成市场中选择排名靠前的品种（默认 10 个），并获取方向倾向和信号 z 分数。',
        '验证候选：读取各品种的 Signal Lab 深度信号，以及当前价格附近的成本和清算结构，判断前方是否存在动力或阻力。',
        '确认时机：读取原始 15 分钟 OHLCV K 线（30 根），确认入场符合价格结构，避免追逐过度延伸的走势。',
        '决策与仓位：仅在达到置信度阈值（默认 `78/100`）及约 `3:1` 风险收益比时以 10 倍杠杆建仓。先平仓再开仓，每轮同时考虑多空方向。'
      ),
      p(
        'AI 之外还有第五层硬性风控：持仓数量、杠杆、保证金和交易冷却限制。违反这些限制的决策会被拒绝，无论模型有多自信。'
      ),
    ],
  },
  'data-sources': {
    question: '使用哪些数据？哪些需要付费？',
    blocks: [
      list(
        'Claw402.ai 信号数据：排名榜单、逐品种 Signal Lab 深度信号及市场净流入，通过 x402 微支付从费用钱包按次扣除 USDC。',
        '成本/清算热力图：每个市场聚合的持仓成本与清算聚集结构。',
        'Hyperliquid 行情：原始 OHLCV K 线与实时 L2 订单簿，属于免费公开数据。',
        '通过代理钱包读取的账户数据：权益、可用保证金、当前持仓及盈亏。',
        '自身交易历史：已平仓交易的胜率、盈利因子和回撤会反馈到下一轮提示词中。'
      ),
      note(
        '为节省费用，仪表盘每隔几分钟才轮询付费 Claw402 接口；免费行情数据面板仍保持实时更新。'
      ),
    ],
  },
  'decision-cycle': {
    question: 'AI 多久做一次决策？',
    blocks: [
      p(
        '自动交易通常每 5 至 15 分钟扫描一次，取决于启动配置。可按交易员设置，最短为 3 分钟。启动后会立即执行首轮；由于需要分析完整市场信息，单轮通常耗时 30 至 60 秒。'
      ),
    ],
  },
  'what-ai-sees': {
    question: 'AI 每轮能看到哪些信息？',
    blocks: [
      list(
        '账户权益、可用保证金、当前持仓及盈亏。',
        'Claw402 排名榜单、候选品种与方向倾向。',
        '逐品种 Signal Lab 深度信号和成本/清算结构。',
        '用于确认入场时机的原始 OHLCV K 线。',
        '自身表现：胜率、盈利因子、回撤与最近交易。'
      ),
      p(
        '每轮都会保存为决策记录。仪表盘的执行日志展示推理链、交易动作和被拦截的订单。'
      ),
    ],
  },
  'leverage-and-risk': {
    question: '使用多少杠杆？有哪些风控？',
    blocks: [
      p(
        '自动交易默认使用 10 倍全仓杠杆。硬性风控独立于 AI 运行，模型无法覆盖：'
      ),
      list(
        '策略配置中的持仓数量上限，到达上限后拒绝新开仓。',
        '按资产类别区分的杠杆限制，例如 BTC/ETH 与其他币种。',
        '交易冷却限制，避免开仓几分钟后价格变化很小就平仓等频繁操作。',
        'AI 调用异常时启用下文所述的安全模式。'
      ),
    ],
  },
  'safe-mode': {
    question: '安全模式是什么？',
    blocks: [
      p(
        'AI 连续 3 轮失败时，例如服务不可用、费用不足或响应异常，交易员会进入安全模式：暂停开新仓，保留现有持仓保护，并持续重试。下一次 AI 调用成功后自动退出。'
      ),
      p('仪表盘会显示安全模式提示及具体原因。'),
    ],
  },
  'fee-wallet-empty-mid-run': {
    question: '运行中 AI 费用钱包余额耗尽会怎样？',
    blocks: [
      p(
        'AI 调用会失败，并明确显示资金不足状态。仪表盘持续显示红色提示和钱包余额；连续三轮失败后进入安全模式。充值 Base USDC 后会自动恢复，无需重启。'
      ),
    ],
  },
  'trading-fees': {
    question: '需要支付哪些费用？',
    blocks: [
      list(
        '每笔订单的 Hyperliquid 交易手续费，以及已授权的构建者费用。',
        '从费用钱包按次支付的 AI 与数据调用费用，通常每轮几美分。'
      ),
      p(
        '手续费可能侵蚀频繁交易的收益。仪表盘统计栏会展示完整关系：已实现毛收益减去手续费等于净收益，便于评估费用影响。'
      ),
    ],
  },
  'stop-and-manual': {
    question: '如何停止机器人或手动平仓？',
    blocks: [
      list(
        '停止：在配置页交易员列表点击停止。停止仅终止决策循环，已有持仓仍保留，需要自行管理。',
        '手动平仓：在仪表盘持仓面板关闭指定持仓，结果会同步到持仓历史。',
        '紧急情况：始终可以直接在 Hyperliquid 管理持仓，NOFX 不会阻止你操作自己的账户。'
      ),
    ],
  },
  'metrics-meaning': {
    question: '顶部指标具体是什么意思？',
    blocks: [
      list(
        '账户权益：当前账户总价值，包含未实现盈亏。',
        '总盈亏（含未实现）：当前权益相对初始资金的变化，会随未平仓持仓波动。',
        '已实现盈亏（已平仓）：仅统计已完成交易的净结果，胜率、盈利因子和夏普比率基于这些交易计算。',
        '盈利因子：已平仓交易总盈利除以总亏损，大于 1.0 表示盈利高于亏损。',
        '最大回撤：已实现权益曲线从峰值到谷值的最大跌幅，以实际初始资金为基础。'
      ),
    ],
  },
  'pl-contradiction': {
    question: '为什么总盈亏为正，已实现盈亏却为负？',
    blocks: [
      p(
        '两者统计范围不同。已实现盈亏只包含已平仓交易，总盈亏还包含未平仓持仓的浮动收益。因此已平仓交易可能亏损，但未平仓浮盈足以让总盈亏为正，反之亦然。查看毛收益、手续费、净收益统计可进一步判断费用影响。'
      ),
    ],
  },
  'execution-log': {
    question: '在哪里查看 AI 执行或拒绝操作的原因？',
    blocks: [
      p(
        '执行日志按轮次展示交易动作、AI 调用耗时，以及被拒订单触发的具体限制，例如交易冷却、持仓上限或风控规则。完整推理链保存在每条决策记录中。'
      ),
    ],
  },
  competition: {
    question: '排行榜和竞赛是什么？',
    blocks: [
      p(
        '启用“在竞赛中展示”的交易员会出现在公开排行榜，并按实时表现排名。可对每个交易员单独选择，并随时在交易员列表中切换。'
      ),
    ],
  },
  'key-storage': {
    question: '密钥如何存储？',
    blocks: [
      list(
        '代理密钥、费用钱包私钥和交易所 API 密钥等敏感信息，均使用 AES-256 加密保存到自己的数据库。',
        '可选的 RSA 传输加密保护浏览器与服务器之间传输的密钥。',
        'NOFX 自行部署，密钥保留在自己的服务器；代码开源，可供审查。'
      ),
    ],
  },
  'can-nofx-steal-funds': {
    question: 'NOFX 能提取我的交易资金吗？',
    blocks: [
      p(
        '在 Hyperliquid 上，NOFX 仅持有代理钱包。协议限制该钱包只能交易，不能提现；保证金始终保留在你自己的账户内，由主钱包控制。'
      ),
      note(
        '连接中心化交易所时，请仅授予 API 密钥交易权限，禁用提现，并设置 IP 白名单。'
      ),
    ],
  },
  'registration-model': {
    question: '为什么其他人无法在我的实例上注册？',
    blocks: [
      p(
        '每个实例只面向单个操作者：首个注册账户成为操作者，此后注册关闭并提示系统已初始化。这可以防止陌生人在暴露到公网的实例上创建账户。每位操作者应使用独立实例。'
      ),
    ],
  },
  'how-to-install': {
    question: '如何安装 NOFX？',
    blocks: [
      p('Linux/macOS 可以通过一行脚本使用 Docker 安装并启动：'),
      list(
        '脚本：`curl -fsSL https://raw.githubusercontent.com/NoFxAiOS/nofx/main/install.sh | bash`',
        'Docker：下载 `docker-compose.prod.yml`，运行 `docker compose -f docker-compose.prod.yml up -d`。',
        'Windows：先安装 Docker Desktop，再采用上面的 Docker 方式。',
        '源码运行：准备 Go 1.21+、Node 18+、TA-Lib（`brew install ta-lib` / `apt-get install libta-lib0-dev`），再运行 `go run .` 和 `npm --prefix web run dev`。'
      ),
      p(
        '然后打开 `http://127.0.0.1:3000`。网页使用 3000 端口，API 使用 8080 端口。'
      ),
    ],
  },
  'how-to-update': {
    question: '如何更新？',
    blocks: [
      p(
        '重新执行安装脚本，或运行 Docker 命令：`docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up -d`。数据库和密钥保存在挂载的 `data/` 目录中，更新后仍会保留。后端恢复后，运行中的交易员会自动重启。'
      ),
    ],
  },
  'launch-blocked': {
    question: '启动检查失败，该怎么办？',
    blocks: [
      p(
        '查看提示信息。每项检查都会说明修复方法，并引导至对应步骤，例如充值 AI 钱包、完成 Hyperliquid 授权，或充值交易 USDC。余额会实时重新检查，条件满足后即可启动。'
      ),
    ],
  },
  'exchange-unreachable': {
    question: '交易所账户显示“凭据无效”或“不可用”怎么办？',
    blocks: [
      list(
        '凭据无效：代理授权可能已过 180 天有效期，或保存的密钥已失效。重新连接 Hyperliquid 钱包，流程支持一键续期。',
        '不可用：交易所 API 没有响应。账户状态缓存 30 秒，请稍候刷新。',
        '中心化交易所密钥：检查交易权限、IP 白名单，以及是否启用期货/永续合约权限。'
      ),
    ],
  },
  'where-are-logs': {
    question: '在哪里查看日志？',
    blocks: [
      list(
        '后端：`docker logs nofx-trading`，或运行 `go run .` 的终端。',
        '每轮 AI 推理与错误：仪表盘中的执行日志。',
        '前端构建与运行问题：浏览器开发者工具控制台。'
      ),
    ],
  },
  'port-conflicts': {
    question: '3000 或 8080 端口已被占用怎么办？',
    blocks: [
      p(
        '停止占用端口的服务，或修改 Compose 文件的端口映射，例如前端使用 `"3100:80"`，API 使用 `"8180:8080"`，然后重启容器。'
      ),
    ],
  },
  'how-to-contribute': {
    question: '如何贡献代码？',
    blocks: [
      steps(
        '从任务看板选择标记为 good first issue 或 help wanted 的任务，并评论“assign me”。',
        'Fork 仓库，并从 `dev` 创建分支：`git checkout -b feat/your-topic`。',
        '遵循 Conventional Commits，推送前运行 `npm --prefix web run lint && npm --prefix web run build`。',
        '向 `NoFxAiOS/nofx:dev` 提交 PR，关联 Issue（如 `Closes #123`），界面变更需附截图。'
      ),
    ],
  },
  'bounty-program': {
    question: '有悬赏计划吗？',
    blocks: [
      p(
        '有。部分 Issue 提供现金悬赏；持续贡献者还可获得徽章、优先审查和测试版体验资格。'
      ),
    ],
  },
  'report-bugs': {
    question: '如何报告问题？',
    blocks: [
      p(
        '使用 GitHub Issue 模板说明操作步骤、实际结果，并附后端日志（`docker logs nofx-trading`）和截图。疑似安全漏洞请遵循 SECURITY.md 中的负责任披露说明，避免公开提交。'
      ),
    ],
  },
}

const titles: Record<string, string> = {
  'getting-started': '快速入门',
  'launch-wallets': '启动与钱包',
  trading: '交易与执行',
  dashboard: '仪表盘与指标',
  security: '安全',
  'self-hosting': '自行部署与故障排查',
  contributing: '参与贡献',
}
const linkLabels: Record<string, string> = {
  Roadmap: '路线图',
  'Task Dashboard': '任务看板',
  'Issues with bounty label': '悬赏任务',
  'Bounty claim template': '悬赏申请模板',
  'New issue': '提交问题',
}

export const faqCategoriesZh: FAQCategory[] = faqCategories.map((category) => ({
  ...category,
  title: titles[category.id] || category.title,
  items: category.items.map((item) => {
    const translated = answers[item.id]
    const links = item.blocks
      .filter(
        (block): block is Extract<FAQBlock, { type: 'links' }> =>
          block.type === 'links'
      )
      .map((block) => ({
        ...block,
        links: block.links.map((link) => ({
          ...link,
          label: linkLabels[link.label] || link.label,
        })),
      }))
    return translated
      ? { ...item, ...translated, blocks: [...translated.blocks, ...links] }
      : item
  }),
}))
