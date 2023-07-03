import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import allCards from "../../card-list.json";
import { PocketBaseContext } from "../pocketBaseProvider/PocketBaseProvider";

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

export const CardDataContext = createContext<CardsData[] | undefined>(
  undefined
);

export const CardDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const pocketBaseConnection = useContext(PocketBaseContext);
  const [allCardsData, setAllCardsData] = useState<CardsData[]>(
    Object.values(allCards)
  );

  const updateCollectionCount = (cardList: CardsData[] | undefined) => {
    // hit db and get the users collection values to update collection within the context
    var collectionCountDict: {
      [collectionCount: number]: number
    } = {
          0:1,
          1:3,
          4:2,
          5:0 
        };
    for (var collectionCount in collectionCountDict) {
      var currCard = cardList?.at(parseInt(collectionCount));
      if (currCard) currCard.collectionCount = collectionCountDict[collectionCount];
    }
    if (!pocketBaseConnection?.authStore.isValid) return cardList;
  }

  return (
    <CardDataContext.Provider value={updateCollectionCount(allCardsData)}>
      {children}
    </CardDataContext.Provider>
  );
};
