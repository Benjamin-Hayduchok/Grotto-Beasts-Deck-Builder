import React, { Component } from 'react'

const CountAndInfoPopUp = (props: {showAdjustCount: boolean, count: string}) => {
  const { showAdjustCount, count } = props;
  console.log('props', props)
  if (showAdjustCount) {
    return (
      <div className="countAndInfoPopUpContainer">
        <span className="plus">+</span>
      </div>
    )
  }
  return (
      <p></p>
  )
} 

export default CountAndInfoPopUp