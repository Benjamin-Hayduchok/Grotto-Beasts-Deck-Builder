import React, { FC } from "react";
import classNames from "classnames";

type CollectionDeckHeaderProps = {
  userId?: string;
  deckListCount?: number;
};

export const CollectionDeckHeader: FC<CollectionDeckHeaderProps> = ({ userId, deckListCount }) => {
  return (
    <div
      className={classNames(
        "!bg-gradient-to-br from-gb-brown",
        "text-[rgb(252,209,68)] p-4"
      )}
    >
      <div className="flex justify-between flex-wrap text-xl mb-4">
        Username: {userId}
        <div className=""></div>
      </div>
      <div className={classNames("flex justify-between text-lg ")}>
      Decks:
      <span>
        {deckListCount}
      </span>
    </div>
    </div>
  );
};
