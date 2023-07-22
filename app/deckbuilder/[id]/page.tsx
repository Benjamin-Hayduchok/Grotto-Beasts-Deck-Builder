"use client";

import CardList from "../../components/cardList";
import StickyBox from "react-sticky-box";
import Deck from '../../components/deck';
import { useContext, useEffect, useState } from "react";
import {
    CardDataContext,
} from "../../components/providers/cardDataProvider/CardDataProvider";
import SearchBar from "@/app/components/searchBar";
import { SaveButton } from "@/app/components/saveButton";
import Swal from "sweetalert2";

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
    const [challenger, setChallenger] = useState("No Challenger Selected")
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (params.id === "new") return;
        getDecklist(params.id).then(
            data => {
                setDeckList(data?.decklist);
                setChallenger(data?.challenger)
                setUserId(data?.user);
            }
        )
    },[]);

    const formatDeckObj = (currDeckString: string) => {
        var currDeckObj = JSON.parse(currDeckString);
        type collectionCountObjType = { [key: number]: number };
        var returnObj : { [key: number]: number } = {};
        for (var card of currDeckObj) {
            if (card.count > 0) {
                returnObj[card.cardNum] = card.count;
            }
        }
        console.log('returnObj', returnObj)
        return returnObj;
    }

    const saveDecklist = async () => {
        var currDeckArr = localStorage.getItem("currDeckArr");
        var currChallengerName = localStorage.getItem("currChallengerName");

        console.log('currDeckArr', currDeckArr)
        console.log('currChallengerName', currChallengerName)

        if (currDeckArr == null) {
            return;
        }
        const saveDeck = formatDeckObj(currDeckArr);
        const patchData = {challenger: currChallengerName, decklist: saveDeck};
        const res = await fetch(
            `https://grotto-beasts-test.fly.dev/api/collections/decklists/records/${params.id}`,
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

    console.log('original deckList', deckList)

    return (
        <div>
            <SearchBar></SearchBar>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
              <Deck collectionView={false} deckList={deckList} challenger={challenger}/>
              <SaveButton
                    save={saveDecklist}
                />
            </StickyBox>
            <CardList collectionView={true} cardArray={Object.values(cardList)}></CardList>
        </div>
    )
}
