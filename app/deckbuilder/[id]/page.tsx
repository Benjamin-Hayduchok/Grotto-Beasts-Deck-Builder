"use client";

import CardList from "../../components/cardList";
import StickyBox from "react-sticky-box";
import Deck from '../../components/deck';
import { useContext, useEffect, useState } from "react";
import {
    CardDataContext,
} from "../../components/providers/cardDataProvider/CardDataProvider";
import SearchBar from "@/app/components/searchBar";

async function getDecklist(id: string) {
    const res = await fetch(
        `https://grotto-beasts-test.fly.dev/api/collections/decklists/records/${id}`
    );
    const data = await res.json();
    console.log('data', data)
    return data;
}

const constructDeckListObj = (collectionCounts: any, cardsData: any) => {
    for (var collectionCount in collectionCounts) {
        var currCard = cardsData[parseInt(collectionCount)];
        if (currCard) currCard.collectionCount = collectionCounts[parseInt(collectionCount)];
    }
    return cardsData;
}

export default function DeckBuilder({ params }: any) {
    const cardsData = useContext(CardDataContext);
    const [cardList, setCardList] = useState(Object.assign({}, cardsData));
    const [deckList, setDeckList] = useState();
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (params.id === "new") return;
        getDecklist(params.id).then(
            data => {
                setDeckList(data?.decklist);
                setUserId(data?.user);
            }
        )
    },[]);

    console.log('original deckList', deckList)

    return (
        <div>
            <SearchBar></SearchBar>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
              <Deck collectionView={false} deckList={deckList}/>
            </StickyBox>
            <CardList collectionView={true} cardArray={Object.values(cardList)}></CardList>
        </div>
    )
}
