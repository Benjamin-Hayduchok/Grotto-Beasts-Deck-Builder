import React, { useEffect, useState } from "react";
import DeckHeader from "./deckHeader";
import DeckCards from "./deckCards";

type DeckProps = {
  collectionView: boolean;
  deckList?: dbDeckListObjType | undefined;
};

type dbDeckListObjType = { [key: string]: string };

const Deck = (props: DeckProps) => {
  const [deckList , setDeckList] = useState(props.deckList)

  useEffect(() => {
    setDeckList(props.deckList);
  },[props])

  return (
    <div className="deck">
      <DeckHeader collectionView={props.collectionView}></DeckHeader>
      <DeckCards collectionView={props.collectionView} deckList={deckList}></DeckCards>
    </div>
  );
};

export default Deck;
