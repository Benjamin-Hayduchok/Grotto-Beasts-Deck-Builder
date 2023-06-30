import { FC, useContext, useEffect, useState } from "react";
import {
  CardDataContext,
  CardsData,
} from "../providers/cardDataProvider/CardDataProvider";
import classNames from "classnames";
import { Card } from "../tailwindComponents/card/card";
import { ArrowIcon } from "../icons/ArrowIcon";

export type CardInfoCarouselProps = {
  cardNum: number;
};

export const CardInfoCarousel: FC<CardInfoCarouselProps> = ({ cardNum }) => {
  const cardsData = useContext(CardDataContext);
  const [currentIndex, setCurrentIndex] = useState(cardNum - 1); // needs to be subtracted by 1 because arrays start from index 0
  const [currentItem, setCurrentItem] = useState<CardsData>();
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    if (cardsData) {
      setCurrentItem(cardsData[currentIndex]);
    }
  }, [currentIndex, cardsData]);

  const handlePrevious = (data: CardsData[]) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (data: CardsData[]) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>,
    data: CardsData[]
  ) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX;

    const threshold = 100;

    if (Math.abs(touchDiff) > threshold) {
      if (touchDiff > threshold) {
        handlePrevious(data);
      } else if (touchDiff < threshold) {
        handleNext(data);
      }
    }
  };

  const arrowButtonClasses = (dir: "left" | "right") => {
    return classNames(
      "transition-all ease-in-out",
      "hover:brightness-125",
      dir === "left" ? "hover:-translate-x-1" : "hover:translate-x-1",
      "hover:cursor-pointer",
      "hidden md:inline-block"
    );
  };

  return (
    <>
      {cardsData && currentItem && (
        <div
          className={classNames(
            "flex flex-row",
            "items-center justify-center",
            "text-slate-50",
            "w-full max-w-4xl",
            "absolute top-12 ",
            "md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          )}
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => handleTouchEnd(e, cardsData)}
        >
          <div
            className={classNames(arrowButtonClasses("left"))}
            onClick={() => handlePrevious(cardsData)}
          >
            <ArrowIcon />
          </div>
          <div
            className={classNames(
              "flex flex-col w-full items-center",
              "gap-8 md:gap-16",
              "p-8 md:px-4",
              "md:flex-row md:items-start md:justify-start"
            )}
          >
            <div className={"flex-none"}>
              <Card
                name={currentItem.name}
                cardNum={currentItem.cardNum}
                imageName={currentItem.imageName}
                effect={currentItem.effect}
                collectionView={false}
                collectionCount={currentItem.collectionCount}
                showInfoButton={false}
                glow={{ show: false }}
                cardDimensions={{ maxWidth: "max-w-[300px]" }}
              />
            </div>
            <div className={classNames("flex flex-col ")}>
              <h2 className="text-2xl font-semibold mb-0">
                {currentItem?.name}
              </h2>
              <div className="text-slate-200">
                {currentItem?.flavorText !== "-" && (
                  <p
                    className={classNames(
                      "text-base font-normal font-serif",
                      "text-gray-400 italic",
                      "mb-4"
                    )}
                  >
                    {currentItem?.flavorText}
                  </p>
                )}

                {currentItem?.effect !== "-" && (
                  <p className="font-sans font-normal text-base mb-6">
                    {currentItem?.effect === "-"
                      ? undefined
                      : currentItem?.effect}
                  </p>
                )}
                <ul
                  className={classNames(
                    "font-sans font-normal text-base",
                    "list-disc list-inside"
                  )}
                >
                  <li>Type: {currentItem?.type}</li>
                  <li>Power: {currentItem?.power}</li>
                  <li>Cost: {currentItem?.cost}</li>
                  <li>Goal: {currentItem?.goal}</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={classNames(arrowButtonClasses("right"), "rotate-180")}
            onClick={() => handleNext(cardsData)}
          >
            <ArrowIcon />
          </div>
        </div>
      )}
    </>
  );
};
