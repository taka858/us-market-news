import sqlite3
import requests
import os
from datetime import datetime

DB_PATH = 'data/market.db'

# データディレクトリを作成
import os
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

def init_db():
    """SQLiteデータベースを初期化"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS stocks (
            id INTEGER PRIMARY KEY,
            symbol TEXT UNIQUE,
            price REAL,
            change REAL,
            date TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bonds (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            yield REAL,
            date TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bitcoin (
            id INTEGER PRIMARY KEY,
            price REAL,
            date TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY,
            title TEXT,
            source TEXT,
            url TEXT,
            date TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

def fetch_stock_data():
    """Yahoo Finance から米国株データを取得"""
    try:
        symbols = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL']
        stocks = []
        
        for symbol in symbols:
            url = f'https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range=1d'
            response = requests.get(url, timeout=5)
            data = response.json()
            
            if 'chart' in data and data['chart']['result']:
                quote = data['chart']['result'][0]['meta']
                current_price = quote.get('regularMarketPrice', 0)
                previous_close = quote.get('previousClose', 0)
                change = ((current_price - previous_close) / previous_close * 100) if previous_close else 0
                
                stocks.append({
                    'symbol': symbol,
                    'price': current_price,
                    'change': round(change, 2),
                    'date': datetime.now().isoformat()
                })
        
        return stocks
    except Exception as e:
        print(f"株価取得エラー: {e}")
        return []

def fetch_bitcoin_data():
    """CoinGecko からビットコイン価格を取得"""
    try:
        url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        response = requests.get(url, timeout=5)
        data = response.json()
        btc_price = data['bitcoin']['usd']
        return {
            'price': btc_price,
            'date': datetime.now().isoformat()
        }
    except Exception as e:
        print(f"BTC価格取得エラー: {e}")
        return None

def fetch_bonds_data():
    """米国債データを取得"""
    try:
        bonds = [
            {'name': '10Y Treasury', 'yield': 4.25},
            {'name': '2Y Treasury', 'yield': 4.75},
        ]
        
        for bond in bonds:
            bond['date'] = datetime.now().isoformat()
        
        return bonds
    except Exception as e:
        print(f"債券データ取得エラー: {e}")
        return []

def fetch_news_from_api():
    """NewsAPI から最新ニュースを取得"""
    try:
        api_key = os.getenv('NEWS_API_KEY')
        if not api_key:
            print("NEWS_API_KEY が設定されていません")
            return []
        
        url = f'https://newsapi.org/v2/everything?q=stocks+OR+bonds+OR+bitcoin&sortBy=publishedAt&language=en&pageSize=30&apiKey={api_key}'
        response = requests.get(url, timeout=10)
        data = response.json()
        
        news_list = []
        if 'articles' in data:
            for article in data['articles'][:30]:
                news_list.append({
                    'title': article['title'][:200],
                    'source': article['source']['name'][:50],
                    'url': article['url'],
                    'date': article['publishedAt']
                })
        
        return news_list
    except Exception as e:
        print(f"ニュース取得エラー: {e}")
        return []

def save_to_db(stocks, bonds, bitcoin, news):
    """データをSQLiteに保存"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('DELETE FROM stocks')
    cursor.execute('DELETE FROM bonds')
    cursor.execute('DELETE FROM bitcoin')
    cursor.execute('DELETE FROM news')
    
    for stock in stocks:
        cursor.execute('''
            INSERT INTO stocks (symbol, price, change, date)
            VALUES (?, ?, ?, ?)
        ''', (stock['symbol'], stock['price'], stock['change'], stock['date']))
    
    for bond in bonds:
        cursor.execute('''
            INSERT INTO bonds (name, yield, date)
            VALUES (?, ?, ?)
        ''', (bond['name'], bond['yield'], bond['date']))
    
    if bitcoin:
        cursor.execute('''
            INSERT INTO bitcoin (price, date)
            VALUES (?, ?)
        ''', (bitcoin['price'], bitcoin['date']))
    
    for i, article in enumerate(news, 1):
        cursor.execute('''
            INSERT INTO news (id, title, source, url, date)
            VALUES (?, ?, ?, ?, ?)
        ''', (i, article['title'], article['source'], article['url'], article['date']))
    
    conn.commit()
    conn.close()
    print("データをSQLiteに保存しました")

def main():
    """メイン処理"""
    print("データ取得開始...")
    init_db()
    
    stocks = fetch_stock_data()
    bonds = fetch_bonds_data()
    bitcoin = fetch_bitcoin_data()
    news = fetch_news_from_api()
    
    if stocks or bonds or bitcoin or news:
        save_to_db(stocks, bonds, bitcoin, news)
        print("完了！")
    else:
        print("データ取得に失敗しました")

if __name__ == '__main__':
    main()
