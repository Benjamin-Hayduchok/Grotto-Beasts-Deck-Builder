import React from 'react'

const EpicTag = (props: {isEpic: boolean}) => {
  const { isEpic } = props;
  if (isEpic) {
    return (
        <p className="epicTag">Epic ✦</p>
    )
  }
  else {
    return(
        <></>
    )
  }
}

export default EpicTag
