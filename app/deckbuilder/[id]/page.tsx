"use client";

import CardList from "../../components/cardList";
import StickyBox from "react-sticky-box";
import Deck from '../../components/deck';
import { useContext, useEffect, useState } from "react";
import {
    CardDataContext,
} from "../../components/providers/cardDataProvider/CardDataProvider";
import SearchBar from "@/app/components/searchBar";

export default function DeckBuilder() {
    const cardsData = useContext(CardDataContext);
    const [cardList, setCardList] = useState(Object.assign({}, cardsData));

    return (
        <div>
            <SearchBar></SearchBar>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
              <Deck collectionView={false} />
            </StickyBox>
            <CardList collectionView={true} cardArray={Object.values(cardList)}></CardList>
        </div>
    )
}
