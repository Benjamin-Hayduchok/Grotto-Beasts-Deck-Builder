import React, { useState, useContext, useEffect } from "react";
import DeckCard from "./deckCard";
import { DeckListContext } from "../providers/deckListProvider/DeckListProvider";

const DeckCards = () => {
  const { deckList } = useContext(DeckListContext);
  const [deckArr, setDeckArr] = useState(deckList);

  useEffect(() => {
    deckList && setDeckArr([...deckList]);
  }, [deckList]);

  return (
    <div className="h-full p-2 overflow-auto" id="style-1">
      <div className="flex flex-col gap-2">
        {deckArr?.map((card) => (
          <DeckCard card={card} key={`deckCard-${card.cardNum}`} />
        ))}
      </div>
    </div>
  );
};

export default DeckCards;
