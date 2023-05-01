import React, { Component } from 'react'

const DeckCard = (props: {name: string, imageName: string, count: string, cost: string, isEpic: boolean}) => {
  const { name, imageName, count, cost } = props;
  console.log('"./cost" + cost + ".png"', "./cost" + cost + ".png")
  return (
    <div>
      <img className="starIcon" src={"./cost+" + cost + ".png"}></img>
      {name}
    </div>
  )
}

export default DeckCard
