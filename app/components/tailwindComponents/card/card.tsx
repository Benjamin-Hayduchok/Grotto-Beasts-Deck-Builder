import classNames from "classnames";
import { FC, useRef } from "react";
import { useRotateToMouse } from "./utils/mouse";
import CollectionCardHover from "../../collectionCardHover";

export type CardProps = {
  name: string;
  cardNum: string;
  imageName: string;
  effect: string;
  collectionView: boolean;
};

export const Card: FC<CardProps> = ({
  name,
  imageName,
  effect,
  collectionView,
  cardNum,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { rotateToMouse, removeListener } = useRotateToMouse(inputRef, glowRef);

  return (
    <div className={"cardContainer"}>
      <div
        ref={inputRef}
        className={classNames(
          "relative",
          "inline-block",
          "text-bold",
          "p-1",
          "text-right",
          "color-black",
          "w-[300px]",
          "h-400px",
          "shadow-md",
          "rounded-md",
          "transition-all skew-x-0 duration-300 ease-out"
        )}
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
      {/* TODO: NV - Update this component as well */}
      <CollectionCardHover
        collectionView={collectionView}
      ></CollectionCardHover>
    </div>
  );
};
