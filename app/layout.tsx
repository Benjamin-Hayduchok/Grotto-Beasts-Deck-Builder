"use client";

import "./../styles/globals.css";
import "./../styles/nav.css";
import { ModalProvider } from "./components/providers/modalProvider/ModalProvider";
import { FC, PropsWithChildren } from "react";
import { CardDataProvider } from "./components/providers/cardDataProvider/CardDataProvider";
import { PocketBaseProvider } from "./components/providers/pocketBaseProvider/PocketBaseProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <PocketBaseProvider>
          <CardDataProvider>
            <ModalProvider>
              <MainContent>{children}</MainContent>
            </ModalProvider>
          </CardDataProvider>
        </PocketBaseProvider>
      </body>
    </html>
  );
}

const MainContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <nav className="navigation-menu navigation-container">
        <a href="#" className="site-identity-logo">
          Grotto Beasts! - Decklist & Collection Tracker
        </a>
        <input type="checkbox" id="toggleMenu" />
        <label htmlFor="toggleMenu">
          <i className="ri-menu-line" id="toggleIcon"></i>
        </label>
        <section className="main-menu">
          <ul className="navigation-menu__labels">
            <li>
              <a href="/collection">Collection</a>
            </li>
            <li>
              <a href="/deckbuilder">Deck Builder</a>
            </li>
            <li>
              <a href="/login">Login Page</a>
            </li>
          </ul>
        </section>
      </nav>
      <nav>
        {/* <BrowserRouter>
            <Routes>
              <Route path="/">  
                Home
              </Route>
              <Route path="/login">  
                Login 
              </Route>
              <Route path="/collection">
                Collection  
              </Route>
              <Route path="/deckbuilder">
                Deck Builder
              </Route>
            </Routes>

          </BrowserRouter> */}
      </nav>

      {children}
    </main>
  );
};
