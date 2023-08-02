import React, { useContext } from "react";
import eventBus from "./eventBus";
import { DeckListContext } from "./providers/deckListProvider/DeckListProvider";

const CountAndInfoPopUp = (props: {
  showAdjustCount: boolean;
  count: string;
  cardNum: string;
}) => {
  const { showAdjustCount, count, cardNum } = props;
  const { addToDeckList, removeFromDeckList, forceRenderDispatch } =
    useContext(DeckListContext);

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
      <div className="countAndInfoPopUpContainer">
        <input
          className="infoButt"
          type="button"
          value="i"
          onClick={() => showInfoCard(cardNum)}
        />
        <input
          className="minusButt"
          type="button"
          value="-"
          onClick={() => decreaseCard(cardNum)}
        />
        <input
          className="plusButt"
          type="button"
          value="+"
          onClick={() => increaseCard(cardNum)}
        />
      </div>
    );
  }
  return <p></p>;
};

export default CountAndInfoPopUp;
