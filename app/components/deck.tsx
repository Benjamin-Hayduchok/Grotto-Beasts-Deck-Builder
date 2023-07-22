import React, { useEffect, useState } from "react";
import DeckHeader from "./deckHeader";
import DeckCards from "./deckCards";

type DeckProps = {
  collectionView: boolean;
  deckList?: dbDeckListObjType | undefined;
  challenger?: string | undefined;
};

type dbDeckListObjType = { [key: string]: string };

const Deck = (props: DeckProps) => {
  const [deckList , setDeckList] = useState(props.deckList);
  const [challenger , setChallenger] = useState(props.challenger);
  const [cardCount , setCardCount] = useState(0);


  useEffect(() => {
    const getTotalCardCount = () => {
      var totalCount = 0;
      for (var cardNum in props.deckList) {
        var cardCount = props.deckList[cardNum];
        totalCount += parseInt(cardCount)
      }
      return totalCount;
    }
    setCardCount(getTotalCardCount());
    setChallenger(props.challenger)
    setDeckList(props.deckList)
  },[props])

  return (
    <div className="deck">
      <DeckHeader collectionView={props.collectionView} challenger={challenger} cardCount={cardCount}></DeckHeader>
      <DeckCards collectionView={props.collectionView} deckList={deckList} challenger={challenger}></DeckCards>
    </div>
  );
};

export default Deck;
