/*
 * Market Hub — curated seed links.
 * Each entry: { name, url, description, sections:[...], group, affiliate? }
 *   sections:  any of 'stocks' | 'crypto' | 'macro'  (an item may belong to several)
 *   group:     the sub-heading it appears under
 *   affiliate: OPTIONAL. Your referral/affiliate URL for this tool. When set (and the
 *              placeholder is replaced), the card links here instead of `url`, shows a
 *              "Partner" badge, and gets rel="sponsored" — and the footer disclosure shows.
 *   overview / bestFor / faqs: OPTIONAL rich content for the tool's /tools/<slug>.html page
 *              (overview: [paragraphs], bestFor: [bullets], faqs: [{q,a}]). Falls back to a template.
 *   icon:      OPTIONAL. 'mono' forces a coloured letter tile (for tools with no real favicon),
 *              or a custom favicon URL.
 *   image:     OPTIONAL. A screenshot shown on the tool page. Use a root-absolute path like
 *              '/assets/screenshots/<slug>.png' (see assets/screenshots/README.md) or a full URL.
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
    affiliate: 'https://www.tradingview.com/?aff_id=YOUR_ID',  // replace YOUR_ID with your TradingView affiliate id
    overview: [
      "TradingView is the most widely used charting platform on the web, pairing professional-grade price charts with a huge social network of traders. It runs entirely in the browser, covers stocks, crypto, forex, futures and indices, and has become such a standard that many brokers and exchanges embed its charts directly into their own platforms.",
      "Its real strength is breadth without clutter: hundreds of built-in indicators, a custom scripting language (Pine Script) for building your own studies and strategies, multi-chart layouts, and flexible alerts that can fire on price, an indicator or a trendline. The free tier covers most of what a beginner needs, while paid plans add more indicators and alerts per chart, extra layouts and faster data."
    ],
    bestFor: [
      "Charting every asset class from one clean interface",
      "Setting price and indicator alerts delivered by app, email or SMS",
      "Building and back-testing custom indicators with Pine Script",
      "Following and publishing trade ideas within a large community"
    ],
    faqs: [
      { q: "Is TradingView free?", a: "Yes. The free plan includes full charting, a large indicator library and basic alerts. Paid tiers mainly add more indicators and alerts per chart, extra saved layouts and faster, second-based data." },
      { q: "Can I place trades from TradingView?", a: "You can connect supported brokers and exchanges to trade directly from the chart, but TradingView itself is a charting and analysis platform rather than a broker." },
      { q: "Does TradingView cover both crypto and stocks?", a: "Yes — it spans stocks, crypto, forex, futures, bonds and indices, with data drawn from hundreds of global exchanges." }
    ]
  },
  {
    name: 'StockCharts',
    url: 'https://stockcharts.com',
    description: 'Veteran technical-analysis suite known for clean point-&-figure charts, market-breadth indicators, and sector-rotation tools.',
    sections: ['stocks'],
    group: 'Charting & Technical Analysis',
    image: '/assets/screenshots/stockcharts.webp',
    overview: [
      "StockCharts is a long-established technical-analysis platform built specifically for stock and ETF chartists. It's known for clean, reliable charting and a strong library of educational material — including the widely cited ChartSchool reference.",
      "Beyond standard charts, it shines at market-breadth and sector-rotation analysis: point-and-figure charts, relative-strength tools, and curated indicator sets that help you read the health of the whole market, not just one ticker. A free tier covers the basics, with paid plans for real-time data and saved chartlists."
    ],
    bestFor: [
      "Clean, dependable charting for stocks and ETFs",
      "Market-breadth and sector-rotation analysis",
      "Point-and-figure and relative-strength studies",
      "Learning technical analysis via ChartSchool"
    ],
    faqs: [
      { q: "Is StockCharts free?", a: "There's a free version with basic charting; paid memberships add real-time data, more saved chartlists, scans and additional indicators." },
      { q: "What is StockCharts best known for?", a: "Its clean charts, market-breadth indicators, sector-rotation tools, and the free ChartSchool — one of the best technical-analysis references online." },
      { q: "Does StockCharts cover crypto?", a: "It focuses on stocks, ETFs, indices and some futures/forex. For crypto charting, TradingView is a better fit." }
    ]
  },

  // Market Data & Quotes
  {
    name: 'Yahoo Finance',
    url: 'https://finance.yahoo.com',
    description: 'The most popular free finance hub: quotes, financial statements, analyst targets, news, and watchlists for virtually any ticker.',
    sections: ['stocks'],
    group: 'Market Data & Quotes',
    overview: [
      "Yahoo Finance is the most popular free financial hub on the web, giving fast access to quotes, charts, news and fundamental data for virtually any stock, ETF, index, currency or major cryptocurrency. For millions of retail investors it's the default first place to check a ticker.",
      "It's a capable daily driver: build watchlists, scan analyst price targets and upcoming earnings dates, read aggregated news, review financial statements and key ratios, and download historical prices as CSV. A premium tier adds deeper research and screening, but the free version covers most everyday needs."
    ],
    bestFor: [
      "Quick quotes, charts and news for almost any ticker",
      "Reviewing financial statements, ratios and analyst targets",
      "Building and tracking free watchlists",
      "Downloading historical price data for analysis"
    ],
    faqs: [
      { q: "Is Yahoo Finance free?", a: "Yes. Core quotes, news, financials and watchlists are free; Yahoo Finance Plus is an optional paid upgrade for deeper research and screening." },
      { q: "How accurate is Yahoo Finance data?", a: "It's reliable for everyday use and widely cited, though quotes can be slightly delayed and occasional data errors occur — verify critical figures against primary filings." },
      { q: "Can I export data from Yahoo Finance?", a: "Yes — historical price data can be downloaded as a CSV file from each asset's historical-data tab." }
    ]
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
    group: 'Market Data & Quotes',
    overview: [
      "Koyfin is often described as a free, browser-based alternative to the Bloomberg Terminal. It packs an enormous amount of data — equities, ETFs, funds, analyst estimates, and macro — into customisable dashboards that feel professional without the professional price tag.",
      "It's especially strong for fundamental and cross-asset analysis: compare companies side by side, track estimate revisions, build watchlists with custom columns, and overlay macro series like rates and currencies. A generous free tier covers most retail needs, with paid plans unlocking deeper history and more dashboards."
    ],
    bestFor: [
      "Bloomberg-style dashboards without the cost",
      "Comparing fundamentals and analyst estimates",
      "Building custom watchlists and screens",
      "Overlaying equities with macro data"
    ],
    faqs: [
      { q: "Is Koyfin really free?", a: "Yes — there's a capable free tier. Paid plans add longer history, more watchlists/dashboards, and advanced features for power users." },
      { q: "Koyfin vs a Bloomberg Terminal?", a: "Koyfin covers a large share of what most retail and many professional users need at a tiny fraction of the cost, though a full Bloomberg Terminal still goes far deeper for institutions." },
      { q: "Does Koyfin cover global markets?", a: "Yes, it includes international equities, ETFs, funds and macro data, not just US listings." }
    ]
  },

  // Screeners
  {
    name: 'Finviz',
    url: 'https://finviz.com',
    description: 'Lightning-fast stock screener with a famous market heatmap and visual filters — a daily go-to for many traders.',
    sections: ['stocks'],
    group: 'Screeners',
    overview: [
      "Finviz is a fast, visual stock screener and market-overview tool best known for its colour-coded market heatmap, which shows the entire US market's performance at a single glance. It's a daily go-to for equity traders who want to read the market's mood quickly.",
      "The free screener filters thousands of stocks by descriptive, fundamental and technical criteria, with charts, news, insider transactions and analyst data on every ticker. Finviz Elite adds real-time data, intraday charts, advanced screener filters and backtesting for more serious users."
    ],
    bestFor: [
      "Screening US stocks by fundamental and technical filters",
      "Reading sector and market moves via the heatmap",
      "Scanning charts and news quickly across many tickers",
      "Spotting setups and outliers fast"
    ],
    faqs: [
      { q: "Is Finviz free?", a: "The core screener, heatmap and charts are free with slightly delayed data. Finviz Elite is a paid upgrade adding real-time quotes, intraday charts, more filters and backtesting." },
      { q: "Does Finviz cover crypto or international stocks?", a: "Finviz focuses mainly on US-listed equities and ETFs, with some futures and forex. It isn't a crypto or global-equities tool." },
      { q: "What is the Finviz heatmap?", a: "It's a tiled map of the market where each stock is sized by market capitalisation and coloured by performance, making the day's winners and losers obvious at a glance." }
    ]
  },
  {
    name: 'Stock Analysis',
    url: 'https://stockanalysis.com',
    description: 'Clean, free financial statements, ratios, and a capable screener with none of the usual paywall friction.',
    sections: ['stocks'],
    group: 'Screeners',
    overview: [
      "Stock Analysis (stockanalysis.com) has become a favourite for its clean, fast, genuinely free access to financial data. Where many sites bury statements behind paywalls, it presents income statements, balance sheets, cash flows and ratios clearly and without friction.",
      "Alongside per-company data it offers a capable stock screener, IPO and earnings calendars, and ETF information — all in a refreshingly uncluttered interface. It's an excellent first stop for fundamental research before reaching for heavier paid tools."
    ],
    bestFor: [
      "Free, no-paywall financial statements and ratios",
      "A fast, clean screener for stocks and ETFs",
      "Quick fundamental checks on any ticker",
      "IPO and earnings calendars"
    ],
    faqs: [
      { q: "Is Stock Analysis really free?", a: "The core financials, ratios, screener and calendars are free. There's an optional Pro subscription for deeper history, more screening criteria and extra export features." },
      { q: "How reliable is the data?", a: "It's well-regarded for everyday research and pulls from standard financial sources, though for critical decisions you should still verify against primary filings on SEC EDGAR." },
      { q: "Does it cover international stocks?", a: "Coverage is strongest for US-listed companies and ETFs, with some international tickers." }
    ]
  },

  // Fundamentals & Research
  {
    name: 'Morningstar',
    url: 'https://www.morningstar.com',
    description: 'Independent research, star ratings, and fair-value estimates — especially strong for funds and long-term investors.',
    sections: ['stocks'],
    group: 'Fundamentals & Research',
    overview: [
      "Morningstar is one of the most respected names in independent investment research, best known for its star ratings and analyst-driven fair-value estimates. It's a go-to for long-term investors who want a considered second opinion rather than just raw data.",
      "Its coverage is especially strong for mutual funds and ETFs — where its ratings and the 'economic moat' framework are widely cited — but it also covers individual stocks with analyst reports and valuation estimates. A free account gives access to much of the data, with Morningstar Investor adding premium analysis and portfolio tools."
    ],
    bestFor: [
      "Independent fund and ETF research and ratings",
      "Analyst fair-value estimates and moat ratings",
      "Long-term, valuation-focused investing",
      "A considered second opinion on holdings"
    ],
    faqs: [
      { q: "What are Morningstar star ratings?", a: "For funds, stars are a backward-looking, risk-adjusted measure of past performance versus peers. For stocks, the star rating reflects price relative to Morningstar's fair-value estimate — not past returns." },
      { q: "Is Morningstar free?", a: "A free account unlocks a lot of data and articles. Morningstar Investor is a paid subscription adding premium analyst reports, ratings detail and portfolio tools." },
      { q: "What is an economic moat?", a: "Morningstar's term for a durable competitive advantage — pricing power, network effects, switching costs — that helps a company defend profits over time." }
    ]
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
    group: 'Fundamentals & Research',
    icon: 'mono'
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
    group: 'Filings & Ownership',
    overview: [
      "SEC EDGAR is the official US Securities and Exchange Commission database of company filings, and the primary source for serious research on US-listed companies. Everything public companies are legally required to disclose is filed here, for free.",
      "You can read annual reports (10-K), quarterly reports (10-Q), material-event disclosures (8-K), insider transactions (Forms 3, 4 and 5) and institutional holdings (13F), all fully text-searchable. When accuracy matters, going to the primary source on EDGAR beats relying on second-hand summaries."
    ],
    bestFor: [
      "Reading primary-source filings for US-listed companies",
      "Reviewing 10-K and 10-Q financial reports",
      "Tracking insider transactions and institutional holdings",
      "Verifying claims against official disclosures"
    ],
    faqs: [
      { q: "Is SEC EDGAR free?", a: "Yes — EDGAR is a free public service of the US SEC, with no account required." },
      { q: "What's the difference between a 10-K and a 10-Q?", a: "A 10-K is the comprehensive, audited annual report; a 10-Q is a lighter quarterly update. Both cover financials, risks and business operations." },
      { q: "Does EDGAR cover non-US companies?", a: "It covers companies that file with the US SEC, which includes many foreign firms listed in the US (often via Form 20-F), but not purely domestic non-US listings." }
    ]
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
    group: 'Options & Derivatives',
    icon: 'mono'
  },
  {
    name: 'Market Chameleon',
    url: 'https://marketchameleon.com',
    description: 'Options-focused analytics — implied volatility, expected earnings moves, and premium strategy screeners.',
    sections: ['stocks'],
    group: 'Options & Derivatives',
    icon: 'mono'
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
    group: 'Earnings & Calendars',
    icon: 'mono'
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
    group: 'Market Data & Aggregators',
    overview: [
      "CoinGecko is one of the most comprehensive and independent sources of cryptocurrency market data, tracking thousands of coins and tokens across hundreds of exchanges. Because it isn't owned by any single exchange, its rankings and listings are widely regarded as neutral.",
      "For each asset you get price, market cap, trading volume, circulating and total supply, historical charts and links to official resources, alongside broader metrics like market dominance and category breakdowns. It's a fast first stop for sizing up a project — checking how large it really is and how much future supply is still to be released — before you dig deeper."
    ],
    bestFor: [
      "Comparing coins by market cap, volume and supply",
      "Checking circulating vs total supply and potential dilution",
      "Researching thousands of tokens from a neutral source",
      "Tracking overall market trends and Bitcoin dominance"
    ],
    faqs: [
      { q: "Is CoinGecko free?", a: "Yes — the website and core data are free to use. There's also a developer API with both free and paid tiers." },
      { q: "CoinGecko vs CoinMarketCap — what's the difference?", a: "Both are leading aggregators. CoinGecko is independent, whereas CoinMarketCap is owned by Binance, so many people cross-check both for data and listings." },
      { q: "Does a CoinGecko listing mean a coin is safe?", a: "No. CoinGecko lists a very wide range of assets, including small and brand-new tokens. A listing is not an endorsement — always do your own research." }
    ]
  },
  {
    name: 'CoinMarketCap',
    url: 'https://coinmarketcap.com',
    description: 'The most-visited price and market-cap aggregator, with rankings, watchlists, and event data.',
    sections: ['crypto'],
    group: 'Market Data & Aggregators',
    overview: [
      "CoinMarketCap is the most-visited cryptocurrency price aggregator, tracking prices, market caps and trading volumes for thousands of assets. For many people it's the very first site they use to check a coin's price.",
      "It offers rankings, watchlists, historical data, exchange listings and an events calendar, plus beginner-friendly educational content. CoinMarketCap is owned by Binance, so some users cross-reference it with independent aggregators such as CoinGecko for listings and data."
    ],
    bestFor: [
      "Checking prices and market-cap rankings quickly",
      "Building watchlists and tracking favourites",
      "Researching which exchanges list an asset",
      "Following a calendar of crypto events"
    ],
    faqs: [
      { q: "Is CoinMarketCap free?", a: "Yes — the site and core data are free, with a developer API offering free and paid tiers." },
      { q: "Who owns CoinMarketCap?", a: "It's owned by Binance. It still operates as a broad, multi-exchange aggregator, but some users cross-check listings against independent sources." },
      { q: "CoinMarketCap vs CoinGecko?", a: "Both are top aggregators with similar data. CoinMarketCap is owned by Binance and gets the most traffic; CoinGecko is independent. Many people consult both." }
    ]
  },
  {
    name: 'Messari',
    url: 'https://messari.io',
    description: 'Professional-grade crypto research, curated data, and clear asset profiles for serious due diligence.',
    sections: ['crypto'],
    group: 'Market Data & Aggregators',
    overview: [
      "Messari is a research-first crypto data platform aimed at serious due diligence rather than quick price checks. It curates vetted data and clear asset profiles, cutting through the noise of self-reported metrics that plague parts of the industry.",
      "It's known for in-depth research reports, structured fundamentals, on-chain and market data, governance tracking, and news intelligence. A free tier covers asset profiles and core data, while Messari Pro and Enterprise add deeper research, screening and analytics for professionals."
    ],
    bestFor: [
      "Serious due diligence and asset research",
      "Vetted, structured fundamentals and metrics",
      "In-depth research reports and news intelligence",
      "Tracking governance and tokenomics"
    ],
    faqs: [
      { q: "Is Messari free?", a: "Core asset profiles, data and some research are free. Messari Pro and Enterprise are paid tiers adding advanced research, screening, charting and analytics." },
      { q: "Who is Messari for?", a: "Anyone doing genuine research — from diligent retail investors to analysts and funds — who wants curated, reliable data over raw aggregator numbers." },
      { q: "How is Messari different from CoinGecko or CoinMarketCap?", a: "Aggregators focus on prices and rankings across thousands of coins; Messari leans into vetted data, fundamentals and original research for deeper analysis." }
    ]
  },

  // Derivatives & Futures
  {
    name: 'Coinglass',
    url: 'https://www.coinglass.com',
    description: 'Essential derivatives dashboard — funding rates, open interest, and liquidation maps across exchanges.',
    sections: ['crypto'],
    group: 'Derivatives & Futures',
    overview: [
      "Coinglass is one of the most widely used dashboards for crypto derivatives data. It aggregates funding rates, open interest, long/short ratios and liquidation data across the major exchanges, giving a clear read on leverage and positioning that spot prices alone can't show.",
      "Traders use it to gauge when the market is overheated — crowded longs paying high funding, stretched open interest — and to anticipate the liquidation cascades that cause sharp wicks. Most core data is free, making it a staple for anyone watching the futures side of the market."
    ],
    bestFor: [
      "Tracking funding rates and open interest",
      "Reading long/short positioning and leverage",
      "Watching liquidation levels and cascades",
      "Gauging when the market is overheated"
    ],
    faqs: [
      { q: "Is Coinglass free?", a: "Most of the core derivatives data — funding, open interest, liquidations — is free to view, with optional paid features for heavier users." },
      { q: "What is a funding rate?", a: "A periodic payment between longs and shorts on perpetual futures. Persistently high positive funding means crowded longs paying to stay in — often a sign of an overheated market." },
      { q: "What does open interest tell me?", a: "The total value of open futures contracts. Rising open interest into a move shows conviction; a sharp drop usually means positions closing or being liquidated." }
    ]
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
    group: 'On-Chain Analytics',
    overview: [
      "Glassnode is a leading on-chain analytics platform that turns raw blockchain activity into market-relevant metrics and charts. Analysts and institutions use it to understand what holders are actually doing — beyond what price alone reveals.",
      "It surfaces indicators like exchange in/outflows, supply held by long-term holders, profitability metrics (MVRV, SOPR, NUPL) and network activity, with a free tier and paid plans for deeper, higher-resolution data. It works best as a third lens alongside price charts and derivatives data."
    ],
    bestFor: [
      "Reading on-chain supply, flows and holder behaviour",
      "Tracking profitability metrics like MVRV and SOPR",
      "Confirming market trends with blockchain data",
      "Adding an on-chain lens to technical analysis"
    ],
    faqs: [
      { q: "Is Glassnode free?", a: "Glassnode has a free tier with a selection of metrics; advanced and higher-resolution indicators require a paid subscription." },
      { q: "Do I need to be an expert to use Glassnode?", a: "Basic charts are approachable, but many metrics assume some on-chain literacy. The Market Hub On-Chain Analysis course is a good primer on what the key indicators mean." },
      { q: "Which blockchains does Glassnode cover?", a: "It focuses on major assets such as Bitcoin and Ethereum, with the deepest metric coverage for Bitcoin." }
    ]
  },
  {
    name: 'Dune',
    url: 'https://dune.com',
    description: 'Query and visualize raw blockchain data with SQL, or browse thousands of community-built dashboards.',
    sections: ['crypto'],
    group: 'On-Chain Analytics',
    overview: [
      "Dune is a powerful platform for querying raw blockchain data using SQL and turning it into live charts and dashboards. Instead of relying on someone else's metric, you can ask the blockchain your own questions — and share the answer as an interactive dashboard.",
      "You don't have to write a single query to get value, though: Dune hosts thousands of community-built dashboards covering protocols, NFTs, DeFi, stablecoins and more. It's become the de-facto place analysts publish on-chain research. A free tier lets you explore and fork dashboards, with paid plans for heavier querying."
    ],
    bestFor: [
      "Querying blockchain data directly with SQL",
      "Browsing and forking community dashboards",
      "Building custom on-chain analytics",
      "Following protocol, DeFi and NFT metrics"
    ],
    faqs: [
      { q: "Do I need to know SQL to use Dune?", a: "No — you can browse and use thousands of existing community dashboards for free. SQL only becomes necessary if you want to build your own custom queries." },
      { q: "Is Dune free?", a: "Yes, exploring and forking dashboards is free. Paid plans add private queries, higher performance, larger limits and team features." },
      { q: "Which blockchains does Dune support?", a: "Many — Ethereum and major EVM chains plus others like Solana — so you can analyse activity across ecosystems in one place." }
    ]
  },
  {
    name: 'Nansen',
    url: 'https://www.nansen.ai',
    description: "Labels millions of wallets so you can follow 'smart money' and track on-chain flows in real time.",
    sections: ['crypto'],
    group: 'On-Chain Analytics',
    overview: [
      "Nansen's edge is wallet labelling: it tags millions of on-chain addresses — exchanges, funds, notable traders and projects — so anonymous blockchain activity becomes readable. Instead of staring at hex addresses, you can see what 'Smart Money' is actually doing.",
      "With those labels it offers dashboards for token flows, smart-money movements, NFT activity, and wallet profiling in near real time. It's a professional-grade tool used to spot accumulation, follow influential players and confirm trends with on-chain behaviour. Plans are subscription-based, with tiers for different depth of access."
    ],
    bestFor: [
      "Following 'smart money' wallets in real time",
      "Tracking token flows and accumulation",
      "Profiling wallets and entities via labels",
      "Confirming trends with on-chain behaviour"
    ],
    faqs: [
      { q: "What makes Nansen unique?", a: "Its wallet-labelling database — tagging millions of addresses — which turns anonymous on-chain data into something you can actually follow, like tracking what funds and profitable traders do." },
      { q: "Is Nansen free?", a: "Nansen is primarily a paid product with subscription tiers, though it has offered limited free features. It's aimed at serious users who want a real on-chain edge." },
      { q: "Are wallet labels always correct?", a: "Labels are probabilistic and best used as signals, not certainty. Look for confluence across many wallets rather than acting on a single labelled address." }
    ]
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
    group: 'DeFi & TVL',
    overview: [
      "DefiLlama is the most widely trusted, neutral source for DeFi analytics, best known for tracking Total Value Locked (TVL) across protocols and blockchains. It's run independently and avoids token bias, which is exactly why its figures are so widely cited.",
      "Beyond TVL it covers stablecoin supply, DEX volumes, protocol fees and revenue, yields, bridges and chain-by-chain breakdowns — a one-stop dashboard for understanding where money actually sits and moves in DeFi. It's free and needs no account."
    ],
    bestFor: [
      "Comparing DeFi protocols and chains by TVL",
      "Tracking stablecoin supply and DEX volumes",
      "Researching protocol fees, revenue and yields",
      "Getting neutral, token-agnostic DeFi data"
    ],
    faqs: [
      { q: "What is TVL?", a: "Total Value Locked is the dollar value of assets deposited in a protocol — a rough gauge of usage and trust. It can be inflated by token prices or double-counting, so read it alongside fees and revenue." },
      { q: "Is DefiLlama free?", a: "Yes, entirely free with no account required, and it offers a free public API that many other apps rely on." },
      { q: "Why is DefiLlama considered neutral?", a: "It's independently run and doesn't promote its own token or sell listings, so its rankings aren't pay-to-play — the main reason it's the industry reference for TVL." }
    ]
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
    group: 'Block Explorers',
    overview: [
      "Etherscan is the definitive block explorer for Ethereum, letting anyone inspect transactions, addresses, smart contracts and tokens on the network. If something happens on Ethereum, Etherscan is where you verify it.",
      "Paste in a transaction hash to confirm it succeeded, look up any wallet's balance and full history, read or interact with verified contract code, follow token transfers, and watch gas prices in real time. It's essential for everything from confirming a withdrawal landed to researching who holds a token."
    ],
    bestFor: [
      "Confirming whether an Ethereum transaction went through",
      "Looking up any wallet address and its full history",
      "Inspecting and verifying smart-contract code",
      "Checking a token's holder list and live gas prices"
    ],
    faqs: [
      { q: "Is Etherscan free?", a: "Yes. Browsing transactions, addresses, contracts and tokens is free, and there's a developer API with free and paid tiers." },
      { q: "Does Etherscan work for other blockchains?", a: "Etherscan covers Ethereum. Sister explorers run the same way for other chains — for example BscScan, Polygonscan and Arbiscan." },
      { q: "Can I see who owns a wallet on Etherscan?", a: "No — addresses are pseudonymous. You can see balances, activity and sometimes public labels, but not a real-world identity." }
    ]
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
    group: 'DEX & Discovery',
    overview: [
      "DEX Screener is the go-to dashboard for tracking tokens trading on decentralised exchanges. It shows real-time price, volume, liquidity and charts for DEX pairs across dozens of chains — the first place many traders look when a new token starts moving.",
      "It's built for speed and discovery: trending lists, new-pair feeds, liquidity and transaction data, and quick links to the underlying contracts. That same power demands caution — most tokens here are brand new and unvetted, so DEX Screener is a research and monitoring tool, not a seal of approval."
    ],
    bestFor: [
      "Real-time DEX pair charts and liquidity",
      "Spotting new and trending tokens early",
      "Tracking on-chain volume and transactions",
      "Monitoring positions across many chains"
    ],
    faqs: [
      { q: "Is DEX Screener free?", a: "Yes, the core charts, trending lists and pair data are free. There are optional paid features (like enhanced token profiles) aimed at projects." },
      { q: "Does a token on DEX Screener mean it's safe?", a: "No. Any token trading on a DEX appears automatically — including scams. Always check liquidity, holders and the contract, and never invest based on a chart alone." },
      { q: "Which chains does DEX Screener cover?", a: "Dozens, including Ethereum, Solana, BNB Chain, Base, Arbitrum and many more EVM and non-EVM networks." }
    ]
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
    affiliate: 'https://accounts.binance.com/register?ref=YOUR_ID',  // paste your exact Binance referral link
    overview: [
      "Binance is the largest cryptocurrency exchange in the world by trading volume, offering one of the deepest liquidity pools and the widest selection of tradable assets anywhere. It serves everyone from first-time buyers using its simple 'Buy Crypto' flow to professional traders running leveraged derivatives.",
      "Beyond spot trading, Binance provides advanced order types, perpetual and quarterly futures, staking and 'earn' products, and a built-in Web3 wallet. Because crypto rules differ by country, the exact features and even the legal entity you use can vary by region — so the product set you see depends on where you register."
    ],
    bestFor: [
      "Accessing deep liquidity and tight spreads on major pairs",
      "Trading a very wide range of coins and tokens in one place",
      "Spot, margin and derivatives from a single account",
      "Earning yield through staking and savings products"
    ],
    faqs: [
      { q: "Is Binance available in my country?", a: "Binance operates globally, but its features and availability differ by jurisdiction, and some regions use a separate local entity. Check exactly what's offered when you register from your country." },
      { q: "Is Binance good for beginners?", a: "Yes. There's a simple buy flow for newcomers and a full advanced interface for later. Start small, fund by bank transfer rather than card to save on fees, and turn on two-factor authentication." },
      { q: "What fees does Binance charge?", a: "Trading fees are a small percentage per trade with maker/taker tiers that fall as your volume grows — generally lower than convenience apps. Card purchases cost more than bank transfers." }
    ]
  },
  {
    name: 'Coinbase',
    url: 'https://www.coinbase.com',
    description: 'The most trusted U.S.-listed on-ramp, known for ease of use and regulatory compliance.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://www.coinbase.com/join/YOUR_ID',  // paste your exact Coinbase referral link
    overview: [
      "Coinbase is the most widely trusted on-ramp into crypto for newcomers, particularly in the United States, where it's a publicly listed company subject to regulatory oversight. Its reputation rests on ease of use, a clean mobile app, and a strong compliance track record.",
      "The standard Coinbase app is built for simplicity — buy, sell and hold a curated list of assets — while Coinbase Advanced offers a full trading interface with noticeably lower fees on the same account. Coinbase also offers a separate self-custody app, Coinbase Wallet, for interacting with DeFi and NFTs where you hold your own keys."
    ],
    bestFor: [
      "Buying your first crypto on a simple, regulated platform",
      "A polished mobile experience with easy bank or card funding",
      "Lower fees via Coinbase Advanced once you're comfortable",
      "Pairing with Coinbase Wallet for self-custody and DeFi"
    ],
    faqs: [
      { q: "Is Coinbase safe?", a: "Coinbase is a US-listed, regulated exchange with strong security practices. As with any custodial platform, enable two-factor authentication and consider moving long-term holdings into self-custody." },
      { q: "Why are Coinbase's fees higher?", a: "The simple Coinbase app bundles convenience into wider spreads and fees. Switching to Coinbase Advanced — same login, same account — gives substantially lower trading fees." },
      { q: "What's the difference between Coinbase and Coinbase Wallet?", a: "Coinbase is the custodial exchange that holds your keys for you. Coinbase Wallet is a separate self-custody app where you control your own keys for DeFi, NFTs and other chains." }
    ]
  },
  {
    name: 'Kraken',
    url: 'https://www.kraken.com',
    description: 'Long-standing exchange respected for security, fiat support, and solid liquidity.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://www.kraken.com/sign-up?ref=YOUR_ID',  // paste your exact Kraken affiliate link
    overview: [
      "Kraken is one of the longest-running cryptocurrency exchanges, founded in 2011, and has built its reputation on security, reliability and strong fiat support. It's a common pick for users who value a solid track record and regulatory engagement over having the absolute widest coin selection.",
      "The standard interface keeps buying and selling simple, while Kraken Pro adds full charting, advanced order types and lower fees on the same account. Kraken supports spot and (where permitted) margin and futures trading, staking, and a wide range of fiat funding options across many countries."
    ],
    bestFor: [
      "Security-conscious users who value a long track record",
      "Reliable fiat deposits and withdrawals in many currencies",
      "Lower fees and advanced orders via Kraken Pro",
      "Staking supported assets directly from your account"
    ],
    faqs: [
      { q: "Is Kraken safe?", a: "Kraken is one of the oldest exchanges with a strong security history and no major breach of customer funds. As always, enable two-factor authentication and consider self-custody for long-term holdings." },
      { q: "What's the difference between Kraken and Kraken Pro?", a: "The simple Kraken interface is built for quick buys and sells; Kraken Pro — same account — adds full charts, advanced order types and lower trading fees." },
      { q: "Does Kraken support my country?", a: "Kraken serves a large number of countries with broad fiat support, though some products like futures or staking are restricted in certain regions. Check availability when you sign up." }
    ]
  },
  {
    name: 'Bybit',
    url: 'https://www.bybit.com',
    description: 'Popular derivatives-first exchange with deep perpetual-futures markets.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://www.bybit.com/invite?ref=YOUR_ID',  // paste your exact Bybit referral link
    overview: [
      "Bybit is a derivatives-first cryptocurrency exchange popular with active traders for its deep perpetual-futures markets, fast matching engine and trader-focused interface. It has since broadened into spot trading, earn products and a wider ecosystem.",
      "Its core appeal is leverage and liquidity for futures. As with any derivatives platform, leverage sharply magnifies both gains and the risk of liquidation, so Bybit suits traders who already understand those risks rather than complete beginners."
    ],
    bestFor: [
      "Trading crypto perpetual and futures contracts",
      "Deep derivatives liquidity and fast execution",
      "Active traders who want advanced order types",
      "Spot trading and earn products alongside derivatives"
    ],
    faqs: [
      { q: "Is Bybit good for beginners?", a: "Bybit is primarily a derivatives exchange, and leveraged trading is risky for newcomers. Beginners are usually better off starting with simple spot purchases before considering futures." },
      { q: "What is a perpetual contract?", a: "A perpetual is a futures contract with no expiry date, letting you hold a leveraged long or short position indefinitely while paying or receiving periodic funding. Liquidation risk rises with leverage." },
      { q: "Does Bybit offer spot trading?", a: "Yes. Although best known for derivatives, Bybit also supports spot markets, staking and earn products." }
    ]
  },
  {
    name: 'OKX',
    url: 'https://www.okx.com',
    description: 'Major global exchange combining spot, derivatives, and a built-in Web3 wallet.',
    sections: ['crypto'],
    group: 'Exchanges',
    affiliate: 'https://www.okx.com/join/YOUR_ID',  // paste your exact OKX referral link
    overview: [
      "OKX is a major global cryptocurrency exchange offering a broad mix of spot, margin and derivatives markets alongside a built-in Web3 wallet and DeFi access. It's known for deep liquidity and a product range that spans both centralised trading and on-chain activity.",
      "The OKX app combines a custodial exchange with a self-custody Web3 wallet, so you can move between simple buying, advanced trading and DeFi from one place. As with all major exchanges, feature availability varies by region due to local regulation."
    ],
    bestFor: [
      "Spot, margin and derivatives in one platform",
      "Accessing DeFi via the built-in Web3 wallet",
      "Deep liquidity across a wide range of markets",
      "Traders who want both centralised and on-chain tools"
    ],
    faqs: [
      { q: "What makes OKX different?", a: "OKX pairs a full centralised exchange with an integrated self-custody Web3 wallet, so you can trade and access DeFi from the same app." },
      { q: "Is OKX available everywhere?", a: "OKX operates in many countries, but availability and specific features depend on local regulations — check what's offered when you register." },
      { q: "Does OKX support derivatives?", a: "Yes — OKX offers extensive derivatives including perpetual swaps and futures, in addition to spot and margin trading." }
    ]
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
    group: 'Economic Data',
    icon: 'mono',
    overview: [
      "FRED (Federal Reserve Economic Data), maintained by the Federal Reserve Bank of St. Louis, is the gold standard for free macroeconomic data. It hosts hundreds of thousands of time series — GDP, inflation, interest rates, employment, money supply and far more — from official sources worldwide.",
      "What makes FRED so useful is how easy it is to chart, combine and transform series: overlay inflation against rates, view year-over-year changes, or build custom comparisons, then export the data. It's the primary source professionals and analysts reach for when they want the real numbers rather than a headline."
    ],
    bestFor: [
      "Pulling official economic data straight from the source",
      "Charting inflation, rates, GDP and employment",
      "Combining and transforming economic series",
      "Putting markets in macro context"
    ],
    faqs: [
      { q: "Is FRED free?", a: "Yes — FRED is a completely free public service of the St. Louis Fed, with no account required, plus a free API for developers." },
      { q: "What data does FRED cover?", a: "Hundreds of thousands of US and international economic series: inflation, interest rates, GDP, employment, money supply, exchange rates and much more, from official statistical agencies." },
      { q: "Can I download FRED data?", a: "Yes, every series can be downloaded (CSV/Excel) and there's a robust free API for automated access." }
    ]
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
