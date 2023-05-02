import React, { Component } from 'react'
import EpicTag from './epicTag';

const DeckCard = (props: {name: string, imageName: string, count: string, cost: string, isEpic: boolean}) => {
  const { name, imageName, count, cost, isEpic} = props;
  console.log('"./cost" + cost + ".png"', "./cost" + cost + ".png")
  return (
    <div className="deckCard">
      <img className="costIcon" src={"./cost+" + cost + ".png"}></img>
      <p className="deckCardName">{name}</p>
      <EpicTag isEpic={isEpic}></EpicTag>
    </div>
  )
}

export default DeckCard
