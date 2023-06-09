import React from 'react';
import './../../styles/collection.css';

const minusButtonPressed = () => {
    console.log("- PRESSED")
    return;
}

export default function CardMinusButton() {
    return (
        <input
            style={{backgroundColor: "#348aa7"}}
            className="fancyButton" type="button" value="-"
            onClick={() => minusButtonPressed()}
        />
    )
}