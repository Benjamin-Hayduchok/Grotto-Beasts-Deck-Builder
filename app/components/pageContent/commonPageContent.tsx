import { FC } from "react";
import SearchBar from "../searchBar";
import CardList from "../cardList";
import { ResponsiveDeckWrapper } from "../responsiveDeckWrapper/ResponsiveDeckWrapper";
import Deck from "../deck/deck";
import { CardsData } from "../cardList";
import classNames from "classnames";

type CommonPageContentProps = {
  cardList: CardsData[];
  saveType: string;
  saveCollection?: Function;
  userId?: string;
  deckLists?: string[];
};

export const CommonPageContent: FC<CommonPageContentProps> = ({
  cardList,
  saveType,
  saveCollection,
  userId,
  deckLists,
}) => {
  return (
    <div>
      <SearchBar></SearchBar>
      <div className={"flex p-8"}>
        <CardList collectionView={true} cardArray={Object.values(cardList)} />
        <ResponsiveDeckWrapper>
          <div
            className={classNames(
              "bg-gb-brown rounded-md overflow-hidden",
              "h-full w-full shadow-2xl shadow-[rgba(0,0,0,0.35)]",
              "border-4 border-[rgb(224,180,34)]"
            )}
          >
            <Deck
              userId={userId}
              deckLists={deckLists}
              saveType={saveType}
              saveCollection={saveCollection}
            />
          </div>
        </ResponsiveDeckWrapper>
      </div>
    </div>
  );
};
