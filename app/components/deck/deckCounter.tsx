import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import { DeckListContext } from "../providers/deckListProvider/DeckListProvider";

export default function DeckCounter() {
  const { challenger, deckListLength } = useContext(DeckListContext);
  const [deckListCount, setDeckListCount] = useState(deckListLength);
  const [maxCount, setMaxCount] = useState(
    challenger === "Byeah Prime" ? 60 : 40
  );

  useEffect(() => {
    setDeckListCount(deckListLength);
    setMaxCount(challenger === "Byeah Prime" ? 60 : 40);
  }, [challenger, deckListLength]);

  return (
    <div className={classNames("flex justify-between text-lg ")}>
      Cards:
      <span>
        {deckListCount}/{maxCount}
      </span>
    </div>
  );
}
