export interface Stock {
  id: number;
  symbol: string;
  price: number;
  change: number;
  date: string;
}

export interface Bond {
  id: number;
  name: string;
  yield: number;
  date: string;
}

export interface Bitcoin {
  id: number;
  price: number;
  date: string;
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  url: string;
  date: string;
}

export const getMockData = () => ({
  stocks: [
    { id: 1, symbol: 'AAPL', price: 150.25, change: 1.5, date: new Date().toISOString() },
    { id: 2, symbol: 'MSFT', price: 380.50, change: -0.8, date: new Date().toISOString() },
    { id: 3, symbol: 'TSLA', price: 242.80, change: 2.3, date: new Date().toISOString() },
  ],
  bonds: [
    { id: 1, name: '10Y Treasury', yield: 4.25, date: new Date().toISOString() },
    { id: 2, name: '2Y Treasury', yield: 4.75, date: new Date().toISOString() },
  ],
  bitcoin: [
    { id: 1, price: 62500, date: new Date().toISOString() },
  ],
  news: [
    { id: 1, title: 'Apple reports strong Q1 earnings', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 2, title: 'Fed signals pause on rate hikes', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 3, title: 'Bitcoin reaches new ATH', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 4, title: 'Microsoft announces new AI features', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 5, title: 'Tesla stock gains on new contract', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 6, title: 'Crypto market shows bullish signals', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 7, title: 'S&P 500 reaches record high', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 8, title: 'Bond yields stabilize after inflation data', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 9, title: 'Tech stocks outperform market expectations', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 10, title: 'Nvidia reports record GPU sales', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 11, title: 'Market volatility decreases amid stability', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 12, title: 'Ethereum network upgrade successful', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 13, title: 'IBM launches quantum computing service', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 14, title: 'Interest rates expected to remain stable', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 15, title: 'Amazon stock surges on cloud growth', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 16, title: 'Google announces new search features', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 17, title: 'Inflation concerns ease in June', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 18, title: 'Bitcoin institutional adoption grows', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 19, title: 'Nasdaq hits new milestone this quarter', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 20, title: 'Central banks discuss digital currencies', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 21, title: 'DeFi platforms see record transactions', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 22, title: 'Oil prices drop on supply surge', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 23, title: 'Treasury bonds attract foreign investors', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 24, title: 'Metaverse startups raise billions in funding', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 25, title: 'Healthcare stocks show resilience', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 26, title: 'Labor market remains strong', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 27, title: 'NFT market shows new growth patterns', source: 'CNBC', url: '#', date: new Date().toISOString() },
    { id: 28, title: 'Electric vehicle sales accelerate', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
    { id: 29, title: 'Renewable energy investments hit record', source: 'Reuters', url: '#', date: new Date().toISOString() },
    { id: 30, title: 'Financial sector embraces blockchain technology', source: 'CNBC', url: '#', date: new Date().toISOString() },
],
  ],
});
