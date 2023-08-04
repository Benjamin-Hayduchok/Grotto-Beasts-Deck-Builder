import React, { Component, FC } from "react";
import { DeckHeader } from "./deckHeader";
import DeckCards from "./deckCards";

export type DeckProps = {
  isCollection: boolean;
};

const Deck: FC<DeckProps> = ({ isCollection }) => {
  return (
    <div className="h-full flex flex-col">
      <DeckHeader isCollection={isCollection}></DeckHeader>
      <DeckCards collectionView={isCollection}></DeckCards>
    </div>
  );
};

export default Deck;
