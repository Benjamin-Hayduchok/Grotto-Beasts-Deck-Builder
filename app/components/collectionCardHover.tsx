import React from 'react'
import './../../styles/collection.css';
import CardPlusButtom from './cardPlusButton';
import CardMinusButton from './cardMinusButton';
import CollectionCardCount from './collectionCardCount'

export default function CollectionCardHover(props: {collectionView: boolean}) {
    console.log('props.collectionView', props.collectionView)
    if (props.collectionView) {
        return (
            <div className='collectionCardHoverContainer'>
                <CardMinusButton/>
                <CollectionCardCount/>
                <CardPlusButtom/>
            </div>
        )
    }
    return (
        <div>
        </div>
    )
}