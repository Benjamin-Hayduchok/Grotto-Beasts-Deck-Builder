import React from 'react'

const EpicTag = (props: {isEpic: boolean}) => {
  const { isEpic } = props;
  if (isEpic) {
    return (
        <p className="epicTag">✦</p>
    )
  }
  else {
    return(
      <p className="epicTag"></p>
    )
  }
}

export default EpicTag
