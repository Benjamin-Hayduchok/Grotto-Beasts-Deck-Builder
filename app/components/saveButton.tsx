import { FC, useContext } from "react";
import classNames from "classnames";
import { DeckListContext } from "./providers/deckListProvider/DeckListProvider";
import { PageTypes } from "./providers/cardDataProvider";

export type SaveButtonProps = {
  saveType: string;
  saveCollection?: Function;
};

export const SaveButton: FC<SaveButtonProps> = ({
  saveType,
  saveCollection,
}) => {
  const { saveDeckList } = useContext(DeckListContext);

  const save = () => {
    if (saveType === PageTypes.DECKBUILDER) {
      saveDeckList();
      return;
    }
    if (saveCollection) {
      saveCollection();
    }
  };
  return (
    <button
      className={classNames(
        "flex justify-center rounded w-full h-14 px-5 py-2.5 max-w-s",
        "overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
      )}
      onClick={() => save()}
    >
      <span
        className={classNames(
          "absolute",
          "text-3xl",
          "text-center",
          "justify-center",
          "items-center"
        )}
      >
        Save
      </span>
    </button>
  );
};
