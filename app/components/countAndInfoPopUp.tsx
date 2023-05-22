import React, { Component } from 'react'

const CountAndInfoPopUp = (props: {showAdjustCount: boolean, count: string}) => {
  const { showAdjustCount, count } = props;
  console.log('props', props)
  if (showAdjustCount) {
    return (
      <div className="countAndInfoPopUpContainer">
        <input className="infoButt" type="button" value="i"/>
        <input className="minusButt" type="button" value="-"/>
        <input className="plusButt" type="button" value="+"/>
      </div>
    )
  }
  return (
      <p></p>
  )
} 

export default CountAndInfoPopUp