import React, { useState } from 'react'
import DeckCounter from './deckCounter'
import eventBus from './eventBus';


export default function deckCards(props: {collectionView: boolean, children: React.ReactNode}) {

  const [currChallenger, setCurrChallenger] = useState("No Challenger Selected"); // currently a string, might make it an object in the future

  if (props.collectionView) {
    return (
      <div className="deckHeader">
        <p className="challengerName">Deck Lists</p>
        <DeckCounter collectionView={props.collectionView}></DeckCounter>
      </div>
    )
  }
  eventBus.on("addChallengerToDeck", (data: any) => {
      setCurrChallenger(data.card.name);
    }
  );
  return (
    <div className="deckHeader">
      <p className="challengerName">{currChallenger}</p>
      <DeckCounter  collectionView={props.collectionView}></DeckCounter>
    </div>
  )
}