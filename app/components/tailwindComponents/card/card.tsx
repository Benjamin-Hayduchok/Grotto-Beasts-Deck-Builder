import classNames from "classnames";
import { FC, useRef, useContext } from "react";
import { useRotateToMouse } from "./utils/mouse";
import CollectionCardHover from "../../collectionCardHover";
import { InfoIcon } from "../../icons/InfoIcon";
import { useModal } from "../../providers/modalProvider/ModalProvider";
import { CardInfoCarousel } from "../../cardInfo/cardInfoCarousel";
import { DeckListContext } from "../../providers/deckListProvider/DeckListProvider";
import util from "../../util";
import { CardDataContext, PageTypes } from "../../providers/cardDataProvider";

export type CardProps = {
  name: string;
  cardNum: string;
  imageName: string;
  effect: string;
  collectionView: boolean;
  collectionCount: number;
  updateCollectionCount?: Function;
  showInfoButton?: boolean;
  glow?: {
    show: boolean;
  };
  cardDimensions?: {
    maxWidth: string;
    maxHeight?: string;
  };
};

export const Card: FC<CardProps> = ({
  name,
  imageName,
  effect,
  collectionView,
  collectionCount,
  updateCollectionCount,
  cardNum,
  showInfoButton = true,
  glow = {
    show: true,
  },
  cardDimensions = {
    maxWidth: "max-w-[240px]",
  },
}) => {
  const {deckList, addToDeckList, forceRenderDispatch} = useContext(DeckListContext);
  const { cardsData, pageType } = useContext(CardDataContext);

  const inputRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { rotateToMouse, removeListener } = useRotateToMouse(inputRef, glowRef);
  const { openModal } = useModal();

  function addCard(card: { cardNum: string; name: string }) {
    addToDeckList(cardNum);
    forceRenderDispatch();
  }

  return (
    <div
      className={"relative cursor-pointer"}
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
          {showInfoButton && (
            <div
              className="rounded-full shadow hover:cursor-pointer hover:brightness-125"
              onClick={(e) => {
                e.stopPropagation();
                openModal(<CardInfoCarousel cardNum={parseInt(cardNum)} />);
              }}
            >
              <InfoIcon />
            </div>
          )}
        </div>
        <div
          className={classNames(
            "overflow-hidden",
            "rounded-3xl",
            cardDimensions
              ? cardDimensions.maxWidth
              : "max-w-[150px] md:max-w-[240px]",
            "shadow-md",
            "transition-all ease-in-out duration-100",
            glow?.show &&
              "group-hover:shadow-2xl shadow group-hover:shadow-yellow-50"
          )}
        >
          <img
            className={classNames("w-full h-full scale-100")}
            src={`/${imageName}`}
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
      </div>
      {pageType === PageTypes.COLLECTION && (
        <CollectionCardHover
          collectionView={collectionView}
          collectionCount={collectionCount}
          cardNum={cardNum}
          updateCollectionCount={updateCollectionCount!}
        />
      )}
    </div>
  );
};
