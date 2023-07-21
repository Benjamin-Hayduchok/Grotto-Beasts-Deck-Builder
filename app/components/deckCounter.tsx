import React, { useState, useEffect } from 'react'
import eventBus from './eventBus';
import util from './util';
import Swal from 'sweetalert2';

type counterProps = {
  collectionView: boolean;
  cardCount: number;
};

export default function DeckCounter(props: counterProps) {
  const [deckListCount, setDeckListCount] = useState("0");
  const [cardCount, setCardCount] = useState(props.cardCount);
  const [maxCount, setMaxCount] = useState("40"); // used specifically for byeah prime

  useEffect(() => {
    setCardCount(props.cardCount)
  }, [props])

  if (props.collectionView) {
    return (
      <div className="containerDeckCounter">
        <p className="deckCounter">
          {deckListCount} Decks
        </p>
    </div>
    )
  }

  eventBus.on("incrementDeckCounter", (data: any) => {
      setCardCount(cardCount + 1);
    }
  );
  eventBus.on("decrementDeckCounter", (data: any) => {
      setCardCount(cardCount - 1);
    }
  ); 
  eventBus.on("addChallengerToDeck", (data: any) => {
      const challenger = data.card.name;
      var tempMax = "40";
      if (challenger === "Byeah Prime") {
        setMaxCount("60");
        tempMax = "60";
      }
      else setMaxCount("40");
      if (cardCount > parseInt(tempMax)  ) {
        Swal.fire({
          title: '<strong>Warning!</strong>',
          html: '<b>You currently have more cards than the maximum allowed cards. Please remove extra cards.</b>',
          icon: 'error',
          confirmButtonColor: '#257d52',
          confirmButtonText: 'Thank you!'
        });
      }
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