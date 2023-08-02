import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import { DeckListContext } from "../providers/deckListProvider/DeckListProvider";

export default function DeckCounter(props: { collectionView: boolean }) {
  const { challenger, deckListLength } = useContext(DeckListContext);
  const [deckListCount, setDeckListCount] = useState(deckListLength);
  const [maxCount, setMaxCount] = useState(
    challenger === "Byeah Prime" ? 60 : 40
  );

  useEffect(() => {
    setDeckListCount(deckListLength);
    setMaxCount(challenger === "Byeah Prime" ? 60 : 40);
  }, [challenger, deckListLength]);

  if (props.collectionView) {
    return (
      <div className="containerDeckCounter">
        <p className="deckCounter">{deckListCount} Decks</p>
      </div>
    );
  }

  return (
    <div className={classNames("flex justify-between text-lg ")}>
      Cards:
      <span>
        {deckListCount}/{maxCount}
      </span>
    </div>
  );
}
