/*
 * Market Hub — free course content.
 * Read by build.js to generate /learn/ pages. Plain data; no runtime use.
 *
 * Course = { slug, title, subtitle, level, minutes, section, summary, tools:[toolSlug...], lessons:[...] }
 * Lesson = { title, blocks:[ block... ] }
 * Block  = one of:
 *   { p:  "paragraph text" }            // supports **bold**, *italic*, `code`, [text](url)
 *   { h:  "sub-heading" }
 *   { ul: ["item", ...] }               // bulleted list
 *   { ol: ["step", ...] }               // numbered list
 *   { note: "tip / info callout" }
 *   { warn: "warning callout" }
 *   { tool: "tool-slug", text: "why it fits here" }   // inline tool CTA (uses affiliate link if set)
 *
 * `tools` slugs must match the auto-generated tool slugs (lowercase, hyphenated name),
 * e.g. 'tradingview', 'coinbase', 'stock-analysis', 'sec-edgar', 'defillama'.
 */
window.COURSES = [

  /* =================================================== CRYPTO: FIRST TRADE */
  {
    slug: 'crypto-zero-to-first-trade',
    title: 'Crypto: Zero to Your First Trade',
    subtitle: 'Buy your first crypto safely and confidently',
    level: 'Beginner',
    minutes: 34,
    section: 'crypto',
    summary: 'Everything a complete beginner needs to buy their first crypto safely — what you are actually buying, how to pick and secure an exchange, how to place your first order, and how to hold it yourself.',
    tools: ['coinbase', 'kraken', 'binance', 'coingecko', 'coinmarketcap', 'messari', 'etherscan', 'mempool-space'],
    lessons: [
      {
        title: "What you're actually buying",
        blocks: [
          { p: 'Cryptocurrencies are digital assets that live on a **blockchain** — a shared, public ledger maintained by thousands of computers instead of a single bank. No one can quietly edit the history, and anyone can verify it.' },
          { fig: 'blockchain-blocks', caption: 'A blockchain is a chain of linked blocks — a shared history no single party can quietly rewrite.' },
          { p: '**Bitcoin (BTC)** is the original: a fixed-supply asset many treat as digital gold. **Ethereum (ETH)** is a programmable network that powers most of the apps, tokens, and DeFi you will hear about. Almost everything else is a more experimental bet.' },
          { p: 'Why does any of this exist? Crypto was built to let people hold and move value without trusting a bank or government to do it for them. That independence is the appeal — and the responsibility, because with no middleman there is also no one to reverse a mistake or refund a scam.' },
          { p: 'Crypto is volatile — double-digit daily swings are normal. Only commit money you can afford to lose, and expect a learning curve before you risk size.' },
          { note: "Rule of thumb: if you can't explain in one sentence what a coin does, you're speculating, not investing." }
        ]
      },
      {
        title: 'The crypto landscape: coins, tokens & stablecoins',
        blocks: [
          { p: 'Beyond Bitcoin and Ethereum, the word *crypto* covers several very different things wearing one label. Knowing which bucket an asset sits in tells you most of what you need to know about its risk.' },
          { ul: [
            '**Store-of-value coins** — Bitcoin is the archetype: a capped supply, no central issuer, widely treated as digital gold.',
            '**Smart-contract platforms (Layer 1s)** — Ethereum, Solana and peers run the apps and tokens; their coins pay for usage, known as *gas*.',
            '**Layer 2s** — networks built on top of a Layer 1 to make transactions faster and cheaper.',
            '**DeFi & app tokens** — a stake in a specific protocol such as an exchange or lending market.',
            '**Stablecoins** — tokens pegged to a currency, usually the US dollar (USDT, USDC). They are how most people hold value and move between trades.',
            '**Memecoins & NFTs** — driven mostly by attention and speculation. Highest risk, and where most beginners lose money.'
          ] },
          { p: 'A rough risk ladder runs from Bitcoin at the top, down through large platforms, then established apps, and finally micro-cap tokens and memecoins at the bottom. The further down you go, the more the price depends on hype rather than real usage.' },
          { tool: 'coinmarketcap', text: 'Browse every coin ranked by market cap and category to place an asset on the risk ladder.' },
          { key: 'Match the asset to your intent. Holding Bitcoin for years and gambling on a memecoin are completely different activities — never let one risk budget quietly fund the other.' }
        ]
      },
      {
        title: 'Choosing an exchange',
        blocks: [
          { p: 'An **exchange** is where you convert cash into crypto. Custodial exchanges (the easy on-ramp) hold the assets for you, like a brokerage. What matters most when you pick one:' },
          { ul: [
            '**Security & track record** — how long it has operated, whether it has had breaches, and what protections it offers.',
            '**Regulation in your country** — a licensed, compliant exchange is far safer for fiat deposits.',
            '**Fees** — spreads and trading fees vary widely; the "free" convenience apps are often the most expensive.',
            '**Supported coins & payment methods** — make sure it covers what you want and your local currency.'
          ] },
          { p: 'For most beginners, start with a large, reputable exchange and graduate later. Three solid options:' },
          { tool: 'coinbase', text: 'Beginner-friendly and US-listed — the simplest first on-ramp.' },
          { tool: 'kraken', text: 'Long track record and strong security, with good fiat support.' },
          { tool: 'binance', text: 'The deepest liquidity and widest selection once you are comfortable.' }
        ]
      },
      {
        title: 'Centralized exchanges vs. DEXs',
        blocks: [
          { p: 'There are two fundamentally different places to trade, and it helps to know both even if you only use one at first. A **centralized exchange (CEX)** is a company — like Coinbase or Binance — that holds your funds and matches orders for you. A **decentralized exchange (DEX)** is a set of smart contracts you trade against directly from your own wallet, with no company in the middle.' },
          { ul: [
            '**Custody** — a CEX holds your coins; on a DEX you keep them in your own wallet until the moment you trade.',
            '**Access** — a CEX needs sign-up and ID (KYC); a DEX just needs a wallet, with no account and no permission.',
            '**Fiat** — only a CEX lets you turn cash into crypto. DEXs trade crypto-for-crypto only.',
            '**Risk** — a CEX can be hacked, freeze withdrawals, or go bankrupt; a DEX exposes you to smart-contract bugs and scam tokens instead.'
          ] },
          { p: 'The practical path for almost everyone: buy your first crypto on a reputable CEX, then — once you understand wallets and gas — explore DEXs for tokens a CEX does not list. On a DEX you are the last line of defence; there is no support desk.' },
          { warn: 'Most brand-new tokens only trade on DEXs, and that is exactly where scams concentrate. Anyone can create a token and a trading pair. Never connect your main wallet to an unfamiliar site.' }
        ]
      },
      {
        title: 'The true cost: fees, spreads & slippage',
        blocks: [
          { p: 'The headline "0% commission" you see in flashy apps is almost never the real price. Exchanges and brokers make money in ways that are easy to miss, and those costs compound every time you trade.' },
          { ul: [
            '**Trading fees** — usually a small percentage per trade. *Maker* fees (you add liquidity with a limit order) are typically lower than *taker* fees (you remove it with a market order).',
            '**The spread** — the gap between the buy and sell price. Convenience apps often widen the spread instead of charging a visible fee, so a "free" trade can quietly cost 1–2%.',
            '**Deposit & withdrawal fees** — moving fiat or crypto in and out can carry a charge; debit-card purchases are especially expensive.',
            '**Network (gas) fees** — paid to the blockchain, not the exchange, whenever you move crypto on-chain.',
            '**Slippage** — on thin markets a large order pushes the price against you before it fills.'
          ] },
          { p: 'Fees feel trivial on a single trade and brutal over a year of active trading. A 1.5% all-in cost on every round trip means a strategy must clear roughly 3% just to break even.' },
          { note: 'Favour limit orders over market orders, fund with bank transfers rather than cards, and judge the all-in price including the spread — not just the advertised commission.' }
        ]
      },
      {
        title: 'Set up your account safely',
        blocks: [
          { p: 'Security is the part beginners skip and regret. Before you deposit a cent:' },
          { ol: [
            'Use a **strong, unique password** and a real email you control.',
            'Turn on **two-factor authentication (2FA)** — use an authenticator app or hardware key, **not** SMS, which can be SIM-swapped.',
            'Complete **KYC** (ID verification) — legitimate exchanges require it, and it protects your ability to withdraw.',
            'Enable a **withdrawal address whitelist** and anti-phishing code if offered.'
          ] },
          { warn: "No exchange, influencer, or 'support agent' will ever message you asking for your password, 2FA code, or seed phrase. Anyone who does is a scammer." }
        ]
      },
      {
        title: 'Make your first purchase',
        blocks: [
          { p: 'Fund your account (bank transfer is usually cheapest), then place an order. Two basic order types:' },
          { ul: [
            '**Market order** — buys instantly at the current price. Simple, but you pay the spread.',
            '**Limit order** — buys only at a price you set. Slightly more effort, usually cheaper.'
          ] },
          { p: "You don't have to buy a whole coin — you can buy a fraction (e.g., $50 of BTC). A popular beginner approach is **dollar-cost averaging (DCA)**: buying a fixed amount on a schedule so you are not betting everything on one day's price." },
          { p: 'Before deciding what to buy, check independent data on the asset — market cap, history, and whether it is a serious project.' },
          { tool: 'coingecko', text: 'Independent prices, market caps, and project data to research before you buy.' }
        ]
      },
      {
        title: 'Sizing up a coin before you buy',
        blocks: [
          { p: 'A low price per coin does **not** mean an asset is cheap. A $0.01 token can be wildly overvalued and a $40,000 coin can still be early. What matters is the *market capitalisation* — price multiplied by the coins in circulation.' },
          { ul: [
            "**Market cap** — the market's total valuation of the project, and the honest gauge of size.",
            '**Circulating vs total vs max supply** — how many coins exist now, in total, and at most. A small float beside a huge total supply means heavy future dilution.',
            '**Fully diluted valuation (FDV)** — what the market cap would be if every coin were circulating. A small market cap next to a giant FDV is a warning.',
            '**Volume & liquidity** — how much trades each day and how deep the order book is. Thin liquidity means you can get stuck in a position.',
            '**Token unlocks & vesting** — scheduled releases to insiders and early investors that can flood the market with fresh supply.'
          ] },
          { p: 'Before buying anything beyond the majors, spend ten minutes on four questions: what does it do, who holds it, how is new supply released, and is anyone actually using it?' },
          { tool: 'coingecko', text: 'Market cap, supply, volume and unlock schedules for thousands of assets in one place.' },
          { tool: 'messari', text: 'Deeper, professional research and asset profiles when you want to go past the surface numbers.' },
          { warn: 'A coin that has run up on a tiny circulating supply with a large unlock approaching is a classic way beginners become exit liquidity. Always check the unlock schedule first.' }
        ]
      },
      {
        title: 'Hold it yourself: wallets & self-custody',
        blocks: [
          { p: "On an exchange, *they* hold your keys — convenient, but you are trusting them. The crypto maxim is **'not your keys, not your coins.'** For meaningful amounts, move to a self-custody wallet." },
          { ul: [
            '**Hot wallets** (software apps or browser extensions) — convenient, connected to the internet, fine for small or active funds.',
            '**Cold wallets** (hardware devices) — offline, the gold standard for larger holdings.'
          ] },
          { fig: 'custody-keys', caption: 'Custodial vs. self-custody: who actually holds the private keys.' },
          { p: 'Every wallet gives you a **seed phrase** (12–24 words). It *is* your money. Write it on paper, store it offline, never type it into a website, and never photograph it. Lose it and the funds are gone; leak it and they are stolen.' },
          { p: 'When you withdraw from an exchange to your wallet, you can verify the transaction landed on a public block explorer.' },
          { tool: 'etherscan', text: 'Look up any Ethereum transaction or address to confirm a transfer.' }
        ]
      },
      {
        title: 'Networks, gas & sending crypto safely',
        blocks: [
          { p: 'Crypto lives on different *networks* (blockchains), and every transaction pays a small fee to that network — the *gas*. When you move coins between an exchange and a wallet you choose which network to send over, and getting it wrong can mean losing the funds.' },
          { ul: [
            '**Pick the matching network** — the same asset can exist on several chains (for example USDC on Ethereum, Solana or Base). The sending and receiving side must use the *same* network.',
            '**Mind the gas** — Ethereum fees rise when the network is busy; layer-2s and other chains are far cheaper. Check the fee before you confirm.',
            '**Watch for a memo or destination tag** — some assets and exchange deposits require one. Skip it and the funds can be lost.',
            '**Transactions are irreversible** — there is no chargeback and no support line that can claw a transfer back. The blockchain does exactly what you told it to.'
          ] },
          { p: 'The habit that saves people: always send a small **test amount** first, confirm it arrives, and only then move the rest.' },
          { tool: 'etherscan', text: 'Look up your transaction to confirm it landed and watch its confirmations roll in.' },
          { tool: 'mempool-space', text: 'See current network fees and congestion before you send a Bitcoin transaction.' },
          { warn: 'Sending an asset over the wrong network, or to an exchange that does not support that network, is the single most common way self-custody beginners lose money. Slow down for transfers.' }
        ]
      },
      {
        title: 'Records, taxes & staying organised',
        blocks: [
          { p: 'Crypto feels lawless, but in most countries the tax authority disagrees. Selling, swapping one coin for another, and even spending crypto can all be **taxable events** — and exchanges increasingly report to regulators. Good habits from day one save a painful scramble later.' },
          { ul: [
            '**A sale is taxable** — converting crypto back to cash usually realises a gain or loss against what you paid.',
            '**A swap is usually a sale too** — trading BTC for ETH is, in many places, treated as selling the BTC. People are caught out by this constantly.',
            '**Holding is not taxable** — simply buying and holding generally is not taxed until you dispose of the asset.',
            '**Rewards are income** — staking rewards, airdrops and interest are often taxed as income at the moment you receive them.'
          ] },
          { p: 'The single best habit is to keep a simple log of every buy, sell and transfer: date, asset, amount, price and fee. Most exchanges let you export this, and portfolio trackers can stitch it together across wallets.' },
          { note: 'Tax rules vary widely by country and change often. This is general education, not tax advice — check your local rules or a professional for your own situation.' }
        ]
      },
      {
        title: 'Your first game plan: DCA, sizing & an exit',
        blocks: [
          { p: 'Most beginners lose money not because they pick the wrong coin but because they have no plan. A few rules written down beforehand remove the emotion when prices swing.' },
          { ol: [
            'Decide a **total budget** you can afford to lose, kept separate from your emergency fund and bills.',
            'Buy in tranches with **dollar-cost averaging** — a fixed amount on a schedule — instead of going all-in on one day.',
            'Size each position so a **50% drop** would be uncomfortable, not life-changing.',
            'Decide *in advance* what would make you take profit or cut losses, and write it down.',
            'Keep simple **records** of what you bought, when and why — you will need them for review and for tax.'
          ] },
          { key: 'A boring, mechanical plan you actually follow beats a brilliant strategy you abandon the moment the market moves. Discipline is the edge most people never build.' }
        ]
      },
      {
        title: 'Avoid the beginner traps',
        blocks: [
          { ul: [
            "**Scams & 'guaranteed returns'** — giveaways, romance schemes, and fake support are everywhere. If it sounds too good, it is.",
            '**FOMO buying** — chasing a coin that is already up 300% is how most people lose money. Have a plan before you click.',
            '**Ignoring taxes** — in most countries, selling or swapping crypto is a taxable event. Keep records.',
            '**Position sizing** — never put in rent money. Size positions so a −50% week does not hurt your life.'
          ] },
          { p: 'Crypto rewards patience and skepticism far more than speed. Start small, verify everything, and let competence compound.' },
          { note: 'Nothing here is financial advice — it is education. Always do your own research.' }
        ]
      }
    ]
  },

  /* ===================================================== CHART READING / TA */
  {
    slug: 'chart-reading-ta-basics',
    title: 'Chart Reading: Technical Analysis Basics',
    subtitle: 'Read any price chart from scratch',
    level: 'Beginner',
    minutes: 32,
    section: 'general',
    summary: 'Learn to read price charts from scratch — candlesticks, trends, support and resistance, the handful of indicators that actually matter, and a simple risk-managed workflow.',
    tools: ['tradingview', 'stockcharts'],
    lessons: [
      {
        title: 'Why read charts at all?',
        blocks: [
          { p: '**Technical analysis (TA)** is the study of price and volume to gauge probability — not certainty. The idea: a chart reflects everything participants currently believe, and price tends to move in **trends** and repeat **patterns** driven by human behavior.' },
          { p: 'TA pairs with **fundamental analysis (FA)** — what something is worth. FA suggests *what* to consider owning; TA helps with *when* and *where to manage risk*. Neither predicts the future; both manage odds.' },
          { note: 'TA is a tool for managing risk and timing, not a crystal ball. Anyone promising guaranteed signals is selling something.' }
        ]
      },
      {
        title: 'Chart types: line, bar & candlestick',
        blocks: [
          { p: 'Before decoding signals, know the three common ways price is drawn. Each shows the same data with more or less detail, and picking the right one keeps you from being overwhelmed.' },
          { ul: [
            '**Line chart** — connects the closing price of each period into a single line. It strips away noise and is the cleanest way to see the overall trend at a glance.',
            '**Bar chart (OHLC)** — each bar marks the open, high, low and close. More detail than a line, and popular with longer-term traders.',
            '**Candlestick chart** — the same OHLC data drawn as a body and wicks, colour-coded up or down. The most popular format because patterns stand out visually.'
          ] },
          { p: 'There are more exotic types — Heikin-Ashi, Renko, point-and-figure — that smooth or re-shape price to highlight trends. They are useful later, but a beginner needs only candlesticks and the occasional line chart for context.' },
          { note: 'Start on a line chart to read the trend, then switch to candlesticks for the detail. Two views of one chart beat squinting at a single busy view.' }
        ]
      },
      {
        title: 'Reading candlesticks',
        blocks: [
          { p: 'Most traders use **candlestick** charts. Each candle covers one time period and shows four prices: **open, high, low, and close (OHLC)**.' },
          { fig: 'candlestick-anatomy', caption: 'The four prices every candle shows — and how its colour signals up or down.' },
          { ul: [
            'The **body** spans open to close. Green/hollow means it closed up; red/filled means it closed down.',
            'The **wicks** (shadows) mark the high and low — they show rejection and where price was forced back.',
            'The **timeframe** matters: a 5-minute candle and a weekly candle tell different stories. Beginners do best on the daily.'
          ] },
          { p: 'Long wicks, big bodies, and clusters of candles form the patterns you will learn to recognize. The best way to learn is to pull up a live chart and watch them print.' },
          { tool: 'tradingview', text: 'The standard charting platform — free, with every candle type and indicator you need.' }
        ]
      },
      {
        title: 'Candlestick signals that matter',
        blocks: [
          { p: 'Individual candles whisper; clusters of them speak. A handful of shapes show up again and again, and they matter most when they appear at a level you already care about — support, resistance or a trendline.' },
          { ul: [
            '**Doji** — open and close almost equal, a small body with wicks. Indecision, and a possible turning point after a strong run.',
            '**Hammer / shooting star** — a small body with one long wick. A long lower wick at support hints buyers stepped in; a long upper wick at resistance hints sellers did.',
            '**Engulfing** — a candle whose body fully swallows the previous one. Bullish engulfing at support, or bearish at resistance, signals momentum shifting.'
          ] },
          { p: 'Context is everything. The *same* hammer is meaningful at major support and meaningless in the middle of a choppy range. Read the location first, the candle second.' },
          { warn: 'No single candle is a trade by itself. Patterns raise or lower the odds — they do not predict. Wait for confirmation from the next candle or from volume.' }
        ]
      },
      {
        title: 'Trend, support & resistance',
        blocks: [
          { p: "The first question on any chart: **what is the trend?** An **uptrend** makes higher highs and higher lows; a **downtrend** makes lower highs and lower lows; sideways is a **range**. 'The trend is your friend' because trading with it puts odds on your side." },
          { ul: [
            '**Support** — a price floor where buyers have repeatedly stepped in.',
            '**Resistance** — a ceiling where sellers have repeatedly appeared.',
            '**Trendlines** — connect the higher lows (or lower highs) to visualize the trend’s slope.'
          ] },
          { p: 'Old resistance often becomes new support once broken, and vice versa. These levels are where the market makes decisions — and where you will plan entries and exits.' },
          { fig: 'trend-support-resistance', caption: 'An uptrend bounded by rising support and resistance, with price bouncing between them.' }
        ]
      },
      {
        title: 'Timeframes & the multi-timeframe approach',
        blocks: [
          { p: 'Every chart has a *timeframe* — the period each candle represents, from one minute to one month. The same asset can look like a strong uptrend on the weekly and a sharp sell-off on the 15-minute. Neither is wrong; they answer different questions.' },
          { ul: [
            '**Higher timeframes set the context** — the daily and weekly show the dominant trend and the levels that really matter.',
            '**Lower timeframes refine the entry** — once you know the direction, drop down to find a cleaner price to act on.',
            '**They should agree** — a trade with the daily trend *and* a lower-timeframe trigger has the odds on its side; when they conflict, the honest answer is usually to wait.'
          ] },
          { p: 'Beginners do best anchoring to one higher timeframe — the daily is forgiving — and resisting the urge to react to every wiggle on the one-minute chart. More zoom is not more signal; it is usually more noise.' },
          { key: 'Trade in the direction of the higher-timeframe trend and use the lower timeframe only for timing. Fighting the bigger trend is the most expensive habit in technical analysis.' }
        ]
      },
      {
        title: 'Volume and a few key indicators',
        blocks: [
          { p: '**Volume** is the conviction behind a move: a breakout on high volume is far more credible than one on low volume. Beyond volume, a small, well-understood toolkit beats a screen full of indicators:' },
          { ul: [
            '**Moving averages (MA/EMA)** — smooth price to show the trend; the 50- and 200-day are widely watched.',
            '**RSI** — a 0–100 momentum gauge; extremes hint at overbought or oversold, but can stay extreme in strong trends.',
            '**MACD** — tracks momentum shifts via the relationship between two moving averages.'
          ] },
          { warn: 'More indicators does not mean more accuracy. Stacking ten of them usually just produces confident-looking noise. Master a few.' }
        ]
      },
      {
        title: 'Patterns and putting it together',
        blocks: [
          { p: 'Recurring **patterns** hint at what may come next: continuation patterns (flags, triangles) suggest the trend resumes; reversal patterns (double tops/bottoms, head-and-shoulders) suggest it turns. None are guarantees — they are setups with a historical edge.' },
          { fig: 'chart-patterns', caption: 'Two classic reversal patterns: the double top and head-and-shoulders.' },
          { p: 'Read the chart top-down: trend first, then key support and resistance, then confirm with volume and one momentum indicator. If they agree, you have a thesis. If they conflict, the best trade is often **no trade**.' },
          { p: "Beware **confirmation bias** — it is easy to 'see' a pattern that justifies what you already want to do. Mark your levels *before* you take a position." }
        ]
      },
      {
        title: 'Order types: turning analysis into a trade',
        blocks: [
          { p: 'Reading a chart is only half the job; you still have to execute. A few order types cover almost everything a beginner needs, and using the right one protects both your entry price and your downside.' },
          { ul: [
            '**Market order** — fills immediately at the best available price. Simple, but you pay the spread and any slippage.',
            '**Limit order** — fills only at your chosen price or better. More patience, less cost, and it lets you set entries in advance.',
            '**Stop-loss** — triggers once price hits a level, used to cap a loss when you are wrong.',
            '**Stop-limit** — a stop that then places a limit order, giving you price control at the risk it does not fill in a fast move.',
            '**Take-profit** — a limit order parked at your target so a win is banked even while you are away from the screen.'
          ] },
          { p: 'Place your stop where the idea is *wrong* — beyond the support level or pattern you traded — not at a round number you happen to find comfortable. The market does not know or care about your comfort.' },
          { tool: 'tradingview', text: 'Set alerts, draw your levels, and place or simulate orders in one place.' },
          { note: 'Set your stop and target at the same moment you enter. Deciding them after you are in a position is how small losses quietly become large ones.' }
        ]
      },
      {
        title: 'Position sizing & risk-reward',
        blocks: [
          { p: 'Survival in markets is a maths problem before it is a charting one. Position sizing decides how much you can lose on any single trade, and it is the closest thing to a free lunch that trading offers.' },
          { ul: [
            '**Risk a fixed, small percentage** — many traders cap the loss on any one trade near 1% of the account, so a losing streak barely dents the balance.',
            '**Size from the stop** — your position size follows from the distance to your stop-loss, not from how confident you feel.',
            '**Think in R** — express every trade as a multiple of the amount risked (1R). A setup that risks 1R to make 3R only needs to work a third of the time to break even.'
          ] },
          { p: 'This is why win rate alone is meaningless. A trader right 40% of the time with 3R winners makes money; a trader right 70% of the time with tiny wins and the odd huge loss goes broke. *Expectancy* — average reward weighed against average risk — is what counts.' },
          { key: 'Protect the downside and the upside takes care of itself. You control your risk per trade and your position size; you do not control whether any single trade wins.' }
        ]
      },
      {
        title: 'Trading psychology & the mistakes that cost most',
        blocks: [
          { p: 'Most blown accounts are not destroyed by bad analysis but by predictable human behaviour. Knowing the traps in advance is the first defence.' },
          { ul: [
            '**FOMO** — chasing a candle that has already moved, buying the top out of fear of missing out.',
            '**Revenge trading** — trying to win back a loss immediately with a bigger, sloppier bet.',
            '**Moving the stop** — widening a stop-loss to avoid being wrong, turning a planned small loss into a large one.',
            '**Overtrading** — confusing activity with progress and bleeding out on fees and marginal setups.',
            '**Confirmation bias** — seeing only the evidence that supports the trade you already want to make.'
          ] },
          { p: 'The antidote is process, not willpower: mark your levels before you enter, size every trade the same disciplined way, and keep a journal you review weekly. Improvement comes from the review, not the trade.' },
          { tool: 'tradingview', text: 'Keep watchlists, alerts and a saved chart layout so every analysis starts from the same disciplined view.' },
          { note: 'Educational content, not financial advice. Practise on a paper-trading account until your process is boring and repeatable before risking real money.' }
        ]
      },
      {
        title: 'Backtesting & journaling: proving an edge',
        blocks: [
          { p: 'A setup is only worth trading if it wins more than it loses over many tries. Two cheap habits separate traders who improve from those who just churn: testing an idea before risking money, and recording every trade afterwards.' },
          { h: 'Backtesting' },
          { p: 'Backtesting means checking how a rule would have performed on past data. Scroll back on a chart, apply your rule honestly bar by bar, and tally the results. It will not predict the future, but it quickly kills ideas that never worked and builds conviction in the ones that did.' },
          { ul: [
            '**Define the rule precisely** — entry, stop and target with no room for second-guessing after the fact.',
            '**Test a meaningful sample** — dozens of trades across different market conditions, not three cherry-picked winners.',
            '**Avoid hindsight bias** — do not let knowledge of what happened next leak into the decision.'
          ] },
          { h: 'Journaling' },
          { p: 'A trade journal turns experience into improvement. Record the setup, a screenshot, your reason for entering, the outcome, and how you felt. Patterns emerge fast — usually that a handful of impulsive trades cause most of the damage.' },
          { tool: 'tradingview', text: 'Replay past price bar by bar and save annotated chart snapshots for your journal.' },
          { key: 'You cannot improve what you do not measure. The weekly review of your journal teaches more than any indicator ever will.' }
        ]
      },
      {
        title: 'A simple, risk-managed workflow',
        blocks: [
          { p: 'Edge means nothing without risk management. A beginner-friendly routine:' },
          { ol: [
            'Pick **one timeframe** and stick to it while learning (daily is forgiving).',
            'Identify the **trend** and mark **support/resistance**.',
            'Define your **entry, stop-loss, and target** *before* entering — know your exit if you are wrong.',
            'Size the position so a stop-out costs a small, fixed **percentage** of your account.',
            'Journal every trade and review weekly. Improvement comes from the review, not the trade.'
          ] },
          { p: 'Save a clean chart layout you trust and reuse it, so every analysis starts from the same disciplined view.' },
          { tool: 'tradingview', text: 'Build watchlists, set alerts, and save reusable chart layouts in one place.' },
          { note: 'Educational content, not financial advice. Practice on paper before risking real capital.' }
        ]
      }
    ]
  },

  /* ==================================================== ON-CHAIN ANALYSIS */
  {
    slug: 'on-chain-analysis-101',
    title: 'On-Chain Analysis 101',
    subtitle: 'Read the blockchain like a pro',
    level: 'Intermediate',
    minutes: 33,
    section: 'crypto',
    summary: "Crypto's superpower is a public ledger. Learn to read it — block explorers, the core metrics, how to follow smart money, and how to build your own dashboards.",
    tools: ['etherscan', 'glassnode', 'cryptoquant', 'nansen', 'arkham', 'coinglass', 'defillama', 'token-terminal', 'dune', 'messari'],
    lessons: [
      {
        title: "What 'on-chain' means and why it matters",
        blocks: [
          { p: 'Every transaction on a public blockchain is visible to anyone, forever. **On-chain analysis** turns that raw ledger into insight: who is moving money, where, and how that has lined up with past tops and bottoms.' },
          { p: "This is an edge traditional markets simply do not have — you can watch holders accumulate, exchanges fill or empty, and 'smart money' rotate, all in near real time. It complements price (TA) and fundamentals (FA) with a third lens: **behavior**." }
        ]
      },
      {
        title: 'Reading a block explorer',
        blocks: [
          { p: 'A **block explorer** is the on-chain equivalent of a search engine. Paste in a transaction hash, wallet address, or contract and you can see exactly what happened:' },
          { ul: [
            '**Transactions** — amount, sender, receiver, fee, and confirmation status.',
            '**Addresses** — balances and the full history of any wallet.',
            '**Contracts & tokens** — the code and token holders behind a project.',
            '**Gas** — the current cost to transact on the network.'
          ] },
          { fig: 'onchain-transaction', caption: 'What a block explorer shows you about a single transfer.' },
          { tool: 'etherscan', text: 'The definitive Ethereum explorer — start here to inspect any transaction, wallet, or token.' }
        ]
      },
      {
        title: 'The core metrics',
        blocks: [
          { p: 'A handful of metrics do most of the heavy lifting. Learn what they mean before chasing exotic ones:' },
          { ul: [
            '**Active addresses** — network usage and demand.',
            '**Exchange in/outflows** — coins moving *to* exchanges can signal intent to sell; coins moving *off* often signal accumulation into self-custody.',
            '**Supply held by long-term holders** — conviction; rising during fear is historically bullish.',
            '**MVRV / SOPR** — whether the average holder is in profit or loss, useful for spotting froth or capitulation.'
          ] },
          { fig: 'exchange-flows', caption: 'Coins moving onto exchanges can signal selling; coins moving off can signal accumulation.' },
          { p: 'These platforms package the raw data into charts and alerts so you do not have to compute it yourself.' },
          { tool: 'glassnode', text: 'Institutional-grade on-chain metrics and charts.' },
          { tool: 'cryptoquant', text: 'Exchange flows and miner activity, strong for spotting market shifts.' }
        ]
      },
      {
        title: 'Network health: miners, validators & security',
        blocks: [
          { p: 'A blockchain is only as valuable as it is secure, and on-chain data lets you watch that security directly. The groups that produce blocks — **miners** on proof-of-work chains like Bitcoin, **validators** (stakers) on proof-of-stake chains like Ethereum — leave clear footprints.' },
          { ul: [
            '**Hash rate** (proof-of-work) — the total computing power securing the network. A steadily rising hash rate signals miner confidence and a more attack-resistant chain.',
            '**Staked supply** (proof-of-stake) — how many coins are locked up to secure the network. More staked means more committed capital and less liquid supply available to sell.',
            '**Miner reserves & flows** — miners must sell some coins to cover costs; large miner transfers to exchanges can add selling pressure.',
            '**Validator queue & rewards** — on staking chains, the entry and exit queue and the yield reveal how eager capital is to help secure the network.'
          ] },
          { p: 'These metrics rarely call a top or bottom on their own, but they tell you whether the foundation under an asset is strengthening or quietly eroding — context price alone never shows.' },
          { tool: 'cryptoquant', text: 'Miner reserves, flows and network indicators in one dashboard.' }
        ]
      },
      {
        title: 'Valuation & profitability: MVRV, SOPR & NUPL',
        blocks: [
          { p: 'On-chain data lets you estimate something traditional markets cannot see directly: whether the average holder is sitting in profit or loss. That single idea powers the most useful cycle indicators in crypto.' },
          { ul: [
            "**Realised cap** — values every coin at the price it last moved rather than today's price, approximating the market's aggregate cost basis.",
            '**MVRV** — market cap divided by realised cap. High readings mean holders are deep in profit (historically near tops); low readings mean widespread paper losses (historically near bottoms).',
            '**SOPR** — the spent-output profit ratio: whether coins moving on-chain are sold at a profit or a loss. Sustained sub-1 readings show capitulation.',
            '**NUPL** — net unrealised profit/loss: the share of supply in profit, often split into emotional zones from capitulation to euphoria.'
          ] },
          { p: 'None of these is a timing tool on its own. They describe *conditions* — how stretched or washed-out the market is — which is exactly the context price charts cannot give you.' },
          { tool: 'glassnode', text: 'Institutional-grade MVRV, SOPR and NUPL charts without having to compute them yourself.' },
          { warn: 'These metrics rest on heuristics about which coins are "really" held by investors. Exchange and custodial wallets distort them, so read trends and extremes, not precise levels.' }
        ]
      },
      {
        title: 'Holder cohorts: who is actually holding',
        blocks: [
          { p: 'Not every coin is held by the same kind of owner. On-chain data can group supply by how long it has sat still, separating patient conviction from fast money — a distinction that often leads price.' },
          { ul: [
            '**Long-term holders (LTH)** — coins that have not moved in months. Rising long-term-holder supply during fear is historically a constructive sign.',
            '**Short-term holders (STH)** — recently moved coins, typically more reactive and quicker to sell into volatility.',
            '**HODL waves & coin age** — visualise what share of supply is old versus young, exposing accumulation and distribution phases.',
            '**Realised profit/loss by cohort** — reveals *who* is selling: long-term holders taking profit looks very different from new buyers capitulating.'
          ] },
          { p: 'The recurring pattern across cycles: long-term holders accumulate while prices are low and disliked, then distribute into strength as newcomers pile in. Watching that handoff is more useful than watching price alone.' },
          { tool: 'cryptoquant', text: 'Holder cohorts, coin-age bands and exchange flows for reading accumulation and distribution.' },
          { key: 'Behaviour leads price. When strong hands quietly accumulate into weakness, it rarely shows on the chart until later — which is the whole point of looking on-chain.' }
        ]
      },
      {
        title: 'Follow the smart money',
        blocks: [
          { p: "Not all wallets are equal. **Wallet labeling** tags addresses — exchanges, funds, known profitable traders — so you can follow the players who tend to be early." },
          { ul: [
            "Track **'smart money'** flows into and out of tokens.",
            '**Entity** behavior — when a fund or whale accumulates or distributes.',
            'Spot **fresh deployments and insider wallets** before the crowd.'
          ] },
          { tool: 'nansen', text: 'Labels millions of wallets so you can follow smart money in real time.' },
          { tool: 'arkham', text: 'Ties wallets to real-world entities and visualizes fund flows.' },
          { warn: 'Labels are probabilistic, not gospel. A single whale wallet can mislead — look for confluence across many addresses.' }
        ]
      },
      {
        title: "Stablecoins: the market's dry powder",
        blocks: [
          { p: 'Stablecoins are dollars living on a blockchain, and their behaviour is one of the most underrated on-chain signals. Tracking how many exist and where they sit hints at buying power waiting on the sidelines.' },
          { ul: [
            '**Aggregate supply** — a growing stablecoin supply means more capital has entered crypto and could rotate into assets; a shrinking supply means money is leaving.',
            '**Exchange stablecoin reserves** — stablecoins flowing *onto* exchanges often precede buying, the mirror image of coins leaving for self-custody.',
            "**Stablecoin Supply Ratio (SSR)** — compares Bitcoin's market cap to stablecoin supply; a low SSR means stablecoins have plenty of relative buying power.",
            '**Peg health** — a stablecoin drifting from $1 can signal stress in the issuer or the broader market.'
          ] },
          { p: 'Think of stablecoins as the market dry powder. When the supply is large and growing, there is fuel for a rally; when it is contracting, rallies tend to run out of buyers.' },
          { tool: 'defillama', text: 'Track total stablecoin supply and breakdowns across chains and issuers.' },
          { note: 'No single metric is decisive. Stablecoin flows are most powerful as confirmation — lining up with price, holder behaviour and exchange flows rather than replacing them.' }
        ]
      },
      {
        title: 'Derivatives: funding, open interest & liquidations',
        blocks: [
          { p: 'Spot on-chain data shows ownership; the derivatives market shows *leverage and positioning*. Combining the two explains many violent moves that price alone cannot.' },
          { ul: [
            '**Funding rate** — the periodic payment between longs and shorts on perpetual futures. Persistently high positive funding means crowded longs paying to stay in — fuel for a long squeeze.',
            '**Open interest (OI)** — the total value of open futures contracts. Rising OI into a move shows conviction; a sharp drop signals positions closing or being liquidated.',
            '**Long/short ratio** — how positioning is skewed; extremes often precede reversals as the crowded side gets flushed.',
            '**Liquidations** — forced closures of leveraged positions. Cascades of them cause the wicks and flash moves that trap newcomers.'
          ] },
          { p: 'The classic setup: an overheated funding rate and stretched open interest, then a sharp move that liquidates the crowded side. Leverage data tells you where the fuel is; on-chain tells you what the patient money is doing.' },
          { tool: 'coinglass', text: 'Funding rates, open interest and liquidation maps across the major exchanges.' },
          { warn: 'Derivatives data moves fast and is easy to over-trade on. Use it to gauge risk and crowding, not as a constant buy or sell trigger.' }
        ]
      },
      {
        title: 'Protocol & DeFi fundamentals',
        blocks: [
          { p: 'For tokens tied to apps (DeFi, L2s), on-chain data doubles as **fundamentals**. Instead of guessing, you can measure real usage and money:' },
          { ul: [
            '**TVL (total value locked)** — capital deposited in a protocol; a rough gauge of trust and traction.',
            '**Fees & revenue** — what the protocol actually earns, the crypto version of an income statement.',
            '**Comparisons** — stack protocols and chains side by side to see who is really used.'
          ] },
          { tool: 'defillama', text: 'The neutral standard for TVL across chains and protocols.' },
          { tool: 'token-terminal', text: 'Revenue, fees, and P/E-style metrics for protocols.' }
        ]
      },
      {
        title: 'An on-chain workflow: building a thesis',
        blocks: [
          { p: 'Individual metrics are interesting; a *process* that combines them is what turns on-chain data into decisions. The goal is confluence — several independent signals pointing the same way.' },
          { ol: [
            'Start with **valuation context** — is the market historically cheap or stretched (MVRV, NUPL)?',
            'Check **holder behaviour** — are long-term holders accumulating or distributing?',
            'Read **exchange flows** — are coins leaving exchanges for custody, or arriving to be sold?',
            'Add **stablecoin dry powder** — is buying capacity entering or leaving the system?',
            'Overlay **derivatives** — is positioning crowded and primed for a squeeze?',
            'Only then look at **price** to time the idea.'
          ] },
          { p: 'When most of these agree, you have a thesis with real weight. When they conflict, that is information too — it usually means *wait*.' },
          { tool: 'messari', text: 'Curated charts and research to combine valuation, flows and fundamentals in one view.' },
          { key: 'On-chain is a lens for *probabilities and context*, not certainty. Its power is confirming or challenging a view you formed elsewhere — never blindly following one chart.' }
        ]
      },
      {
        title: 'Spotting scams & rug pulls on-chain',
        blocks: [
          { p: 'The same transparency that helps you analyse healthy projects also exposes unhealthy ones — if you know what to look for. Most rug pulls and scam tokens leave obvious on-chain fingerprints well before they collapse.' },
          { ul: [
            '**Concentrated holders** — if a handful of wallets own most of the supply, they can dump on everyone else. Check the holder distribution first.',
            '**Liquidity that is not locked** — if the team can withdraw the trading liquidity at any time, they can pull it and leave holders unable to sell.',
            '**Dangerous contract functions** — code that lets the creator mint unlimited new tokens or freeze transfers is a major red flag.',
            '**Fresh wallets and wash trading** — volume manufactured between a few new addresses to fake demand.'
          ] },
          { p: 'A few minutes on a block explorer — reading the holder list and the contract — filters out a large share of obvious scams before you ever risk a cent.' },
          { tool: 'etherscan', text: 'Inspect a token holder list, contract code and transaction history for red flags.' },
          { warn: 'If you cannot understand how a token works or who controls it, that is your answer. The best scam defence is the willingness to walk away.' }
        ]
      },
      {
        title: 'Build your own — and the caveats',
        blocks: [
          { p: 'Once you know what to look for, you can build custom views with SQL or browse thousands the community has already made — no coding required to start.' },
          { tool: 'dune', text: 'Query blockchain data with SQL, or fork a community dashboard.' },
          { p: 'On-chain data is powerful but easy to misread. Keep these in mind:' },
          { ul: [
            "**Exchange & custodial wallets** distort 'holder' metrics — much supply is not really individual holders.",
            '**Wrapped/bridged assets** can double-count or hide flows across chains.',
            "**Correlation is not causation** — a metric that 'called' the last top may not call the next one."
          ] },
          { note: 'Educational content, not financial advice. On-chain is one lens among several — combine it with price and fundamentals.' }
        ]
      }
    ]
  },

  /* ================================================ STOCK INVESTING BASICS */
  {
    slug: 'stock-investing-foundations',
    title: 'Stock Investing Foundations',
    subtitle: 'Start investing in stocks with confidence',
    level: 'Beginner',
    minutes: 38,
    section: 'stocks',
    summary: 'Start investing in stocks with confidence — how the market works, opening a brokerage, screening for ideas, reading the fundamentals, valuing a company, and building a durable portfolio.',
    tools: ['yahoo-finance', 'finviz', 'stock-analysis', 'macrotrends', 'gurufocus', 'simply-wall-st', 'morningstar', 'sec-edgar'],
    lessons: [
      {
        title: 'How the stock market works',
        blocks: [
          { p: 'A **share** is part-ownership of a real business. When the company grows and earns, owners benefit through rising share prices and sometimes **dividends**. Shares trade on **exchanges** (NYSE, Nasdaq) during market hours.' },
          { p: 'Indices like the **S&P 500** track baskets of companies and act as the market’s scoreboard. Historically, broad stock indices have returned roughly **7–10% a year on average** over long periods — with plenty of scary drops along the way. Time in the market beats timing the market.' },
          { fig: 'compounding-curve', caption: 'Compounding lifts value faster the longer you stay invested — the case for starting early.' },
          { tool: 'yahoo-finance', text: 'Free quotes, news, and financials for any ticker — a reliable first stop.' }
        ]
      },
      {
        title: 'Index funds & ETFs: the default that beats most pros',
        blocks: [
          { p: 'Before picking a single stock, understand the option that quietly beats most professionals: buying the whole market. An **index fund** holds every company in an index, like the S&P 500, in one low-cost package.' },
          { ul: [
            '**Diversification by default** — one purchase spreads your money across hundreds of companies, so no single failure sinks you.',
            '**Low cost** — broad index funds charge tiny *expense ratios*, often under 0.1%. Fees compound against you, so low is powerful.',
            '**ETFs vs mutual funds** — exchange-traded funds trade like a stock all day; mutual funds settle once daily. Both can track the same index.',
            '**Hard to beat** — over long periods, low-cost index funds outperform the majority of active managers after fees.'
          ] },
          { p: 'For most people a couple of broad index funds is not a starter portfolio to graduate from — it is a perfectly good *destination*. Individual stocks can be the satellite around that core, not the foundation.' },
          { tool: 'morningstar', text: 'Independent fund and ETF ratings to compare low-cost index options.' },
          { key: 'If you do nothing else, a low-cost, broad-market index fund bought regularly for decades is a genuinely excellent plan. Complexity is optional; consistency is not.' }
        ]
      },
      {
        title: 'Beyond stocks: bonds, cash & asset allocation',
        blocks: [
          { p: 'Stocks are the growth engine of a portfolio, but they are not the whole machine. **Asset allocation** — how you split money across asset types — drives most of your long-run results and, just as importantly, how well you sleep.' },
          { ul: [
            '**Stocks** — the highest long-term return, but the wildest ride. The core of a long-horizon portfolio.',
            '**Bonds** — loans to governments or companies that pay interest. Lower return, but they steady the portfolio and often hold up when stocks fall.',
            '**Cash & equivalents** — money-market funds and savings. Safe and liquid, but loses ground to inflation over time.',
            '**Real assets** — property, commodities and the like, sometimes added for diversification and inflation protection.'
          ] },
          { p: 'A classic rule of thumb shifts more toward bonds as you near the date you need the money, and more toward stocks when your horizon is long. The exact mix is personal — it depends on your timeline and how much volatility you can genuinely stomach.' },
          { key: 'Decide your stock/bond split first; it matters more than any individual stock you will ever pick. Then rebalance back to it about once a year so winners do not quietly take over the whole portfolio.' }
        ]
      },
      {
        title: 'Open a brokerage account',
        blocks: [
          { p: 'You buy stocks through a **broker**. When choosing one, weigh:' },
          { ul: [
            '**Costs** — most major brokers now offer commission-free stock trades; watch for other fees.',
            '**Account type** — a regular **taxable** account vs. tax-advantaged **retirement** accounts (IRA/401(k) in the US, ISA/pension elsewhere).',
            '**Safety & tools** — pick a regulated, insured broker with research and screening built in.'
          ] },
          { note: 'Max out tax-advantaged accounts before taxable investing where you can — the tax savings compound enormously over decades.' }
        ]
      },
      {
        title: 'Accounts & taxes: keep more of what you earn',
        blocks: [
          { p: 'Where you hold investments can matter as much as what you hold. Tax-advantaged accounts and a little awareness of how gains are taxed can add up to a fortune over a lifetime.' },
          { ul: [
            '**Tax-advantaged accounts** — retirement and savings wrappers (IRA and 401(k) in the US, ISA and pension in the UK, and equivalents elsewhere) let investments grow with tax deferred or removed.',
            '**Long vs short-term gains** — in many countries, assets held over a year are taxed more lightly than quick trades. Patience is literally rewarded.',
            '**Dividends are taxable** — in a taxable account, dividends are usually taxed in the year you receive them, even when reinvested.',
            '**Tax-loss harvesting** — selling a loser to offset gains can lower your bill, subject to *wash-sale* rules that disallow rebuying the same asset too quickly.'
          ] },
          { p: 'The order that helps most people: capture any employer match, then fill tax-advantaged accounts, then invest in a regular taxable account. The match and the tax savings are returns you do not have to pick a single stock to earn.' },
          { note: 'Tax rules vary by country and change over time. This is general education, not tax advice — check your local rules or a professional for your own situation.' }
        ]
      },
      {
        title: 'Find ideas with a screener',
        blocks: [
          { p: "A **screener** filters thousands of stocks down to the few that fit your criteria — by size, sector, valuation, growth, dividend, and more. It turns 'where do I even start?' into a focused shortlist." },
          { p: 'Common starter filters: market cap (stick to larger, established companies while learning), profitability, reasonable debt, and a valuation that is not extreme.' },
          { tool: 'finviz', text: 'A fast, visual screener with a famous market heatmap.' },
          { tool: 'stock-analysis', text: 'Clean, free financials and a no-friction screener.' }
        ]
      },
      {
        title: 'Read the fundamentals',
        blocks: [
          { p: "**Fundamental analysis** is reading a company's financials to judge health and value. Three statements tell the story:" },
          { ul: [
            '**Income statement** — revenue, costs, and profit. Is the business growing and actually making money?',
            '**Balance sheet** — what it owns vs. what it owes. Too much debt is fragility.',
            "**Cash flow statement** — the real cash moving in and out; harder to fudge than 'earnings'."
          ] },
          { fig: 'three-statements', caption: 'The three statements that together describe how healthy a company is.' },
          { p: 'A few ratios summarize a lot: **P/E** (price vs. earnings), **profit margins** (efficiency), **ROE** (return on equity), and **debt-to-equity** (leverage). Always compare to the company’s own history and its peers.' },
          { tool: 'macrotrends', text: 'Decades of historical fundamentals to spot long-term trends.' }
        ]
      },
      {
        title: 'A valuation toolkit: multiples & intrinsic value',
        blocks: [
          { p: 'Valuation answers one question: am I paying a sensible price for what this business earns? You do not need a perfect model — just a feel for whether a stock is cheap, fair, or priced for perfection.' },
          { ul: [
            '**P/E ratio** — price divided by earnings per share, a quick read on how many years of current profit you are paying for. Compare *forward* (estimated) and *trailing* (past) versions.',
            '**PEG** — P/E divided by growth. It contextualises a high P/E: a fast grower can deserve one, a stagnant company cannot.',
            '**EV/EBITDA & P/S** — enterprise-value and sales-based multiples, useful when earnings are thin or distorted.',
            '**P/B** — price to book value, more relevant for banks and asset-heavy businesses.',
            '**Discounted cash flow (DCF)** — estimates intrinsic value from future cash flows discounted to today. Powerful in theory, only as good as its assumptions.'
          ] },
          { p: "Multiples only mean something in comparison — against the company's own history and its peers. A P/E of 30 is cheap in one industry and expensive in another." },
          { tool: 'gurufocus', text: 'Valuation multiples, historical ranges and a proprietary fair-value estimate.' },
          { tool: 'simply-wall-st', text: 'Turns valuation and fundamentals into a visual snapshot for a quick read.' },
          { key: 'Buy with a **margin of safety** — a gap between the price you pay and your estimate of value. It is your buffer for being wrong, which you regularly will be.' }
        ]
      },
      {
        title: 'Valuation & deeper research',
        blocks: [
          { p: 'Price and value are not the same thing. **Valuation** asks: what is this business actually worth, and am I overpaying? Beginners do not need a perfect model — just a sense of whether a stock is cheap, fair, or priced for perfection relative to its growth and peers.' },
          { ul: [
            "Look for a **durable competitive advantage** ('moat') — pricing power, network effects, switching costs.",
            '**Read the primary source**: a company’s own filings beat any hot take.',
            'Use independent ratings and fair-value estimates as a second opinion, not gospel.'
          ] },
          { tool: 'morningstar', text: 'Independent ratings, moat analysis, and fair-value estimates.' },
          { tool: 'sec-edgar', text: 'Official US filings — 10-Ks, 10-Qs, and more, straight from the source.' }
        ]
      },
      {
        title: 'Risk, volatility & your time horizon',
        blocks: [
          { p: 'Risk and volatility are not the same thing. **Volatility** is how much a price bounces around; **risk** is the chance of a permanent loss of capital. Confusing the two makes investors sell good assets at the worst possible time.' },
          { ul: [
            '**Drawdowns are normal** — broad markets routinely fall 10–20%, and occasionally 50%. Long-term returns are the reward for sitting through them.',
            '**Time horizon changes everything** — money you need next year should not be in stocks; money you will not touch for a decade can ride out the swings.',
            '**Diversification reduces risk** — spreading across companies, sectors and sometimes bonds smooths the ride without giving up much return.',
            '**Correlation matters** — assets that fall together do not diversify. The point is owning things that do not all crash at once.'
          ] },
          { p: 'Match your investments to when you need the money, and accept volatility as the price of admission for long-term growth. The investor who stays calm through a 30% drop usually beats the one who can pick stocks but panics.' },
          { key: 'Your biggest risk is rarely the market — it is being forced, or scared, into selling at the bottom. Plan your time horizon so you never have to.' }
        ]
      },
      {
        title: 'Dividends & the power of reinvesting',
        blocks: [
          { p: 'Some companies return cash to shareholders as **dividends**. They are not free money — the share price adjusts when one is paid — but reinvested over time they become a major engine of total return.' },
          { ul: [
            '**Dividend yield** — annual dividend divided by share price. A very high yield can signal a stressed company, not a bargain.',
            '**Payout ratio** — the share of earnings paid out. Too high and the dividend may be unsustainable.',
            "**Total return** — price gains *plus* dividends. Over decades, reinvested dividends have driven a large share of the stock market's total return.",
            '**Dividend growth** — a steadily rising dividend can matter more than a high starting yield, signalling a healthy, compounding business.'
          ] },
          { p: 'Turning on automatic reinvestment — a **DRIP** — quietly buys more shares with every payout, compounding your ownership without any effort or timing.' },
          { key: 'Reinvested dividends are compounding in its purest form: income buying more income. Given enough time, the effect is genuinely hard to overstate.' }
        ]
      },
      {
        title: 'Behavioural mistakes that quietly cost you',
        blocks: [
          { p: 'Decades of research point to an awkward truth: the average investor underperforms the very funds they own, because of how they behave. The gap between the two is sometimes called the *behaviour gap*.' },
          { ul: [
            '**Performance chasing** — pouring money into whatever just went up, and buying high as a result.',
            '**Panic selling** — crystallising losses at the bottom because a drop feels unbearable.',
            '**Overtrading** — frequent buying and selling that racks up costs and taxes and usually trails simply holding.',
            '**Home bias & anchoring** — over-weighting familiar companies, or fixating on the price you paid instead of the value today.',
            '**Overconfidence** — mistaking a bull market for skill and taking ever-bigger risks.'
          ] },
          { p: 'The defences are unglamorous and they work: a written plan, automatic regular investing, broad diversification, and doing *less*, not more. Temperament beats intelligence in investing.' },
          { key: 'You are the biggest variable in your returns. Build simple rules that protect you from your own worst instincts, then let time and compounding do the heavy lifting.' }
        ]
      },
      {
        title: 'The big picture: cycles, inflation & rates',
        blocks: [
          { p: 'Individual companies do not trade in a vacuum — they ride a larger economic tide. You do not need to forecast the economy, but understanding a few forces explains why markets behave the way they do.' },
          { ul: [
            '**The business cycle** — economies expand and contract in roughly repeating phases, and different sectors tend to lead in each one.',
            '**Inflation** — rising prices erode the value of future cash, and high inflation pressures both consumers and company margins.',
            '**Interest rates** — set largely by central banks, they are the gravity of markets: higher rates make safe bonds more attractive and make distant future profits worth less today, which pressures richly valued stocks.',
            '**Growth & employment** — broad gauges, like GDP and the jobs market, of whether the economy is speeding up or slowing down.'
          ] },
          { p: 'The takeaway is not to trade every data release. It is to understand the weather you are investing in — why fast-growing stocks can fall as rates rise, or why defensive sectors hold up in a slowdown.' },
          { note: 'For long-term investors, the cycle is a reason to stay diversified and consistent — not a reason to jump in and out trying to time it.' }
        ]
      },
      {
        title: 'Build a portfolio, avoid the mistakes',
        blocks: [
          { p: 'Picking winners matters less than behaving well over time. The fundamentals of a durable portfolio:' },
          { ul: [
            '**Diversify** — across companies and sectors, so no single bet can sink you.',
            '**Think in years, not days** — compounding needs time; frequent trading usually underperforms.',
            '**Dollar-cost average** — invest steadily regardless of headlines.',
            '**Index funds are a legitimate default** — low-cost broad index funds beat most active investors, including most professionals.'
          ] },
          { p: 'The biggest risk to your returns is usually **your own behavior** — panic-selling lows and euphoria-buying highs. A simple written plan is the best defense.' },
          { note: 'Educational content, not financial advice. Do your own research and consider a licensed advisor for your situation.' }
        ]
      }
    ]
  }

];
