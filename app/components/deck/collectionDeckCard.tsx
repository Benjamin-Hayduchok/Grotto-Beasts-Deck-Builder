import React, { FC } from "react";
import classNames from "classnames";


export type CollectionDeckCardProps = {
  deckListId: String;
  deckListNum: number;
};

const CollectionDeckCard: FC<CollectionDeckCardProps> = ({ deckListId, deckListNum }) => {

  return (
    <a href={"/deckbuilder/" + deckListId}
      className={classNames(
        "group",
        "relative",
        "flex items-center py-1 pl-10 pr-4",
        "border-2 border-yellow-400 border-opacity-50 rounded-2xl",
        "bg-[rgb(31,45,74)] bg-opacity-90",
        "leading-0 text-gray-100 text-base"
      )}
    >
      <div className="w-full flex justify-between">
        Decklist {deckListNum + 1}
      </div>
    </a>
  );
};

export default CollectionDeckCard;
