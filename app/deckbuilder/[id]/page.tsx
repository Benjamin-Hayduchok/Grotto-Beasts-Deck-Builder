"use client";

import CardList from "../../components/cardList";
import StickyBox from "react-sticky-box";
import { useContext, useEffect, useState } from "react";
import { CardDataContext } from "../../components/providers/cardDataProvider/CardDataProvider";
import SearchBar from "@/app/components/searchBar";
import Deck from "@/app/components/deck/deck";
import { ResponsiveDeckWrapper } from "@/app/components/responsiveDeckWrapper/ResponsiveDeckWrapper";

export default function DeckBuilder() {
  const cardsData = useContext(CardDataContext);
  const [cardList, setCardList] = useState(Object.assign({}, cardsData));

  return (
    <div>
      <SearchBar></SearchBar>
      <div className={"flex p-8"}>
        <CardList
          collectionView={true}
          cardArray={Object.values(cardList)}
        ></CardList>
        <ResponsiveDeckWrapper>
          <div className="bg-gb-brown rounded-md h-full w-full shadow-2xl">
            <Deck collectionView={false} />
          </div>
        </ResponsiveDeckWrapper>
        {/* <StickyBox className="deckSticky" offsetTop={20} offsetBottom={20}>
          <Deck collectionView={false} />
        </StickyBox> */}
      </div>
    </div>
  );
}
