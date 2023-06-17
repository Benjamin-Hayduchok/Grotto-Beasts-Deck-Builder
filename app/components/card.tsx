"use client";
import React, { useEffect, useRef } from "react";
import "./../../styles/globals.css";
import eventBus from "./eventBus";
import CollectionCardHover from "./collectionCardHover";

function addCard(card: { cardNum: string }) {
  console.log("ON CLICK card", card);

  if (parseInt(card.cardNum) <= 32)
    eventBus.dispatch("addChallengerToDeck", { card: card });
  else eventBus.dispatch("addCardToDeck", { card: card });
}

const Card = (props: {
  name: string;
  cardNum: string;
  imageName: string;
  effect: string;
  collectionView: boolean;
}) => {
  const { name, imageName, effect } = props;
  const inputRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rotateToMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (inputRef.current) {
      var bounds = inputRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2,
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      inputRef.current.style.transform = `
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${center.y / 100},
                ${-center.x / 100},
                0,
                ${Math.log(distance) * 2}deg
            )
            `;
      if (glowRef.current) {
        glowRef.current.style.backgroundImage = `
                radial-gradient(
                    circle at
                    ${center.x * 2 + bounds.width / 2}px
                    ${center.y * 2 + bounds.height / 2}px,
                    #ffffff55,
                    #0000000f
                )
                `;
      }
    }
  };
  const removeListener = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (inputRef.current) {
      inputRef.current.style.transform = "";
    }
  };
  useEffect(() => {});
  return (
    <div className="cardContainer" onClick={() => addCard(props)}>
      <div
        ref={inputRef}
        className="card"
        style={{
          backgroundImage: `url(${imageName})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          border: "red 1px solid",
        }}
        onMouseLeave={removeListener}
        onMouseMove={rotateToMouse}
      >
        i
        <div ref={glowRef} className="glow" />
      </div>
      <CollectionCardHover
        collectionView={props.collectionView}
      ></CollectionCardHover>
    </div>
  );
};

export default Card;
