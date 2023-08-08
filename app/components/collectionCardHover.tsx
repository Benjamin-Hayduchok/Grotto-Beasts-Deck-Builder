import React, { useState, useEffect } from "react";
import "./../../styles/collection.css";
import CardPlusButtom from "./cardPlusButton";
import CardMinusButton from "./cardMinusButton";
import CollectionCardCount from "./collectionCardCount";

export default function CollectionCardHover(props: {
  collectionCount: number;
  cardNum: string;
  updateCollectionCount: Function;
  collectionView: boolean;
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

  return (
    <div className="collectionCardHoverContainer">
      {props.collectionView && <CardMinusButton cardDec={minusPressed} />}
      <CollectionCardCount count={cardCount.toString()} collectionView={props.collectionView} />
      {props.collectionView && <CardPlusButtom cardInc={plusPressed} />}
    </div>
  );

  return <div></div>;
}
