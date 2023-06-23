import classNames from "classnames";
import { FC, useRef } from "react";
import { useRotateToMouse } from "./utils/mouse";
import CollectionCardHover from "../../collectionCardHover";
import eventBus from "../../eventBus";
import { InfoIcon } from "./InfoIcon";
import { useModal } from "../../modalProvider/ModalProvider";

export type CardProps = {
  name: string;
  cardNum: string;
  imageName: string;
  effect: string;
  collectionView: boolean;
};

export const Card: FC<CardProps> = ({
  name,
  imageName,
  effect,
  collectionView,
  cardNum,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { rotateToMouse, removeListener } = useRotateToMouse(inputRef, glowRef);
  const { openModal } = useModal();

  function addCard(card: { cardNum: string, name: string }) {
    console.log("ON CLICK card", card);

    if (parseInt(card.cardNum) <= 32) eventBus.dispatch("addChallengerToDeck", { card: card });
    else eventBus.dispatch("addCardToDeck", { card: card });
  }

  return (
    <div
      className={"relative"}
      style={{
        perspective: "1500px",
      }}
      onClick={() => addCard({ cardNum, name })}
    >
      <div
        ref={inputRef}
        className={classNames(
          "inline-block",
          "font-bold",
          "text-right",
          "font-black",
          "grow",
          "transition-all skew-x-0 duration-150 ease-out",
          "bg-no-repeat",
          "bg-contain",
          "group"
        )}
        onMouseLeave={removeListener}
        onMouseMove={rotateToMouse}
      >
        <div
          className={classNames(
            "absolute",
            "opacity-0",
            "transition-opacity ease-out duration-100",
            "group-hover:opacity-100",
            "p-4",
            "-right-8",
            "-top-8",
            "z-20"
          )}
        >
          <div
            className="rounded-full shadow  hover:cursor-pointer hover:brightness-125"
            onClick={(e) => {
              e.stopPropagation();
              openModal(<div>asdf</div>);
            }}
          >
            <InfoIcon />
          </div>
        </div>
        <div
          className={classNames(
            "overflow-hidden",
            "rounded-3xl",
            "max-w-[150px] md:max-w-[240px]",
            "shadow-md",
            "transition-all ease-in-out duration-100",
            "group-hover:shadow-2xl shadow group-hover:shadow-yellow-50"
          )}
        >
          <img
            className={classNames("w-full h-full scale-100")}
            src={imageName}
            alt={`card-${cardNum}`}
          />
          <div
            ref={glowRef}
            className={classNames(
              "absolute",
              "overflow-hidden",
              "rounded-3xl",
              "w-full",
              "h-full",
              "top-0",
              "left-0"
            )}
          />
        </div>
        {/* TODO: NV - Update this component as well */}
        <CollectionCardHover
          collectionView={collectionView}
        ></CollectionCardHover>
      </div>
    </div>
  );
};
