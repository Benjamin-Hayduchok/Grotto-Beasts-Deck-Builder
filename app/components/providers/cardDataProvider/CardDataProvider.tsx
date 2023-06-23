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
};

export const CardDataContext = createContext<CardsData[] | undefined>(
  undefined
);

export const CardDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allCardsData, setAllCardsData] = useState<CardsData[]>(
    Object.values(allCards)
  );

  return (
    <CardDataContext.Provider value={allCardsData}>
      {children}
    </CardDataContext.Provider>
  );
};
