import Link from 'next/link';
import './../styles/globals.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
        <nav>
            <Link href="/">
              Home
            </Link>
            <Link href="/collection">
              Collection
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}