"use client";

import CardList from '../../components/cardList';
import StickyBox from "react-sticky-box";
import Deck from '../../components/deck';
import { SaveButton}  from '../../components/saveButton'
import { useContext, useEffect, useState } from "react";
import {
    CardsData,
    CardDataContext,
} from "../../components/providers/cardDataProvider/CardDataProvider";
import Swal from 'sweetalert2';

type collectionCountObjType = { [key: number]: number };

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
    return data;
}

const createCollectionCountObj = (cardList: CardsData[]) => {
    var collectionCountObj: collectionCountObjType = {};
    for (var index in cardList) {
        var card = cardList[index];
        if (card.collectionCount > 0) {
            collectionCountObj[parseInt(index)] = card.collectionCount;
        }
    }
    return collectionCountObj;
}

async function saveCollectionCount(id: string, collectionCountObj: collectionCountObjType, userId: string) {
    const patchData = {collection: collectionCountObj, user: userId};
    console.log('JSON.stringify(patchData)', JSON.stringify(patchData))
    const res = await fetch(
        `https://grotto-beasts-test.fly.dev/api/collections/cardCollection/records/${id}`,
        {
            method: "PATCH",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patchData)
        }
    );
    if (res.status === 200) {
        Swal.fire({
            title: '<strong>Collection Saved!</strong>',
            icon: 'success',
            confirmButtonColor: '#257d52',
            confirmButtonText: 'OK'
          });
    }
    const data = await res.json();
    return data;
}

export default function CollectionPage({ params }: any) {
    const cardsData = useContext(CardDataContext);
    const [cardList, setCardList] = useState(Object.assign({}, cardsData));
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (params.id === "new") return;
        getCollectionCount(params.id, cardsData).then(
            data => {
                setCardList(setCollectionCounts(data?.collection, cardsData));
                setUserId(data?.user);
            }
        )
    },[]);

    const saveCollection = () => {
        const collectionCountObj = createCollectionCountObj(cardList);
        saveCollectionCount(params.id, collectionCountObj, userId).then(
            result => console.log('result', result)
        );
    }

    return (
        <div>
            <br></br>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
                <Deck collectionView={true}>
                </Deck>
                <SaveButton
                    save={saveCollection}
                />
            </StickyBox>
            <CardList collectionView={true} cardArray={Object.values(cardList)}></CardList>
        </div>
    )
}
