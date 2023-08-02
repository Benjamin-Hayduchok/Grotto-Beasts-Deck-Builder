import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useReducer,
} from "react";
import util from "../../util";
import { CardDataContext } from "../cardDataProvider";
import Swal from "sweetalert2";

export type DeckListType = {
  cost: string;
  cardNum: string;
  name: string;
  imageName: string;
  count: string;
  isEpic: boolean;
};

type DeckListContextType = {
  deckList: DeckListType[] | undefined;
  challenger: string;
  deckListLength: number;
  epicArray: String[];
  addToDeckList: (cardNum: string) => void;
  removeFromDeckList: (cardNum: string) => void;
  forceRender: boolean;
  forceRenderDispatch: () => void;
};

export const DeckListContext = createContext<DeckListContextType>({
  deckList: undefined,
  challenger: "None",
  deckListLength: 0,
  epicArray: [],
  addToDeckList: () => {},
  removeFromDeckList: () => {},
  forceRender: false,
  forceRenderDispatch: () => {},
});

export const DeckListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [deckList, setDeckList] = useState<DeckListType[]>(
    [] // should be populated with API call to get decklist
  );
  const [challenger, setChallenger] = useState<string>(
    "None" // should be populated with API call to get decklist
  );
  const [deckListLength, setDeckListLength] = useState<number>(
    0 // should be populated with API call to get decklist
  );
  const [epicArray, setEpicArray] = useState<String[]>(
    [] // should be populated with API call to get decklist
  );
  const [forceRender, forceRenderDispatch] = useReducer(
    (state) => !state,
    false
  );
  const { cardsData } = useContext(CardDataContext);

  const addToDeckList = (cardNum: string) => {
    if (typeof cardsData === "undefined" || typeof deckList === "undefined") {
      return;
    }
    var cardObj = cardsData[parseInt(cardNum) - 1];

    if (cardObj && parseInt(cardObj.cardNum) <= 32) {
      // checking if card is challenger to set
      setChallenger(cardObj.name);
      return; // nothing else to be added, just updating challenger
    }
    var copyDeckList = [...deckList];

    var deckListLimit = challenger === "Byeah Prime" ? 60 : 40;

    if (deckListLength >= deckListLimit) {
      Swal.fire({
        title: "<strong>Card Limit Reached</strong>",
        html: `<b>Can only have ${deckListLimit} cards in your deck.</b>`,
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
      return; // BEN NOTE: MIGHT UPDATE THIS LATER TO SHOW SWAL IF CHANGING FROM BYEAH PRIME
    }
    if (
      epicArray.length !== 0 &&
      challenger !== "JEX" &&
      !epicArray.includes(cardObj.cardNum)
    ) {
      Swal.fire({
        title: "<strong>Cannot add more than one Epic without JEX</strong>",
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
      return; // can't have more than one epic if you don't have jex
    }

    for (var index in copyDeckList) {
      // attempting to add card to decklist
      var deckCard = copyDeckList[index];
      if (cardNum === deckCard.cardNum) {
        if (deckCard.count !== "3" || cardObj.name === "Byeah Beast") {
          // can have unlimited byeah beast
          copyDeckList[index].count = util.toStringInc(
            copyDeckList[index].count
          );
          setDeckListLength(deckListLength + 1);
        }
        return;
      }
    }
    var parsedCard = {
      cost: cardObj.cost,
      cardNum: cardObj.cardNum,
      name: cardObj.name,
      imageName: cardObj.deckCardImage,
      count: "1",
      isEpic: cardObj.type[0] === "✦",
    };
    copyDeckList.push(parsedCard);
    parsedCard.isEpic && setEpicArray([...epicArray, parsedCard.cardNum]);
    setDeckListLength(deckListLength + 1);
    setDeckList([...copyDeckList]);
  };

  const removeFromDeckList = (cardNum: string) => {
    console.log("context remove hit");
  };

  return (
    <DeckListContext.Provider
      value={{
        deckList,
        challenger,
        deckListLength,
        epicArray,
        addToDeckList,
        removeFromDeckList,
        forceRender,
        forceRenderDispatch,
      }}
    >
      {children}
    </DeckListContext.Provider>
  );
};
