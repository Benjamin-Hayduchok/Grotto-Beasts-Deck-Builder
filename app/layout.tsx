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
          before
          {children}
          after
        </main>
      </body>
    </html>
  );
}