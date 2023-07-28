import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
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
  const [pageType, setPageType] = useState<PageTypes>();

  useEffect(() => {
    const handleURLChange = () => {
      const path = window.location.pathname;
      setPageType(
        path.split("/").includes(PageTypes.COLLECTION)
          ? PageTypes.COLLECTION
          : PageTypes.DECKBUILDER
      );
    };

    handleURLChange();

    // Listen for URL changes
    window.addEventListener("popstate", handleURLChange);

    return () => {
      window.removeEventListener("popstate", handleURLChange);
    };
  }, []);

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
