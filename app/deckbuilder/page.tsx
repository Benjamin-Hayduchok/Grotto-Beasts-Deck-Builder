"use client";

import CardList from "../components/cardList";
import StickyBox from "react-sticky-box";
import Deck from "../components/deck";
import SearchBar from "../components/searchBar";

export default function DeckBuilder() {
  //TODO: NV - Commented this out for the time being so my changes are shown
  // if (typeof window !== "undefined")
  //   window.location.href =
  //     new URL(window.location.href).origin + "/deckbuilder/new";
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
