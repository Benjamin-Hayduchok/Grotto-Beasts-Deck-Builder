import { FC, useContext, useState } from "react";
import { CardDataContext } from "../providers/cardDataProvider/CardDataProvider";

export type CardInfoCarouselProps = {
  cardNum: number;
};

export const CardInfoCarousel: FC<CardInfoCarouselProps> = ({ cardNum }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cardsData } = useContext(CardDataContext);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentItem = items[currentIndex];

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-gray-200 rounded-full p-2 mr-2"
        onClick={handlePrevious}
      >
        Previous
      </button>
      <div className="border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-2">{currentItem.title}</h2>
        <p>{currentItem.description}</p>
      </div>
      <button
        className="bg-gray-200 rounded-full p-2 ml-2"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};
