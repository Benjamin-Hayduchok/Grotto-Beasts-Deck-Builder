import React from 'react';
import eventBus from './eventBus';

const CountAndInfoPopUp = (props: {showAdjustCount: boolean, count: string, cardNum: string}) => {
  const { showAdjustCount, count, cardNum } = props;

  const showInfoCard = (cardNum: string) => {
    // console.log('SHOW INFO cardNum', cardNum);
  }

  const decreaseCard = (cardNum: string) => {
    // console.log('DECREASE cardNum', cardNum);
    var card = {cardNum: cardNum};
    eventBus.dispatch("removeCardFromDeck", { card: card });
  }

  const increaseCard = (cardNum: string) => {
    // console.log('INCREASE cardNum', cardNum);
    var card = {cardNum: cardNum};
    eventBus.dispatch("addCardToDeck", { card: card });
  }


  if (showAdjustCount) {
    return (
      <div className="countAndInfoPopUpContainer">
        <input 
          className="infoButt" type="button" value="i"
          onClick={() => showInfoCard(cardNum)}
        />
        <input
          className="minusButt" type="button" value="-"
          onClick={() => decreaseCard(cardNum)}
        />
        <input
          className="plusButt" type="button" value="+"
          onClick={() => increaseCard(cardNum)}
        />
      </div>
    )
  }
  return (
      <p></p>
  )
} 

export default CountAndInfoPopUp