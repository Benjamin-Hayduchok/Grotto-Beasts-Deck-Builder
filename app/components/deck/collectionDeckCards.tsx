import React, { FC, useState, useEffect } from "react";
import CollectionDeckCard from "./collectionDeckCard";
import CollectionAddDeckListButton from "./collectionAddDeckListButton";

type CollectionDeckCardsProps = {
    deckListsProp?: string[];
}

const CollectionDeckCards: FC<CollectionDeckCardsProps> = ({ deckListsProp }) => {
  const [deckLists, setDeckLists] = useState(deckListsProp);

  useEffect(() => {
    deckListsProp && setDeckLists([...deckListsProp]);
  }, [deckListsProp]);

  return (
    <div className="h-full p-2 overflow-auto" id="style-1">
      <div className="flex flex-col gap-2">
        {deckLists?.map((deckListId, index) => (
          <CollectionDeckCard key={deckListId} deckListId={deckListId} deckListNum={index}></CollectionDeckCard>
        ))}
        <CollectionAddDeckListButton deckLists={deckLists}/>
      </div>
    </div>
  );
};

export default CollectionDeckCards;
