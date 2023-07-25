import React, { useState } from "react";
import DeckCounter from "./deckCounter";
// import eventBus from "./eventBus";
import classNames from "classnames";
import eventBus from "../eventBus";

export default function DeckHeader(props: { collectionView: boolean }) {
  const [currChallenger, setCurrChallenger] = useState(
    "No Challenger Selected"
  ); // currently a string, might make it an object in the future
  const [force, setForce] = useState(0);

  if (props.collectionView) {
    return (
      <div className="deckHeader">
        <p className="challengerName">Deck Lists</p>
        <DeckCounter collectionView={props.collectionView}></DeckCounter>
      </div>
    );
  }
  eventBus.on("addChallengerToDeck", (data: any) => {
    setCurrChallenger(data.card.name);
    setForce(force + 1);
  });
  return (
    // <div className={classNames("border-4  inset-5 bg-gb-brown")}>
    <div className="deckHeader !bg-gradient-to-br from-gb-brown">
      <p className="challengerName">{currChallenger}</p>
      <DeckCounter collectionView={props.collectionView}></DeckCounter>
    </div>
  );
}
