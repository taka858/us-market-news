import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'US Market News Portal',
  description: 'Stocks, Bonds, Bitcoin News',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}