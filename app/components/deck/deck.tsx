import React, { useContext, FC } from "react";
import { DeckHeader } from "./deckHeader";
import DeckCards from "./deckCards";
import { CardDataContext } from "../providers/cardDataProvider";
import { PageTypes } from "../providers/cardDataProvider";
import { CollectionDeckHeader } from "./collectionDeckHeader";
import CollectionDeckCards from "./collectionDeckCards";

type DeckProps = {
  userId?: string;
  deckLists?: never[];
};

const Deck: FC<DeckProps> = ({ userId, deckLists }) => {
  const { pageType } = useContext(CardDataContext);

  return (
    <div className="h-full flex flex-col">
      {pageType === PageTypes.COLLECTION && (
        <>
          <CollectionDeckHeader userId={userId} deckListCount={deckLists?.length}></CollectionDeckHeader>
          <CollectionDeckCards deckListsProp={deckLists}></CollectionDeckCards>
        </>
      )}
      {pageType === PageTypes.DECKBUILDER && (
        <>
          <DeckHeader />
          <DeckCards />
        </>
      )}
    </div>
  );
};

export default Deck;
