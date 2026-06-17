/*
 * Market Hub — curated seed links.
 * Each entry: { name, url, description, sections:[...], group, affiliate? }
 *   sections:  any of 'stocks' | 'crypto' | 'macro'  (an item may belong to several)
 *   group:     the sub-heading it appears under
 *   affiliate: OPTIONAL. Your referral/affiliate URL for this tool. When set (and the
 *              placeholder is replaced), the card links here instead of `url`, shows a
 *              "Partner" badge, and gets rel="sponsored" — and the footer disclosure shows.
 *
 * MONETIZATION: the highest-value programs in this niche are crypto-exchange referrals
 * and trading-tool affiliates. A few slots are pre-filled with `YOUR_ID` placeholders
 * below — paste the exact link from each program's dashboard to activate them. Until you
 * replace `YOUR_ID`, the link safely falls back to the normal URL (no badge, no redirect).
 *
 * Edit freely — add, remove, or reword. The app reads window.SEED_LINKS on load.
 */
window.SEED_LINKS = [
  /* ---------------------------------------------------------------- STOCKS */

  // Charting & Technical Analysis
  {
    name: 'TradingView',
    url: 'https://www.tradingview.com',
    description: 'The industry-standard charting platform — hundreds of indicators, multi-asset coverage, alerts, and a huge community sharing trade ideas.',
    sections: ['stocks', 'crypto'],
    group: 'Charting & Technical Analysis',
    affiliate: 'https://www.tradingview.com/?aff_id=YOUR_ID'  // replace YOUR_ID with your TradingView affiliate id
  },
  {
    name: 'StockCharts',
    url: 'https://stockcharts.com',
    description: 'Veteran technical-analysis suite known for clean point-&-figure charts, market-breadth indicators, and sector-rotation tools.',
    sections: ['stocks'],
    group: 'Charting & Technical Analysis'
  },

  // Market Data & Quotes
  {
    name: 'Yahoo Finance',
    url: 'https://finance.yahoo.com',
    description: 'The most popular free finance hub: quotes, financial statements, analyst targets, news, and watchlists for virtually any ticker.',
    sections: ['stocks'],
    group: 'Market Data & Quotes'
  },
  {
    name: 'Google Finance',
    url: 'https://www.google.com/finance',
    description: 'Fast, clutter-free quotes and index overviews woven tightly into Google Search — ideal for a quick check.',
    sections: ['stocks'],
    group: 'Market Data & Quotes'
  },
  {
    name: 'Koyfin',
    url: 'https://www.koyfin.com',
    description: 'A free, browser-based take on the Bloomberg Terminal, with rich dashboards for fundamentals, estimates, and cross-asset macro.',
    sections: ['stocks'],
    group: 'Market Data & Quotes'
  },

  // Screeners
  {
    name: 'Finviz',
    url: 'https://finviz.com',
    description: 'Lightning-fast stock screener with a famous market heatmap and visual filters — a daily go-to for many traders.',
    sections: ['stocks'],
    group: 'Screeners'
  },
  {
    name: 'Stock Analysis',
    url: 'https://stockanalysis.com',
    description: 'Clean, free financial statements, ratios, and a capable screener with none of the usual paywall friction.',
    sections: ['stocks'],
    group: 'Screeners'
  },

  // Fundamentals & Research
  {
    name: 'Morningstar',
    url: 'https://www.morningstar.com',
    description: 'Independent research, star ratings, and fair-value estimates — especially strong for funds and long-term investors.',
    sections: ['stocks'],
    group: 'Fundamentals & Research'
  },
  {
    name: 'Macrotrends',
    url: 'https://www.macrotrends.net',
    description: 'Decades of historical price and fundamental charts, perfect for spotting long-term trends and ratios.',
    sections: ['stocks'],
    group: 'Fundamentals & Research'
  },
  {
    name: 'Simply Wall St',
    url: 'https://simplywall.st',
    description: "Turns company fundamentals into intuitive visual 'snowflake' analysis for quick valuation reads.",
    sections: ['stocks'],
    group: 'Fundamentals & Research'
  },
  {
    name: 'GuruFocus',
    url: 'https://www.gurufocus.com',
    description: 'Value-investing data, guru and institutional holdings, and proprietary valuation metrics like the GF Value.',
    sections: ['stocks'],
    group: 'Fundamentals & Research'
  },
  {
    name: 'TIKR',
    url: 'https://www.tikr.com',
    description: 'Institutional-grade financials, analyst estimates, and global coverage at a fraction of terminal cost.',
    sections: ['stocks'],
    group: 'Fundamentals & Research'
  },

  // Filings & Ownership
  {
    name: 'SEC EDGAR',
    url: 'https://www.sec.gov/edgar/search/',
    description: 'The official source for U.S. company filings — 10-Ks, 10-Qs, 8-Ks, and insider forms, fully text-searchable.',
    sections: ['stocks'],
    group: 'Filings & Ownership'
  },
  {
    name: 'WhaleWisdom',
    url: 'https://whalewisdom.com',
    description: 'Tracks 13F filings to reveal what hedge funds and large institutions are buying and selling.',
    sections: ['stocks'],
    group: 'Filings & Ownership'
  },
  {
    name: 'Fintel',
    url: 'https://fintel.io',
    description: "Short interest, institutional ownership, and options data for digging into a stock's positioning.",
    sections: ['stocks'],
    group: 'Filings & Ownership'
  },

  // Options & Derivatives
  {
    name: 'Barchart',
    url: 'https://www.barchart.com',
    description: 'Deep data across stocks, futures, and commodities, with strong options chains and technical screeners.',
    sections: ['stocks'],
    group: 'Options & Derivatives'
  },
  {
    name: 'Market Chameleon',
    url: 'https://marketchameleon.com',
    description: 'Options-focused analytics — implied volatility, expected earnings moves, and premium strategy screeners.',
    sections: ['stocks'],
    group: 'Options & Derivatives'
  },
  {
    name: 'OptionStrat',
    url: 'https://optionstrat.com',
    description: 'Visual options strategy builder that maps payoff, breakevens, and probabilities before you place a trade.',
    sections: ['stocks'],
    group: 'Options & Derivatives'
  },
  {
    name: 'Unusual Whales',
    url: 'https://unusualwhales.com',
    description: 'Tracks unusual options flow and dark-pool activity to surface where big money is positioning.',
    sections: ['stocks'],
    group: 'Options & Derivatives'
  },

  // Earnings & Calendars
  {
    name: 'Earnings Whispers',
    url: 'https://www.earningswhispers.com',
    description: 'The go-to earnings calendar with whisper numbers, expected moves, and confirmed report dates.',
    sections: ['stocks'],
    group: 'Earnings & Calendars'
  },

  // News & Analysis
  {
    name: 'Bloomberg',
    url: 'https://www.bloomberg.com',
    description: 'Authoritative real-time market news, data, and analysis — the benchmark for institutional finance coverage.',
    sections: ['stocks', 'macro'],
    group: 'News & Analysis'
  },
  {
    name: 'CNBC',
    url: 'https://www.cnbc.com',
    description: 'Breaking market news and live business TV, strong on real-time reactions to earnings and macro events.',
    sections: ['stocks'],
    group: 'News & Analysis'
  },
  {
    name: 'Reuters',
    url: 'https://www.reuters.com/markets/',
    description: 'Global newswire trusted for fast, neutral coverage of markets, economics, and corporate events.',
    sections: ['stocks', 'macro'],
    group: 'News & Analysis'
  },
  {
    name: 'MarketWatch',
    url: 'https://www.marketwatch.com',
    description: 'Accessible market news, columns, and data from the Dow Jones stable — a good daily market pulse.',
    sections: ['stocks'],
    group: 'News & Analysis'
  },
  {
    name: 'The Wall Street Journal',
    url: 'https://www.wsj.com',
    description: 'Premier business journalism with deep coverage of companies, markets, and policy (subscription).',
    sections: ['stocks'],
    group: 'News & Analysis'
  },
  {
    name: 'Financial Times',
    url: 'https://www.ft.com',
    description: 'Globally focused business and markets reporting with respected analysis (subscription).',
    sections: ['stocks', 'macro'],
    group: 'News & Analysis'
  },
  {
    name: 'Seeking Alpha',
    url: 'https://seekingalpha.com',
    description: 'Crowdsourced equity research, earnings-call transcripts, and bull/bear debates on individual stocks.',
    sections: ['stocks'],
    group: 'News & Analysis'
  },
  {
    name: 'Stocktwits',
    url: 'https://stocktwits.com',
    description: 'Real-time social stream where traders share sentiment and chatter, ticker by ticker.',
    sections: ['stocks', 'crypto'],
    group: 'News & Analysis'
  },

  /* ---------------------------------------------------------------- CRYPTO */

  // Market Data & Aggregators
  {
    name: 'CoinGecko',
    url: 'https://www.coingecko.com',
    description: 'Broad, independent crypto data — prices, market caps, exchanges, and metrics across thousands of assets.',
    sections: ['crypto'],
    group: 'Market Data & Aggregators'
  },
  {
    name: 'CoinMarketCap',
    url: 'https://coinmarketcap.com',
    description: 'The most-visited price and market-cap aggregator, with rankings, watchlists, and event data.',
    sections: ['crypto'],
    group: 'Market Data & Aggregators'
  },
  {
    name: 'Messari',
    url: 'https://messari.io',
    description: 'Professional-grade crypto research, curated data, and clear asset profiles for serious due diligence.',
    sections: ['crypto'],
    group: 'Market Data & Aggregators'
  },

  // Derivatives & Futures
  {
    name: 'Coinglass',
    url: 'https://www.coinglass.com',
    description: 'Essential derivatives dashboard — funding rates, open interest, and liquidation maps across exchanges.',
    sections: ['crypto'],
    group: 'Derivatives & Futures'
  },
  {
    name: 'Coinalyze',
    url: 'https://coinalyze.net',
    description: 'Free futures analytics covering funding, open interest, and liquidations across major derivatives venues.',
    sections: ['crypto'],
    group: 'Derivatives & Futures'
  },

  // On-Chain Analytics
  {
    name: 'Glassnode',
    url: 'https://glassnode.com',
    description: 'Institutional on-chain metrics that translate raw blockchain activity into market-relevant signals.',
    sections: ['crypto'],
    group: 'On-Chain Analytics'
  },
  {
    name: 'Dune',
    url: 'https://dune.com',
    description: 'Query and visualize raw blockchain data with SQL, or browse thousands of community-built dashboards.',
    sections: ['crypto'],
    group: 'On-Chain Analytics'
  },
  {
    name: 'Nansen',
    url: 'https://www.nansen.ai',
    description: "Labels millions of wallets so you can follow 'smart money' and track on-chain flows in real time.",
    sections: ['crypto'],
    group: 'On-Chain Analytics'
  },
  {
    name: 'Arkham',
    url: 'https://www.arkhamintelligence.com',
    description: 'On-chain intelligence that ties wallets to real-world entities and visualizes fund movements.',
    sections: ['crypto'],
    group: 'On-Chain Analytics'
  },
  {
    name: 'CryptoQuant',
    url: 'https://cryptoquant.com',
    description: 'Exchange flows, miner activity, and on-chain indicators aimed at timing market shifts.',
    sections: ['crypto'],
    group: 'On-Chain Analytics'
  },

  // DeFi & TVL
  {
    name: 'DefiLlama',
    url: 'https://defillama.com',
    description: 'The neutral standard for DeFi TVL — protocol, chain, stablecoin, and yield data with no token bias.',
    sections: ['crypto'],
    group: 'DeFi & TVL'
  },
  {
    name: 'DeBank',
    url: 'https://debank.com',
    description: 'Connect a wallet to track DeFi positions, net worth, and history across dozens of chains.',
    sections: ['crypto'],
    group: 'DeFi & TVL'
  },
  {
    name: 'Token Terminal',
    url: 'https://tokenterminal.com',
    description: 'Treats protocols like companies — revenue, fees, and P/E-style metrics for fundamental crypto analysis.',
    sections: ['crypto'],
    group: 'DeFi & TVL'
  },
  {
    name: 'L2Beat',
    url: 'https://l2beat.com',
    description: 'The reference for Ethereum Layer-2s — TVL, risk assessments, and technology comparisons.',
    sections: ['crypto'],
    group: 'DeFi & TVL'
  },

  // Block Explorers
  {
    name: 'Etherscan',
    url: 'https://etherscan.io',
    description: 'The definitive Ethereum explorer for transactions, smart contracts, tokens, and gas tracking.',
    sections: ['crypto'],
    group: 'Block Explorers'
  },
  {
    name: 'Solscan',
    url: 'https://solscan.io',
    description: 'Fast, readable explorer for Solana transactions, tokens, and program activity.',
    sections: ['crypto'],
    group: 'Block Explorers'
  },
  {
    name: 'mempool.space',
    url: 'https://mempool.space',
    description: 'Beautiful Bitcoin mempool and fee visualizer for tracking confirmations and network load.',
    sections: ['crypto'],
    group: 'Block Explorers'
  },
  {
    name: 'Blockchair',
    url: 'https://blockchair.com',
    description: 'Multi-chain explorer and search engine spanning Bitcoin, Ethereum, and many other networks.',
    sections: ['crypto'],
    group: 'Block Explorers'
  },

  // DEX & Discovery
  {
    name: 'DEX Screener',
    url: 'https://dexscreener.com',
    description: 'Real-time charts and liquidity for DEX pairs across chains — the hub for spotting new tokens.',
    sections: ['crypto'],
    group: 'DEX & Discovery'
  },
  {
    name: 'DexTools',
    url: 'https://www.dextools.io',
    description: 'Live DEX trading charts, pair explorer, and pool analytics for on-chain traders.',
    sections: ['crypto'],
    group: 'DEX & Discovery'
  },
  {
    name: 'CoinMarketCal',
    url: 'https://coinmarketcal.com',
    description: 'Community-verified calendar of token launches, unlocks, and catalysts that move prices.',
    sections: ['crypto'],
    group: 'DEX & Discovery'
  },
  {
    name: 'Crypto Fear & Greed Index',
    url: 'https://alternative.me/crypto/fear-and-greed-index/',
    description: 'A single daily gauge of market emotion, ranging from extreme fear to extreme greed.',
    sections: ['crypto'],
    group: 'DEX & Discovery'
  },

  // Exchanges
  {
    name: 'Binance',
    url: 'https://www.binance.com',
    description: 'The largest crypto exchange by volume, with deep liquidity and a vast range of markets.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://accounts.binance.com/register?ref=YOUR_ID'  // paste your exact Binance referral link
  },
  {
    name: 'Coinbase',
    url: 'https://www.coinbase.com',
    description: 'The most trusted U.S.-listed on-ramp, known for ease of use and regulatory compliance.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://www.coinbase.com/join/YOUR_ID'  // paste your exact Coinbase referral link
  },
  {
    name: 'Kraken',
    url: 'https://www.kraken.com',
    description: 'Long-standing exchange respected for security, fiat support, and solid liquidity.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://www.kraken.com/sign-up?ref=YOUR_ID'  // paste your exact Kraken affiliate link
  },
  {
    name: 'Bybit',
    url: 'https://www.bybit.com',
    description: 'Popular derivatives-first exchange with deep perpetual-futures markets.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://www.bybit.com/invite?ref=YOUR_ID'  // paste your exact Bybit referral link
  },
  {
    name: 'OKX',
    url: 'https://www.okx.com',
    description: 'Major global exchange combining spot, derivatives, and a built-in Web3 wallet.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://www.okx.com/join/YOUR_ID'  // paste your exact OKX referral link
  },

  // Portfolio & Wallets
  {
    name: 'Zerion',
    url: 'https://zerion.io',
    description: 'Self-custody wallet and dashboard that unifies your DeFi and NFT activity in one view.',
    sections: ['crypto'],
    group: 'Portfolio & Wallets'
  },
  {
    name: 'CoinStats',
    url: 'https://coinstats.app',
    description: 'Aggregates exchange and wallet balances into a single portfolio tracker with price alerts.',
    sections: ['crypto'],
    group: 'Portfolio & Wallets'
  },

  // NFT
  {
    name: 'OpenSea',
    url: 'https://opensea.io',
    description: 'The largest general NFT marketplace, spanning art, collectibles, and more across chains.',
    sections: ['crypto'],
    group: 'NFT'
  },
  {
    name: 'Blur',
    url: 'https://blur.io',
    description: 'Pro-grade NFT marketplace and aggregator built for high-volume traders sweeping floors.',
    sections: ['crypto'],
    group: 'NFT'
  },

  // News & Research (crypto)
  {
    name: 'CoinDesk',
    url: 'https://www.coindesk.com',
    description: 'Long-running crypto newsroom covering markets, policy, and the industry at large.',
    sections: ['crypto'],
    group: 'News & Research'
  },
  {
    name: 'Cointelegraph',
    url: 'https://cointelegraph.com',
    description: 'High-volume crypto news with markets coverage, analysis, and beginner-friendly explainers.',
    sections: ['crypto'],
    group: 'News & Research'
  },
  {
    name: 'The Block',
    url: 'https://www.theblock.co',
    description: 'Data-driven reporting and research trusted for breaking institutional and on-chain stories.',
    sections: ['crypto'],
    group: 'News & Research'
  },
  {
    name: 'Bankless',
    url: 'https://www.bankless.com',
    description: "Media and newsletter for going 'bankless' — DeFi, Ethereum, and crypto-native strategy.",
    sections: ['crypto'],
    group: 'News & Research'
  },

  /* ----------------------------------------------------- MACRO & ECONOMY */

  {
    name: 'FRED',
    url: 'https://fred.stlouisfed.org',
    description: "The St. Louis Fed's vast, free database of U.S. and global economic series — the macro gold standard.",
    sections: ['macro'],
    group: 'Economic Data'
  },
  {
    name: 'Trading Economics',
    url: 'https://tradingeconomics.com',
    description: 'Global economic indicators, forecasts, and calendars for 190+ countries in one place.',
    sections: ['macro'],
    group: 'Economic Data'
  },
  {
    name: 'Investing.com',
    url: 'https://www.investing.com',
    description: 'All-in-one real-time data across stocks, forex, crypto, and commodities, plus a heavily used economic calendar.',
    sections: ['macro', 'stocks', 'crypto'],
    group: 'Cross-Asset & Calendars'
  },
  {
    name: 'Forex Factory',
    url: 'https://www.forexfactory.com',
    description: "The trader's favorite economic calendar, with clear impact ratings and a busy news feed.",
    sections: ['macro'],
    group: 'Cross-Asset & Calendars'
  }
];
