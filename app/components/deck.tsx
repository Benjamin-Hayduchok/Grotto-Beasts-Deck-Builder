import React, { Component } from 'react'
import DeckHeader from './deckHeader'
import DeckCards from './deckCards'

type DeckProps = {
  collectionView: boolean;
  children: React.ReactNode;
};

const Deck = (props: DeckProps) => {

    return (
        <div className="deck">
            <DeckHeader collectionView={props.collectionView}>
            </DeckHeader>
            <DeckCards collectionView={props.collectionView}>
            </DeckCards>
        </div>
    )
}

export default Deck;