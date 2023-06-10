import React from 'react';
import './../../styles/collection.css';

export default function CardMinusButton(props: any) {
    return (
        <input
            style={{backgroundColor: "#348aa7"}}
            className="fancyButton" type="button" value="-"
            onClick={() => props.cardDec()}
        />
    )
}