"use client";

import CardList from '../../components/cardList';
import StickyBox from "react-sticky-box";
import Deck from '../../components/deck';
import { useContext } from "react";
import {
    CardDataContext,
} from "../../components/providers/cardDataProvider/CardDataProvider";

const setCollectionCounts = (collectionCounts: any, cardsData: any) => {
    for (var collectionCount in collectionCounts) {
      var currCard = cardsData?.at(parseInt(collectionCount));
      if (currCard) currCard.collectionCount = collectionCounts[parseInt(collectionCount)];
    }
    return cardsData;
  }

async function getCollectionCount(id: string, cardsData: any) {
    const res = await fetch(
        `https://grotto-beasts-test.fly.dev/api/collections/cardCollection/records/${id}`,
        {
          next: { revalidate: 10 },
        }
    );
    const data = await res.json();

    setCollectionCounts(data?.collection, cardsData);
    return data?.collection;
}

export default async function CollectionPage({ params }: any) {
    const cardsData = useContext(CardDataContext);
    await getCollectionCount(params.id, cardsData);

    return (
        <div>
            <br></br>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
                <Deck collectionView={true}>
                </Deck>
            </StickyBox>
            <CardList collectionView={true}></CardList>
        </div>
    )
}
