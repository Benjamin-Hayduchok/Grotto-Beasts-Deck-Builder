import React, { useState } from "react";
import DeckCounter from "./deckCounter";
// import eventBus from "./eventBus";
import classNames from "classnames";
import eventBus from "../eventBus";

export default function DeckHeader(props: { collectionView: boolean }) {
  const [currChallenger, setCurrChallenger] = useState("None"); // currently a string, might make it an object in the future
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
    <div
      className={classNames(
        "deckHeader !bg-gradient-to-br from-gb-brown",
        "text-[rgb(252,209,68)] p-4"
      )}
    >
      <div className="flex justify-between flex-wrap text-xl mb-4">
        Challenger:
        <div className="">{currChallenger}</div>
      </div>
      <DeckCounter collectionView={props.collectionView}></DeckCounter>
    </div>
  );
}
