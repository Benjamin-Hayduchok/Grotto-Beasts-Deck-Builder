import React, { useState, useEffect } from "react";
import EpicTag from "../epicTag";
import CountAndInfoPopUp from "../countAndInfoPopUp";

const DeckCard = (props: {
  cardNum: string;
  name: string;
  imageName: string;
  count: string;
  cost: string;
  isEpic: boolean;
}) => {
  const { name, cardNum, imageName, count, cost, isEpic } = props;

  const [showAdjustCount, setShowAdjustCount] = useState(false);

  const showCardCountChange = (cardNum: string) => {
    // console.log('SHOW cardNum', cardNum)
    setShowAdjustCount(true);
  };

  const hideCardCountChange = (cardNum: string) => {
    // console.log('HIDE cardNum', cardNum);
    setShowAdjustCount(false);
  };

  return (
    <div
      className="deckCard"
      onMouseOver={() => showCardCountChange(cardNum)}
      onMouseLeave={() => hideCardCountChange(cardNum)}
    >
      <img
        className="costIcon"
        src={"../cost+" + cost + ".png"}
        alt={`cost-${cost}`}
      ></img>
      <p className="deckCardName">{name}</p>
      <div className="spacing">
        <EpicTag isEpic={isEpic}></EpicTag>
      </div>
      <CountAndInfoPopUp
        showAdjustCount={showAdjustCount}
        count={count}
        cardNum={cardNum}
      />
      <p className="cardCount">{count}</p>
    </div>
  );
};

export default DeckCard;
