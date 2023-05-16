import React, { useState } from 'react'
import DeckCounter from './deckCounter'
import eventBus from './eventBus';


export default function deckCards(props: any) {

  const [currChallenger, setCurrChallenger] = useState("No Challenger Selected"); // currently a string, might make it an object in the future

  eventBus.on("addChallengerToDeck", (data: any) => {
      setCurrChallenger(data.card.name);
    }
  );  
  return (
    <div className="deckHeader">
      <p className="challengerName">{currChallenger}</p>
      <DeckCounter></DeckCounter>
    </div>
  )
}