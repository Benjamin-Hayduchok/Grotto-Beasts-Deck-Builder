import React, { useState, useEffect, FC } from "react";
import EpicTag from "../epicTag";
import CountAndInfoPopUp from "../countAndInfoPopUp";
import { DeckListType } from "../providers/deckListProvider/DeckListProvider";
import classNames from "classnames";

export type DeckCardProps = {
  card: DeckListType;
};

const DeckCard: FC<DeckCardProps> = ({ card }) => {
  // const { name, cardNum, imageName, count, cost, isEpic } = props;

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
      // className="deckCard"
      className={classNames(
        "relative",
        "flex items-center py-1 pl-10 pr-4",
        "border-2 border-yellow-400 border-opacity-50 rounded-2xl",
        "bg-[rgb(31,45,74)] bg-opacity-90",
        "leading-0 text-gray-100 text-base"
      )}
      onMouseOver={() => showCardCountChange(card.cardNum)}
      onMouseLeave={() => hideCardCountChange(card.cardNum)}
    >
      <img
        className="absolute -left-1 w-10 h-10"
        src={"../cost+" + card.cost + ".png"}
        alt={`cost-${card.cost}`}
      ></img>
      <div className="w-full flex justify-between">
        <div className="">{card.name}</div>
        <div className="">
          <EpicTag isEpic={card.isEpic}></EpicTag>
        </div>
        <CountAndInfoPopUp
          showAdjustCount={showAdjustCount}
          count={card.count}
          cardNum={card.cardNum}
        />
        <div className="">{card.count}</div>
      </div>
    </div>
  );
};

export default DeckCard;
