"use client";

import CardList from "../components/cardList";
import StickyBox from "react-sticky-box";
import Deck from "../components/deck";
import SearchBar from "../components/searchBar";

export default function DeckBuilder() {
  return (
    <div>
      <SearchBar></SearchBar>
      <StickyBox className="deckSticky" offsetTop={20} offsetBottom={20}>
        <Deck collectionView={false}></Deck>
      </StickyBox>
      <br></br>
      <CardList collectionView={false}></CardList>
    </div>
  );
}
