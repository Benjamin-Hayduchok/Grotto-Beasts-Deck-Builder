import React, { useState, useContext, useEffect, FC } from "react";
import DeckCounter from "./deckCounter";
import classNames from "classnames";
import { DeckListContext } from "../providers/deckListProvider/DeckListProvider";

export const DeckHeader: FC = () => {
  const { challenger } = useContext(DeckListContext);
  const [currChallenger, setCurrChallenger] = useState(challenger); // currently a string, might make it an object in the future

  useEffect(() => {
    setCurrChallenger(challenger);
  }, [challenger]);

  return (
    <div
      className={classNames(
        "!bg-gradient-to-br from-gb-brown",
        "text-[rgb(252,209,68)] p-4"
      )}
    >
      <div className="flex justify-between flex-wrap text-xl mb-4">
        Challenger:
        <div className="">{currChallenger}</div>
      </div>
      <DeckCounter></DeckCounter>
    </div>
  );
};
