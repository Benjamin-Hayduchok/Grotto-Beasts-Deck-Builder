"use client";

import CardList from '../../components/cardList';
import StickyBox from "react-sticky-box";
import Deck from '../../components/deck';
import SaveButton from '../../components/saveButton'
import { useContext, useEffect, useState } from "react";
import {
    CardDataContext,
} from "../../components/providers/cardDataProvider/CardDataProvider";

const setCollectionCounts = (collectionCounts: any, cardsData: any) => {
    for (var collectionCount in collectionCounts) {
        var currCard = cardsData[parseInt(collectionCount)];
        if (currCard) currCard.collectionCount = collectionCounts[parseInt(collectionCount)];
    }
    return cardsData;
  }

async function getCollectionCount(id: string, cardsData: any) {
    const res = await fetch(
        `https://grotto-beasts-test.fly.dev/api/collections/cardCollection/records/${id}`
    );
    const data = await res.json();

    return setCollectionCounts(data?.collection, cardsData);
}

export default function CollectionPage({ params }: any) {
    const cardsData = useContext(CardDataContext);
    const [cardList, setCardList] = useState(Object.assign({}, cardsData));

    useEffect(() => {
        if (params.id === "new") return;
        getCollectionCount(params.id, cardsData).then(
            result => setCardList(result));
    },[]);

    return (
        <div>
            <br></br>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
                <Deck collectionView={true}>
                </Deck>
                <SaveButton/>
            </StickyBox>
            <CardList collectionView={true} cardArray={Object.values(cardList)}></CardList>
        </div>
    )
}
