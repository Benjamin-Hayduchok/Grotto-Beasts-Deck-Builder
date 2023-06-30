import React, { useState } from "react";
import './../../styles/collection.css';
import CardPlusButtom from './cardPlusButton';
import CardMinusButton from './cardMinusButton';
import CollectionCardCount from './collectionCardCount'
import util from "./util";



export default function CollectionCardHover(props: {collectionView: boolean, collectionCount: number}) {
    const [cardCount, setCardCount] = useState(props.collectionCount);

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
                <CollectionCardCount count={cardCount}/>
                <CardPlusButtom cardInc={plusPressed}/>
            </div>
        )
    }
    return (
        <div>
        </div>
    )
}