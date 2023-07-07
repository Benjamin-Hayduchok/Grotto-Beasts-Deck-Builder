import React, { useState, useEffect } from "react";
import './../../styles/collection.css';
import CardPlusButtom from './cardPlusButton';
import CardMinusButton from './cardMinusButton';
import CollectionCardCount from './collectionCardCount'



export default function CollectionCardHover(props: {collectionView: boolean, collectionCount: number}) {
    const [cardCount, setCardCount] = useState(props.collectionCount);

    useEffect(() => {
        setCardCount(props.collectionCount);
    }) 

    const plusPressed = () => {
        setCardCount(cardCount + 1);
    }

    const minusPressed = () => {
        if (cardCount > 0) setCardCount(cardCount - 1);
    }

    if (props.collectionView) {
        return (
            <div className='collectionCardHoverContainer'>
                <CardMinusButton cardDec={minusPressed}/>
                <CollectionCardCount count={cardCount.toString()}/>
                <CardPlusButtom cardInc={plusPressed}/>
            </div>
        )
    }
    return (
        <div>
        </div>
    )
}