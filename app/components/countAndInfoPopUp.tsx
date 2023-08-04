import React, { FC, ReactNode, useContext } from "react";
import eventBus from "./eventBus";
import { DeckListContext } from "./providers/deckListProvider/DeckListProvider";
import classNames from "classnames";
import { useModal } from "./providers/modalProvider/ModalProvider";
import { CardInfoCarousel } from "./cardInfo/cardInfoCarousel";

const CountAndInfoPopUp = (props: {
  showAdjustCount: boolean;
  count: number;
  cardNum: string;
  className: string;
}) => {
  const { showAdjustCount, count, cardNum, className } = props;
  const { addToDeckList, removeFromDeckList, forceRenderDispatch } =
    useContext(DeckListContext);
  const { openModal } = useModal();

  const showInfoCard = (cardNum: string) => {
    // console.log('SHOW INFO cardNum', cardNum);
  };

  const decreaseCard = (cardNum: string) => {
    removeFromDeckList(cardNum);
    forceRenderDispatch();
  };

  const increaseCard = (cardNum: string) => {
    addToDeckList(cardNum);
    forceRenderDispatch();
  };

  if (showAdjustCount) {
    return (
      <div
        className={classNames(
          "absolute right-10 top-1/2 -translate-y-1/2",
          "flex w-[150px]",
          "divide-x-2 divide-white divide-opacity-25",
          "bg-black bg-opacity-50",
          "text-yellow-400",
          className
        )}
      >
        <CardActionButton
          label={"i"}
          onClick={(e) => {
            e.stopPropagation();
            openModal(<CardInfoCarousel cardNum={parseInt(cardNum)} />);
          }}
        />
        <CardActionButton label={"-"} onClick={() => decreaseCard(cardNum)} />
        <CardActionButton label={"+"} onClick={() => increaseCard(cardNum)} />
      </div>
    );
  }
  return <p></p>;
};

export default CountAndInfoPopUp;

type CardActionButtonProps = {
  onClick: (e: any) => void;
  label: ReactNode;
};

const CardActionButton: FC<CardActionButtonProps> = ({ onClick, label }) => {
  return (
    <div
      className={classNames(
        "flex grow justify-center",
        "p-2 cursor-pointer",
        "text-xl"
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
