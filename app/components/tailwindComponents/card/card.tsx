import classNames from "classnames";
import { FC, useRef } from "react";
import { useRotateToMouse } from "./utils/mouse";
import CollectionCardHover from "../../collectionCardHover";
import eventBus from "../../eventBus";

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

  function addCard(card: { cardNum: string }) {
    console.log("ON CLICK card", card);

    if (parseInt(card.cardNum) <= 32)
      eventBus.dispatch("addChallengerToDeck", { card: card });
    else eventBus.dispatch("addCardToDeck", { card: card });
  }

  return (
    <div
      className={""}
      style={{
        perspective: "1500px",
      }}
      onClick={() => addCard({ cardNum })}
    >
      <div
        ref={inputRef}
        className={classNames(
          "relative",
          "inline-block",
          "font-bold",
          "text-right",
          "font-black",
          "grow",
          "shadow-md",
          "hover:shadow-xl",
          "rounded-3xl",
          "transition-all skew-x-0 duration-150 ease-out",
          "bg-no-repeat",
          "bg-contain",
          "overflow-hidden"
        )}
        onMouseLeave={removeListener}
        onMouseMove={rotateToMouse}
      >
        <img
          className={classNames(
            "w-full h-full scale-100",
            "max-w-[150px] md:max-w-[240px]"
          )}
          src={imageName}
          alt={`card-${cardNum}`}
        />
        <div className={"absolute bg-white right-[4%] top-[4%]"}>i</div>
        <div
          ref={glowRef}
          className={classNames(
            "absolute",
            "w-full",
            "h-full",
            "top-0",
            "left-0"
          )}
        ></div>
      </div>

      {/* TODO: NV - Update this component as well */}
      <CollectionCardHover
        collectionView={collectionView}
      ></CollectionCardHover>
    </div>
  );
};
