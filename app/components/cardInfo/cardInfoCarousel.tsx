import { FC, useContext, useEffect, useState } from "react";
import {
  CardDataContext,
  CardsData,
} from "../providers/cardDataProvider/CardDataProvider";
import classNames from "classnames";
import { Card } from "../tailwindComponents/card/card";

export type CardInfoCarouselProps = {
  cardNum: number;
};

export const CardInfoCarousel: FC<CardInfoCarouselProps> = ({ cardNum }) => {
  const cardsData = useContext(CardDataContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState<CardsData>();

  useEffect(() => {
    if (cardsData) {
      setCurrentItem(cardsData[currentIndex]);
    }
  }, [currentIndex, cardsData]);

  console.log("Current item", currentItem);

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

  const baseClasses = (classes: string) => {
    return classes;
  };
  const desktopClasses = (classes: string) => {
    const classList = classes.split(" ");
    const desktopClassList = classList.map((className) => `md:${className}`);
    return desktopClassList.join(" ");
  };

  return (
    <>
      {cardsData && currentItem && (
        <div
          className={classNames(
            "flex flex-row",
            "items-center justify-center",
            "text-slate-50"
          )}
        >
          <button
            className="bg-gray-200 rounded-full p-2 mr-2"
            onClick={() => handlePrevious(cardsData)}
          >
            Previous
          </button>
          <div
            className={classNames(
              baseClasses(
                classNames(
                  "flex flex-col",
                  "gap-16 border",
                  "border-gray-200 p-4"
                )
              ),
              desktopClasses("flex-row")
            )}
          >
            <Card
              name={currentItem.name}
              cardNum={currentItem.cardNum}
              imageName={currentItem.imageName}
              effect={currentItem.effect}
              collectionView={false}
              showInfoButton={false}
              glow={{ show: false }}
              cardDimensions={{ maxWidth: "max-w-[300px]" }}
            />
            <div className={classNames("flex flex-col gap-4")}>
              <h2 className="text-lg font-semibold mb-2">
                {currentItem?.name}
              </h2>
              <p>{currentItem?.flavorText}</p>
            </div>
          </div>
          <button
            className="bg-gray-200 rounded-full p-2 ml-2"
            onClick={() => handleNext(cardsData)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};
