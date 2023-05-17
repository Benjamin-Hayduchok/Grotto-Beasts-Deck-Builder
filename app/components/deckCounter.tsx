import React, { useState } from 'react'
import eventBus from './eventBus';
import util from './util'

export default function deckCounter(props: any) {
  const [cardCount, setCardCount] = useState("0");
  const [maxCount, setMaxCount] = useState("40");
  eventBus.on("incrementDeckCounter", (data: any) => {
    setCardCount(util.toStringInc(cardCount));
  }
);  
    return (
        <div className="containerDeckCounter">
            <p className="deckCounter">
              {cardCount}/{maxCount}   
            </p>
        </div>

    )
}