import React from 'react';
import './../../styles/collection.css';

export default function CollectionCardCount(props: {count: string}) {
    return (
        <p className="collectionCardCount">{props.count}</p>
    )
}