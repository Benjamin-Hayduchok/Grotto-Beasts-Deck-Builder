import { FC, PropsWithChildren, createContext, useMemo, useState } from "react";
import allCards from "../../card-list.json";

export type CardsData = {
  name: string;
  power: any;
  goal: any;
  cost: any;
  effect: string;
  flavorText: string;
  type: string;
  artist: string;
  imageName: string;
  deckCardImage: string;
  cardNum: string;
  collectionCount: number;
};

export enum PageTypes {
  COLLECTION = "collection",
  DECKBUILDER = "deckbuilder",
}

export type CardContextValues = {
  cardsData?: CardsData[];
  pageType?: PageTypes;
};

export const CardDataContext = createContext<CardContextValues>({
  cardsData: undefined,
  pageType: undefined,
});

export const CardDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allCardsData, setAllCardsData] = useState<CardsData[]>(
    Object.values(allCards)
  );

  const path = window.location.pathname;
  const pageType: PageTypes = useMemo(() => {
    return path.split("/").includes(PageTypes.COLLECTION)
      ? PageTypes.COLLECTION
      : PageTypes.DECKBUILDER;
  }, [path]);

  return (
    <CardDataContext.Provider
      value={{
        cardsData: allCardsData,
        pageType: pageType,
      }}
    >
      {children}
    </CardDataContext.Provider>
  );
};
