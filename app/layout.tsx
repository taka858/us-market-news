import './globals.css';

export const metadata = {
  title: 'US Market News Portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}