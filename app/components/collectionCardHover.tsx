import React, { useState, useEffect } from "react";
import "./../../styles/collection.css";
import CardPlusButtom from "./cardPlusButton";
import CardMinusButton from "./cardMinusButton";
import CollectionCardCount from "./collectionCardCount";

export default function CollectionCardHover(props: {
  collectionView: boolean;
  collectionCount: number;
  cardNum: string;
  updateCollectionCount: Function;
}) {
  const [cardCount, setCardCount] = useState(props.collectionCount);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) setCardCount(props.collectionCount);
  }, [init, props.collectionCount]);

  const plusPressed = () => {
    setCardCount(cardCount + 1);
    setInit(true);
    props.updateCollectionCount(true, props.cardNum);
  };

  const minusPressed = () => {
    if (cardCount > 0) {
      setCardCount(cardCount - 1);
      setInit(true);
      props.updateCollectionCount(false, props.cardNum);
    }
  };

  if (props.collectionView) {
    return (
      <div className="collectionCardHoverContainer">
        <CardMinusButton cardDec={minusPressed} />
        <CollectionCardCount count={cardCount.toString()} />
        <CardPlusButtom cardInc={plusPressed} />
      </div>
    );
  }
  return <div></div>;
}
