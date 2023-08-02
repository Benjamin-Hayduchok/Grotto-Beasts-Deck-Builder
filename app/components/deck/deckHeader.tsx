import React, { useState, useContext, useEffect } from "react";
import DeckCounter from "./deckCounter";
import classNames from "classnames";
import { DeckListContext } from "../providers/deckListProvider/DeckListProvider";

export default function DeckHeader(props: { collectionView: boolean }) {
  const {challenger} = useContext(DeckListContext);
  const [currChallenger, setCurrChallenger] = useState(challenger); // currently a string, might make it an object in the future
  useEffect(() => {
    setCurrChallenger(challenger);
  }, [challenger])
  if (props.collectionView) {
    return (
      <div className="deckHeader">
        <p className="challengerName">Deck Lists</p>
        <DeckCounter collectionView={props.collectionView}></DeckCounter>
      </div>
    );
  }
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
