import React, { Component } from 'react'
import EpicTag from './epicTag';

const showCardCountChange = (cardNum: string) => {
  console.log('SHOW cardNum', cardNum)
}

const hideCardCountChange = (cardNum: string) => {
  console.log('HIDE cardNum', cardNum)
}

const DeckCard = (props: {cardNum:string, name: string, imageName: string, count: string, cost: string, isEpic: boolean}) => {
  const { name, cardNum, imageName, count, cost, isEpic} = props;
  return (
    <div className="deckCard"
      onMouseOver={() => showCardCountChange(cardNum)}
      onMouseLeave={() => hideCardCountChange(cardNum)}
    >
      <img className="costIcon" src={"./cost+" + cost + ".png"}></img>
      <p className="deckCardName">{name}</p>
      <div className="spacing"><EpicTag isEpic={isEpic}></EpicTag></div>
      <p className="cardCount">{count}</p>
    </div>
  )
} 

export default DeckCard
