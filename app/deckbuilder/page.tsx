"use client";

import CardList from "../components/cardList";
import StickyBox from "react-sticky-box";
import Deck from "../components/deck";
import SearchBar from "../components/searchBar";
import { useContext, useEffect, useState } from "react";
import {
  CardDataContext,
} from "../components/providers/cardDataProvider/CardDataProvider";

export default function DeckBuilder() {
  if (typeof window !== "undefined")
    window.location.href =
      new URL(window.location.href).origin + "/deckbuilder/new";
  
  // const cardsData = useContext(CardDataContext);
  // const [cardList, setCardList] = useState(Object.assign({}, cardsData));

  // return (
  //   <div>
  //     <SearchBar></SearchBar>
  //     <StickyBox className="deckSticky" offsetTop={20} offsetBottom={20}>
  //       <Deck collectionView={false} />
  //     </StickyBox>
  //     <br></br>
  //     <CardList collectionView={true} cardArray={Object.values(cardList)}></CardList>
  //   </div>
  // );
}
