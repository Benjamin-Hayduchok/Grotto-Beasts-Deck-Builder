import React, { useState } from "react";
import eventBus from "../eventBus";
import util from "../util";
import Swal from "sweetalert2";
import classNames from "classnames";

export default function DeckCounter(props: { collectionView: boolean }) {
  const [deckListCount, setDeckListCount] = useState("0");
  const [cardCount, setCardCount] = useState("0");
  const [maxCount, setMaxCount] = useState("40"); // used specifically for byeah prime

  if (props.collectionView) {
    return (
      <div className="containerDeckCounter">
        <p className="deckCounter">{deckListCount} Decks</p>
      </div>
    );
  }

  eventBus.on("incrementDeckCounter", (data: any) => {
    setCardCount(util.toStringInc(cardCount));
  });
  eventBus.on("decrementDeckCounter", (data: any) => {
    setCardCount(util.toStringDec(cardCount));
  });
  eventBus.on("addChallengerToDeck", (data: any) => {
    const challenger = data.card.name;
    var tempMax = "40";
    if (challenger === "Byeah Prime") {
      setMaxCount("60");
      tempMax = "60";
    } else setMaxCount("40");
    if (parseInt(cardCount) > parseInt(tempMax)) {
      Swal.fire({
        title: "<strong>Warning!</strong>",
        html: "<b>You currently have more cards than the maximum allowed cards. Please remove extra cards.</b>",
        icon: "error",
        confirmButtonColor: "#257d52",
        confirmButtonText: "Thank you!",
      });
    }
  });
  return (
    <div className={classNames("flex justify-between text-lg ")}>
      Cards:
      <span>
        {cardCount}/{maxCount}
      </span>
    </div>
  );
}
