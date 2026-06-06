import { getMockData } from './lib/db';

export default function Home() {
  const data = getMockData();

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
              {data.stocks.map((stock) => (
                <div key={stock.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">{stock.symbol}</p>
                  <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
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
              {data.bonds.map((bond) => (
                <div key={bond.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">{bond.name}</p>
                  <p className="text-2xl font-bold">{bond.yield.toFixed(2)}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bitcoin */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Bitcoin</h3>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-full">
              <p className="text-sm text-gray-400">BTC/USD</p>
              <p className="text-3xl font-bold">${data.bitcoin[0].price.toLocaleString()}</p>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <div className="space-y-2">
            {data.news.map((item) => (
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
