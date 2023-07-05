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

export type collectCountData = {
  [collectionCount: number]: number
} | undefined;

const getCollectionCountFromDB = async () => { // should be used eventually
  return{
    0:1,
    1:3,
    4:2,
    5:0 
  }
}

export const CardDataContext = createContext<CardsData[] | undefined>(
  undefined
);

export const CardDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const pocketBaseConnection = useContext(PocketBaseContext);
  const [allCardsData, setAllCardsData] = useState<CardsData[]>(
    Object.values(allCards)
  );
  const [collectionCounts, setCollectionCounts] = useState<collectCountData>(
    undefined // might want to change later
  )

  useEffect(() => {
    const getCollectionCountData = async () => {
      // if you are in collection, check the path param.
      // use path param to load collection which should be the id of the collection itself, if new path param, load 0s for all collection counts
      // if you are not in collection, check local storage values to see if you have collectionId
      // if you have collectionId, get collectionId stored in local storage and load cards that way
      // otherwise, load 0 into all cards
      var path = window.location.href;
      var split = path.split("/");
      if (split.length >= 5) {
        if (split[3] === "collection") {
          var id = split[4];
          const record = await pocketBaseConnection?.collection('cardCollection').getOne(id);
          var collectionCount = record?.collection;
          setCollectionCounts(collectionCount);
          return;
        }
        if (true)  {// if collectionId in localStorage
          return // pocketbase collection value
        }
        return // all zeros
      }

      if (pocketBaseConnection?.authStore.isValid) {
        pocketBaseConnection?.autoCancellation(false);
        const resultList = await pocketBaseConnection?.collection('cardCollection').getList(1, 50); // need to add filter based on user log in
        pocketBaseConnection?.autoCancellation(true);
        console.log('resultList', resultList) // work back here
      }
      // setCollectionCount(undefined);
    }
    getCollectionCountData();
  }, []);

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

    var stringTest = JSON.stringify(collectionCountDict)
    var parseTest = JSON.parse(stringTest); // DELETE LATER, USED TO CREATE JSON OBJECTS THAT WORK IN DB FOR SETUP


    // should be its own func
    for (var collectionCount in collectionCounts) {
      var currCard = cardList?.at(parseInt(collectionCount));
      if (currCard) currCard.collectionCount = collectionCounts[parseInt(collectionCount)];
    }
    return cardList;


    if (!pocketBaseConnection?.authStore.isValid) return cardList;
  }

  return (
    <CardDataContext.Provider value={updateCollectionCount(allCardsData)}>
      {children}
    </CardDataContext.Provider>
  );
};
