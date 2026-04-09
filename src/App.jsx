<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ZRC Morning Intelligence · Zenith Rise Capital</title>
  <meta name="description" content="Geopolitical intelligence and investment advisory briefing by Zenith Rise Capital" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #060D18;
      color: #A5B4C8;
      font-family: 'Source Serif 4', Georgia, serif;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #060D18; }
    ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.4); }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes headerReveal { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    .header {
      border-bottom: 1px solid rgba(201,168,76,0.15);
      padding: 28px 32px 24px;
      animation: headerReveal 0.6s ease;
    }
    .header-inner { max-width: 900px; margin: 0 auto; }
    .header-row {
      display: flex; justify-content: space-between; align-items: flex-start;
      flex-wrap: wrap; gap: 16px;
    }
    .live-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #34D399;
      animation: pulse 2s ease infinite; box-shadow: 0 0 8px rgba(52,211,153,0.4);
      display: inline-block; vertical-align: middle;
    }
    .brand-tag {
      color: #C9A84C; font-size: 10px; font-weight: 700; letter-spacing: 3px;
      font-family: 'JetBrains Mono', monospace; vertical-align: middle; margin-left: 12px;
    }
    .main-title {
      color: #E8DCC8; font-size: 32px; font-weight: 600; margin: 6px 0 4px;
      font-family: 'Cormorant Garamond', Georgia, serif; letter-spacing: -0.5px;
    }
    .sub-title {
      color: #5A6A80; font-size: 13px;
      font-family: 'Source Serif 4', Georgia, serif;
    }
    .date-block { text-align: right; }
    .date-text {
      color: #A5B4C8; font-size: 14px; margin-bottom: 2px;
      font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500;
    }
    .time-text {
      color: #5A6A80; font-size: 12px;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 0.5px;
    }
    .legend { display: flex; gap: 16px; margin-top: 18px; flex-wrap: wrap; }
    .legend-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 1.5px; padding: 3px 8px;
      border-radius: 3px; font-family: 'JetBrains Mono', monospace;
    }

    main { max-width: 900px; margin: 0 auto; padding: 24px 32px 60px; }
    .desks-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px; flex-wrap: wrap; gap: 8px;
    }
    .mono-label {
      color: #5A6A80; font-size: 12px;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 1px;
    }
    .mono-hint {
      color: #5A6A80; font-size: 11px;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 0.5px;
    }

    .cat-btn {
      width: 100%; background: transparent;
      border: 1px solid rgba(201,168,76,0.1); border-radius: 6px;
      padding: 16px 20px; cursor: pointer; display: flex;
      align-items: center; justify-content: space-between;
      transition: all 0.3s ease; margin-bottom: 6px;
    }
    .cat-btn:hover { background: linear-gradient(90deg, rgba(201,168,76,0.06), transparent); }
    .cat-btn.open { background: linear-gradient(90deg, rgba(201,168,76,0.08), transparent); }
    .cat-btn-left { display: flex; align-items: center; gap: 14px; }
    .cat-icon { font-size: 22px; }
    .cat-label {
      color: #E8DCC8; font-size: 15px; font-weight: 600;
      font-family: 'Cormorant Garamond', Georgia, serif; letter-spacing: 0.3px;
    }
    .cat-desc {
      color: #5A6A80; font-size: 11.5px;
      font-family: 'Source Serif 4', Georgia, serif; margin-top: 2px;
    }
    .cat-count {
      color: #C9A84C; font-size: 10px; font-weight: 700; letter-spacing: 1px;
      font-family: 'JetBrains Mono', monospace; margin-right: 10px;
    }
    .cat-arrow {
      color: #5A6A80; font-size: 18px; transition: transform 0.3s ease; display: inline-block;
    }
    .cat-arrow.open { transform: rotate(180deg); }

    .cat-content { padding: 12px 0; animation: fadeIn 0.3s ease; }

    .spinner {
      width: 28px; height: 28px; border: 2px solid rgba(201,168,76,0.2);
      border-top-color: #C9A84C; border-radius: 50%;
      animation: spin 0.8s linear infinite; margin: 0 auto 12px;
    }
    .spinner-label {
      color: #5A6A80; font-size: 12px; text-align: center;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 1px;
    }

    .error-box {
      background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2);
      border-radius: 6px; padding: 14px 18px; color: #F87171; font-size: 13px;
    }

    .news-card {
      background: linear-gradient(135deg, rgba(15,25,45,0.95), rgba(10,18,35,0.98));
      border: 1px solid rgba(201,168,76,0.12); border-left: 3px solid rgba(201,168,76,0.4);
      border-radius: 6px; padding: 18px 20px; cursor: pointer;
      transition: all 0.3s ease; margin-bottom: 8px;
    }
    .news-card:hover, .news-card.expanded {
      border-left-color: rgba(201,168,76,0.8);
      background: linear-gradient(135deg, rgba(18,30,52,0.98), rgba(12,22,42,1));
    }
    .news-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
    .news-headline {
      color: #E8DCC8; font-size: 15px; font-weight: 600; line-height: 1.4;
      font-family: 'Cormorant Garamond', Georgia, serif; flex: 1;
    }
    .signal-badge {
      font-size: 10px; font-weight: 700; letter-spacing: 1.5px; padding: 3px 8px;
      border-radius: 3px; font-family: 'JetBrains Mono', 'SF Mono', monospace;
      white-space: nowrap; flex-shrink: 0;
    }
    .signal-bullish { background: #0D3B2E; color: #34D399; }
    .signal-bearish { background: #3B1A1A; color: #F87171; }
    .signal-neutral { background: #2A2A3A; color: #A5B4C8; }
    .signal-watch { background: #3B2E0D; color: #FBBF24; }

    .news-detail { margin-top: 12px; animation: fadeIn 0.3s ease; }
    .news-summary {
      color: #A5B4C8; font-size: 13.5px; line-height: 1.65; margin-bottom: 10px;
      font-family: 'Source Serif 4', Georgia, serif;
    }
    .news-relevance {
      background: rgba(201,168,76,0.06); border-radius: 4px; padding: 10px 14px;
      margin-bottom: 8px; color: #C9A84C; font-size: 12px; font-weight: 500;
      font-family: 'Source Serif 4', Georgia, serif;
    }
    .news-source {
      color: #5A6A80; font-size: 11px;
      font-family: 'JetBrains Mono', 'SF Mono', monospace; letter-spacing: 0.5px;
    }

    .takeaway-box {
      margin-top: 14px;
      background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03));
      border: 1px solid rgba(201,168,76,0.15); border-radius: 6px; padding: 14px 18px;
    }
    .takeaway-label {
      color: #C9A84C; font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      margin-bottom: 6px; font-family: 'JetBrains Mono', monospace;
    }
    .takeaway-text {
      color: #E8DCC8; font-size: 14px; line-height: 1.5;
      font-family: 'Source Serif 4', Georgia, serif; font-style: italic;
    }

    footer {
      border-top: 1px solid rgba(201,168,76,0.1); padding: 20px 32px; text-align: center;
    }
    .footer-brand {
      color: #3A4555; font-size: 11px;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 1px; margin-bottom: 4px;
    }
    .footer-legal {
      color: #2A3340; font-size: 10px;
      font-family: 'Source Serif 4', Georgia, serif;
    }

    @media (max-width: 640px) {
      .header { padding: 20px 16px 18px; }
      main { padding: 16px 16px 40px; }
      .main-title { font-size: 26px; }
      .header-row { flex-direction: column; }
      .date-block { text-align: left; }
      .cat-btn { padding: 14px 16px; }
      .news-card { padding: 14px 16px; }
    }
  </style>
</head>
<body>
  <div id="app"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.26.9/babel.min.js"></script>

  <script type="text/babel">
    const { useState, useEffect, useRef } = React;

    const CATEGORIES = [
      { id: "geopolitics", label: "Geopolitics & Security", icon: "\u{1F30D}", query: "major geopolitical developments conflicts international relations today 2026", description: "Conflicts, alliances, sanctions, and power shifts" },
      { id: "fdi", label: "FDI & Capital Flows", icon: "\u{1F4B0}", query: "foreign direct investment deals cross-border capital flows sovereign wealth fund 2026", description: "Cross-border investments, sovereign wealth, and capital movements" },
      { id: "critical-minerals", label: "Critical Minerals & Energy", icon: "\u{26A1}", query: "critical minerals cobalt lithium rare earths energy markets oil gas prices 2026", description: "Supply chains, commodity prices, and energy security" },
      { id: "real-estate", label: "Real Estate & Infrastructure", icon: "\u{1F3D7}\u{FE0F}", query: "commercial real estate investment infrastructure deals Europe global 2026", description: "Institutional RE, infrastructure projects, and market trends" },
      { id: "ma-growth", label: "M&A & Growth Advisory", icon: "\u{1F4CA}", query: "mergers acquisitions deals private equity venture capital growth advisory 2026", description: "Deal flow, PE/VC activity, and corporate transactions" },
      { id: "emerging-markets", label: "Emerging Markets", icon: "\u{1F30F}", query: "emerging markets Africa Latin America Southeast Asia investment opportunities risks 2026", description: "Frontier opportunities, risk signals, and market access" },
      { id: "trade-policy", label: "Trade & Industrial Policy", icon: "\u{1F3DB}\u{FE0F}", query: "tariffs trade policy sanctions export controls industrial policy economic security 2026", description: "Tariffs, sanctions, export controls, and economic statecraft" },
      { id: "food-agriculture", label: "Food & Agriculture", icon: "\u{1F33E}", query: "global food security agriculture commodity prices fertilizer supply chain 2026", description: "Food security, agribusiness, and agricultural commodities" }
    ];

    const SYSTEM_PROMPT = `You are the intelligence analyst for Zenith Rise Capital (ZRC), a geopolitical intelligence and real estate investment advisory firm.

Your task: Search for the most important and recent news on the given topic and produce a concise intelligence briefing.

CRITICAL RULES:
- Return ONLY valid JSON, no markdown, no backticks, no preamble
- Focus on the last 48 hours of developments
- Prioritize institutional-grade sources (Reuters, Bloomberg, FT, WSJ, official government sources, think tanks)
- Each item should have genuine analytical value for an investment advisor
- Include specific numbers, figures, and data points where available
- Flag items with direct implications for investment decisions

Return this exact JSON structure:
{
  "items": [
    {
      "headline": "Concise but specific headline",
      "summary": "2-3 sentence analytical summary with key data points. Written in institutional tone.",
      "source": "Source name",
      "relevance": "One sentence on why this matters for investment advisory",
      "signal": "bullish" | "bearish" | "neutral" | "watch"
    }
  ],
  "keyTakeaway": "One sentence synthesis of the most important signal across all items"
}

Return 4-6 items per query. Be specific, data-rich, and analytical.`;

    function SignalBadge({ signal }) {
      const cls = "signal-badge signal-" + (signal || "neutral");
      const labels = { bullish: "BULLISH", bearish: "BEARISH", neutral: "NEUTRAL", watch: "WATCH" };
      return <span className={cls}>{labels[signal] || "NEUTRAL"}</span>;
    }

    function NewsCard({ item, index }) {
      const [expanded, setExpanded] = useState(false);
      return (
        <div
          className={"news-card" + (expanded ? " expanded" : "")}
          onClick={() => setExpanded(!expanded)}
          style={{ animationDelay: index * 0.08 + "s", animation: "fadeSlideIn 0.4s ease " + (index * 0.08) + "s both" }}
        >
          <div className="news-card-header">
            <div className="news-headline">{item.headline}</div>
            <SignalBadge signal={item.signal} />
          </div>
          {expanded && (
            <div className="news-detail">
              <p className="news-summary">{item.summary}</p>
              <div className="news-relevance">{"\u26A1"} {item.relevance}</div>
              <span className="news-source">SOURCE: {(item.source || "").toUpperCase()}</span>
            </div>
          )}
        </div>
      );
    }

    function CategorySection({ category }) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [isOpen, setIsOpen] = useState(false);
      const fetched = useRef(false);

      async function fetchNews() {
        if (fetched.current || loading) return;
        fetched.current = true;
        setLoading(true);
        setError(null);
        try {
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1500,
              system: SYSTEM_PROMPT,
              tools: [{ type: "web_search_20250305", name: "web_search" }],
              messages: [{ role: "user", content: "Search for the latest developments on: " + category.query + ". Today's date is " + new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ". Return the JSON intelligence briefing." }]
            })
          });
          const result = await response.json();
          const textBlock = (result.content || []).filter(function(b) { return b.type === "text"; }).map(function(b) { return b.text; }).join("");
          if (textBlock) {
            const clean = textBlock.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(clean);
            setData(parsed);
          } else {
            setError("No results returned. Verify API access.");
          }
        } catch (err) {
          setError("Failed to fetch intelligence. Check API configuration.");
          console.error(err);
        }
        setLoading(false);
      }

      function handleToggle() {
        const next = !isOpen;
        setIsOpen(next);
        if (next && !fetched.current) fetchNews();
      }

      return (
        <div>
          <button className={"cat-btn" + (isOpen ? " open" : "")} onClick={handleToggle}>
            <div className="cat-btn-left">
              <span className="cat-icon">{category.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div className="cat-label">{category.label}</div>
                <div className="cat-desc">{category.description}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {data && <span className="cat-count">{(data.items || []).length} ITEMS</span>}
              <span className={"cat-arrow" + (isOpen ? " open" : "")}>{"\u25BE"}</span>
            </div>
          </button>

          {isOpen && (
            <div className="cat-content">
              {loading && (
                <div style={{ textAlign: "center", padding: "30px" }}>
                  <div className="spinner"></div>
                  <p className="spinner-label">SCANNING SOURCES...</p>
                </div>
              )}
              {error && <div className="error-box">{error}</div>}
              {data && (
                <div>
                  {(data.items || []).map(function(item, i) {
                    return <NewsCard key={i} item={item} index={i} />;
                  })}
                  {data.keyTakeaway && (
                    <div className="takeaway-box">
                      <div className="takeaway-label">KEY TAKEAWAY</div>
                      <div className="takeaway-text">{data.keyTakeaway}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    function App() {
      const [time, setTime] = useState(new Date());

      useEffect(function() {
        const t = setInterval(function() { setTime(new Date()); }, 60000);
        return function() { clearInterval(t); };
      }, []);

      const dateStr = time.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      const timeStr = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });

      return (
        <div>
          <header className="header">
            <div className="header-inner">
              <div className="header-row">
                <div>
                  <div>
                    <span className="live-dot"></span>
                    <span className="brand-tag">ZENITH RISE CAPITAL</span>
                  </div>
                  <h1 className="main-title">Morning Intelligence</h1>
                  <p className="sub-title">Geopolitical Observatory · Investor Intelligence · Advisory Signals</p>
                </div>
                <div className="date-block">
                  <div className="date-text">{dateStr}</div>
                  <div className="time-text">{timeStr}</div>
                </div>
              </div>
              <div className="legend">
                <span className="legend-badge signal-bullish">BULLISH</span>
                <span className="legend-badge signal-bearish">BEARISH</span>
                <span className="legend-badge signal-watch">WATCH</span>
                <span className="legend-badge signal-neutral">NEUTRAL</span>
              </div>
            </div>
          </header>

          <main>
            <div className="desks-header">
              <span className="mono-label">{CATEGORIES.length} INTELLIGENCE DESKS</span>
              <span className="mono-hint">TAP TO EXPAND · TAP ITEM FOR DETAIL</span>
            </div>
            {CATEGORIES.map(function(cat) {
              return <CategorySection key={cat.id} category={cat} />;
            })}
          </main>

          <footer>
            <div className="footer-brand">ZENITH RISE CAPITAL · GEOPOLITICAL INTELLIGENCE & INVESTMENT ADVISORY</div>
            <div className="footer-legal">Calesius Global S.L. · Madrid · This briefing is for informational purposes only and does not constitute investment advice.</div>
          </footer>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
