import React from 'react';
import './../../styles/collection.css';

const plusButtonPressed = () => {
    console.log("+ PRESSED")
    return;
}

export default function CardPlusButton() {
    return (
            <input
                style={{backgroundColor: "#348aa7"}}
                className="fancyButton" type="button" value="+"
                onClick={() => plusButtonPressed()}
            />
    )
}