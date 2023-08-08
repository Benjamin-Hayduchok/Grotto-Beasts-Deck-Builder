import React, { useContext, FC } from "react";
import { DeckHeader } from "./deckHeader";
import DeckCards from "./deckCards";
import { CardDataContext } from "../providers/cardDataProvider";
import { PageTypes } from "../providers/cardDataProvider";
import { CollectionDeckHeader } from "./collectionDeckHeader";
import CollectionDeckCards from "./collectionDeckCards";
import { SaveButton } from "../saveButton";

type DeckProps = {
  userId?: string;
  deckLists?: string[];
  saveType: string;
  saveCollection?: Function;
};

const Deck: FC<DeckProps> = ({
  userId,
  deckLists,
  saveType,
  saveCollection,
}) => {
  const { pageType } = useContext(CardDataContext);

  return (
    <div className="h-full flex flex-col">
      {pageType === PageTypes.COLLECTION && (
        <>
          <CollectionDeckHeader
            userId={userId}
            deckListCount={deckLists?.length}
          ></CollectionDeckHeader>
          <CollectionDeckCards deckListsProp={deckLists}></CollectionDeckCards>
        </>
      )}
      {pageType === PageTypes.DECKBUILDER && (
        <>
          <DeckHeader />
          <DeckCards />
        </>
      )}
      <div className="flex justify-center w-full p-2">
        <SaveButton
          saveType={saveType}
          saveCollection={saveCollection}
        ></SaveButton>
      </div>
    </div>
  );
};

export default Deck;
