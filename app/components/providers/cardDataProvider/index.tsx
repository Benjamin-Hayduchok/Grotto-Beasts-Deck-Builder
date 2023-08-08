import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import allCards from "../../card-list.json";
import { PocketBaseContext } from "../pocketBaseProvider/PocketBaseProvider";
import Swal from "sweetalert2";

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
  userId: string;
  deckLists?: string[];
  updateCollectionCount: (isIncremented: boolean, cardNum: string) => void;
  saveCollection: () => void;
  forceRender: boolean;
  forceCollectionRenderDispatch: () => void;
};

export const CardDataContext = createContext<CardContextValues>({
  cardsData: undefined,
  pageType: undefined,
  userId: "",
  deckLists: [],
  updateCollectionCount: () => {},
  saveCollection: () => {},
  forceRender: false,
  forceCollectionRenderDispatch: () => {}
});

type collectionCountObjType = { [key: number]: number };

const createCollectionCountObj = (cardList: CardsData[]) => {
  var collectionCountObj: collectionCountObjType = {};
  for (var index in cardList) {
    var card = cardList[index];
    if (card.collectionCount > 0) {
      collectionCountObj[parseInt(index) + 1] = card.collectionCount; // adding 1 to convert array index to cardNum
    }
  }
  return collectionCountObj;
};

async function getCollectionCount(id: string) {
  const res = await fetch(
    `https://grotto-beasts-test.fly.dev/api/collections/cardCollection/records/${id}`
  );
  const data = await res.json();
  return data;
}

const setCollectionCounts = (collectionCounts: any, cardsData: any) => {
  for (var collectionCount in collectionCounts) {
    var currCard = cardsData[parseInt(collectionCount) - 1]; // subtracting 1 to convert array index to cardNum
    if (currCard)
      currCard.collectionCount = collectionCounts[parseInt(collectionCount)];
  }
  return cardsData;
};

export const CardDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allCardsData, setAllCardsData] = useState<CardsData[]>(
    Object.values(allCards)
  );
  const [pageType, setPageType] = useState<PageTypes>();
  const [userId, setUserId] = useState("");
  const [deckLists, setDeckLists] = useState([]);
  const path = window.location.pathname;
  const pathArr = path.split("/");
  const id =
    pathArr.includes(PageTypes.COLLECTION) && pathArr.length === 3
      ? pathArr[2]
      : localStorage.getItem("collectionCountId") || "";
  const [collectionId, setCollectionId] = useState(id);
  const [forceRender, forceCollectionRenderDispatch] = useReducer(
    (state) => !state,
    false
  );

  const pocketBaseConnection = useContext(PocketBaseContext);
  

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

    if (collectionId === "new" || collectionId === "") return;
    getCollectionCount(collectionId).then((data) => {
      setAllCardsData(setCollectionCounts(data?.collection, allCardsData));
      setUserId(data?.user);
      setDeckLists(data?.deckLists ? data?.deckLists : []);
    });

    return () => {
      window.removeEventListener("popstate", handleURLChange);
    };
  }, []);

  async function saveCollectionCount(
    id: string,
    collectionCountObj: collectionCountObjType,
    userId: string
  ) {
    const patchData = { collection: collectionCountObj, user: userId };
    try {
      const record = await pocketBaseConnection
        ?.collection("cardCollection")
        .update(id, patchData);
      if (record) {
        Swal.fire({
          title: "<strong>Saved!</strong>",
          icon: "success",
          confirmButtonColor: "#257d52",
          confirmButtonText: "OK",
        });
        return;
      }
    } catch {
      Swal.fire({
        title: "<strong>Error Saving Collection.</strong>",
        html: "<p>You are not the owner of the Collection.</p>",
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
    }
  }

  const updateCollectionCount = (isIncremented: boolean, cardNum: string) => {
    var cardToUpdateIndex = allCardsData.findIndex(
      (card) => card.cardNum === cardNum
    );
    if (isIncremented) {
      allCardsData[cardToUpdateIndex].collectionCount++; // need to update to find the card with that cardNum instead of querying the index value right away
      setAllCardsData(allCardsData);
      // setCardList([...cardList]); // WORKS BUT IS SO SLOW
      return;
    }
    allCardsData[cardToUpdateIndex].collectionCount--;
    setAllCardsData(allCardsData);
    // setCardList([...cardList]); // WORKS BUT IS SO SLOW
  };

  const saveCollection = () => {
    if (collectionId === "new" || collectionId === "") return;
    if (!pocketBaseConnection?.authStore.isValid) {
      Swal.fire({
        title: "<strong>YOU ARE NOT LOGGED IN</strong>",
        html: '<a href="/login" style="color:blue;"><u>Click here to go to the Login Page...<u></a>',
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
      return;
    }
    const collectionCountObj = createCollectionCountObj(allCardsData);
    saveCollectionCount(collectionId, collectionCountObj, userId).then(
      (result) => console.log("result", result) // should delete at some pt
    );
  };

  return (
    <CardDataContext.Provider
      value={{
        cardsData: allCardsData,
        pageType: pageType,
        userId,
        deckLists,
        updateCollectionCount,
        saveCollection,
        forceRender,
        forceCollectionRenderDispatch
      }}
    >
      {children}
    </CardDataContext.Provider>
  );
};
