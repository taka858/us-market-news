import { promises as fs } from 'fs';
import path from 'path';

export default async function Home() {
  let stocks = [], bonds = [], bitcoin = null, news = [];
  
  try {
    // JSON ファイルから読み込む
    const jsonPath = path.join(process.cwd(), 'data/news.json');
    const fileContent = await fs.readFile(jsonPath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    stocks = data.stocks || [];
    bonds = data.bonds || [];
    bitcoin = data.bitcoin || null;
    news = data.news || [];
  } catch (error) {
    console.log("JSON読み込みエラー、ダミーデータを使用");
    // ダミーデータフォールバック
    stocks = [
      { id: 1, symbol: 'AAPL', price: 150.25, change: 1.5, date: new Date().toISOString() },
      { id: 2, symbol: 'MSFT', price: 380.50, change: -0.8, date: new Date().toISOString() },
      { id: 3, symbol: 'TSLA', price: 242.80, change: 2.3, date: new Date().toISOString() },
    ];
    bonds = [
      { id: 1, name: '10Y Treasury', yield: 4.25, date: new Date().toISOString() },
      { id: 2, name: '2Y Treasury', yield: 4.75, date: new Date().toISOString() },
    ];
    bitcoin = { id: 1, price: 62500, date: new Date().toISOString() };
    news = [
      { id: 1, title: 'Apple reports strong Q1 earnings', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
      { id: 2, title: 'Fed signals pause on rate hikes', source: 'Reuters', url: '#', date: new Date().toISOString() },
      { id: 3, title: 'Bitcoin reaches new ATH', source: 'CNBC', url: '#', date: new Date().toISOString() },
    ];
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-6">
        <h1 className="text-4xl font-bold">US Market News Portal</h1>
        <p className="text-gray-400 mt-2">Stocks • Bonds • Bitcoin</p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Market Data Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Market Data</h2>

          {/* Stocks */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">US Stocks</h3>
            <div className="grid grid-cols-3 gap-4">
              {stocks.map((stock) => (
                <div key={stock.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">{stock.symbol}</p>
                  <p className="text-2xl font-bold">${stock.price?.toFixed(2) || '0.00'}</p>
                  <p className={stock.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bonds */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">US Treasury Bonds</h3>
            <div className="grid grid-cols-2 gap-4">
              {bonds.map((bond) => (
                <div key={bond.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">{bond.name}</p>
                  <p className="text-2xl font-bold">{bond.yield?.toFixed(2) || '0.00'}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bitcoin */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Bitcoin</h3>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-full">
              <p className="text-sm text-gray-400">BTC/USD</p>
              <p className="text-3xl font-bold">${bitcoin?.price?.toLocaleString() || '0'}</p>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <div className="space-y-2">
            {news.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-2 border-b border-gray-700 hover:bg-gray-800 transition">
                <span className="text-sm text-gray-500 min-w-fit">{new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString()}</span>
                <span className="text-gray-300 flex-1">{item.title}</span>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded min-w-fit">{item.source}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
