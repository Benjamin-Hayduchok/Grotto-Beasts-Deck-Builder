import React, { useState, useEffect } from "react";
import DeckCounter from "./deckCounter";
import eventBus from "./eventBus";

type headerProps = {
  collectionView: boolean;
  challenger?: string | undefined;
  cardCount: number;
};

export default function DeckHeader(props: headerProps) {
  const [currChallenger, setCurrChallenger] = useState(
    props.challenger
  ); // currently a string, might make it an object in the future
  const [force, setForce] = useState(0);
  const [cardCount, setCardCount] = useState(props.cardCount)

  useEffect(() => {
    setCurrChallenger(props.challenger)
    if (typeof props.cardCount !== "undefined") {
      setCardCount(props.cardCount)
    }
    else {
      setCardCount(0);
    }
  }, [props])

  if (props.collectionView) {
    return (
      <div className="deckHeader">
        <p className="challengerName">Deck Lists</p>
        <DeckCounter collectionView={props.collectionView} cardCount={cardCount}></DeckCounter>
      </div>
    );
  }
  eventBus.on("addChallengerToDeck", (data: any) => {
    setCurrChallenger(data.card.name);
    setForce(force + 1);
  });
  return (
    <div className="deckHeader">
      <p className="challengerName">{currChallenger}</p>
      <DeckCounter collectionView={props.collectionView} cardCount={cardCount}></DeckCounter>
    </div>
  );
}
