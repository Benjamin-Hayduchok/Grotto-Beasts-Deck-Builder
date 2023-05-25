import React, { useState } from 'react'
import eventBus from './eventBus';
import util from './util'

export default function deckCounter(props: any) {
  const [cardCount, setCardCount] = useState("0");
  const [maxCount, setMaxCount] = useState("40"); // used specifically for byeah prime
  eventBus.on("incrementDeckCounter", (data: any) => {
      setCardCount(util.toStringInc(cardCount));
    }
  );
  eventBus.on("decrementDeckCounter", (data: any) => {
      setCardCount(util.toStringDec(cardCount));
    }
  ); 
  eventBus.on("addChallengerToDeck", (data: any) => {
      const challenger = data.card.name;
      if (challenger === "Byeah Prime") setMaxCount("60");
      else setMaxCount("40");
    }
  );
    return (
        <div className="containerDeckCounter">
            <p className="deckCounter">
              {cardCount}/{maxCount} Cards
            </p>
        </div>

    )
}