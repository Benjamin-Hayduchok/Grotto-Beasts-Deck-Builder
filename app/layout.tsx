"use client";

import Link from 'next/link';
import './../styles/globals.css';
import { Route, Routes, BrowserRouter,  } from 'react-router-dom';


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
            <a href="/collection">Collection!!!</a>
            <a href="/deckbuilder">Deck Builder</a>
          <BrowserRouter>
            <Routes>
            <Route path="/">  
                  Home
                </Route>
                <Route path="/collection">
                  Collection
                </Route>
                <Route path="/deckbuilder">
                  Deck Builder
              </Route>
            </Routes>

          </BrowserRouter>
          </nav>
          
            
          {children}
        </main>
      </body>
    </html>
  );
}