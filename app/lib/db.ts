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
  ],
});