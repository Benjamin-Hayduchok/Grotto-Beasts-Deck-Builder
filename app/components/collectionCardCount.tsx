import React, { useState, useEffect } from "react";
import './../../styles/collection.css';

export default function CollectionCardCount(props: {count: string}) {
    const [count, setCount] = useState("");

    useEffect(() => {
        setCount(props.count);
    })

    return (
        <p className="collectionCardCount">{count}</p>
    )
}