import { promises as fs } from 'fs';
import Database from 'better-sqlite3';
import path from 'path';

export default async function Home() {
  let news = [];
  
  try {
    // SQLite から読み込む
    const dbPath = path.join(process.cwd(), 'data/market.db');
    const db = new Database(dbPath);
    const stmt = db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 30');
    news = stmt.all();
    db.close();
  } catch (error) {
    console.log("SQLite読み込みエラー、ダミーデータを使用:", error);
    // フォールバック：ダミーデータ
    news = [
      { id: 1, title: 'Apple reports strong Q1 earnings', source: 'Bloomberg', url: '#', date: new Date().toISOString() },
      // ... 他のダミーデータ
    ];
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 既存のコード */}
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
    </div>
  );
}
