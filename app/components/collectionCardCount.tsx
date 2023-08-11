import React, { useState, useEffect } from "react";
import './../../styles/collection.css';

export default function CollectionCardCount(props: {count: string, collectionView: boolean}) {
    const [count, setCount] = useState("");

    useEffect(() => {
        setCount(props.count);
    })
    if (props.collectionView) {
        return (
            <p className="collectionCardCount">{count}</p>
        )
        
    }
    return (
        <p className="text-lg justify-center text-center w-full">Collection Count: {count}</p>
    )
}