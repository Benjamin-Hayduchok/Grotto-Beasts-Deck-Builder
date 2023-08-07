import React, { useState, useEffect, FC } from "react";
import EpicTag from "../epicTag";
import CountAndInfoPopUp from "../countAndInfoPopUp";
import { DeckListType } from "../providers/deckListProvider/DeckListProvider";
import classNames from "classnames";

export type DeckCardProps = {
  card: DeckListType;
};

const DeckCard: FC<DeckCardProps> = ({ card }) => {
  const [showAdjustCount, setShowAdjustCount] = useState(true);

  return (
    <div
      className={classNames(
        "group",
        "relative",
        "flex items-center py-1 pl-10 pr-4",
        "border-2 border-yellow-400 border-opacity-50 rounded-2xl",
        "bg-[rgb(31,45,74)] bg-opacity-90",
        "leading-0 text-gray-100 text-base"
      )}
    >
      <img
        className="absolute overflow-visible -left-[.45em] w-10 h-10"
        src={"../cost+" + card.cost + ".png"}
        alt={`cost-${card.cost}`}
      ></img>
      <div className="w-full flex justify-between">
        <div className="flex">
          {card.name}
          <EpicTag isEpic={card.isEpic}></EpicTag>
        </div>
        <CountAndInfoPopUp
          className="invisible group-hover:visible group-focus:visible"
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
