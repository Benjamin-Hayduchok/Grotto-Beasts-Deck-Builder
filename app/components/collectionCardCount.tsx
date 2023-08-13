import React, { useState, useEffect } from "react";
import "./../../styles/collection.css";

export default function CollectionCardCount(props: {
  count: string;
  collectionView: boolean;
}) {
  const [count, setCount] = useState("");

  useEffect(() => {
    setCount(props.count);
  });
  return (
    <>
      {props.collectionView ? (
        <p className="collectionCardCount">{parseInt(count) < 0 ? 0 : count}</p>
      ) : (
        <p className="text-lg justify-center text-center w-full">
          Collection Count: {parseInt(count) < 0 ? 0 : count}
        </p>
      )}
    </>
  );
}
