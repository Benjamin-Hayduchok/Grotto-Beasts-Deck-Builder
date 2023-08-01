import {
    FC,
    PropsWithChildren,
    createContext,
    useState,
    useContext,
    useReducer
  } from "react";
  import util from "../../util";
  import { CardDataContext } from "../cardDataProvider";
  
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
    challenger: string,
    deckListLength: number,
    addToDeckList: (cardNum: string) => void;
    removeFromDeckList: (cardNum: string) => void;
    forceRender: boolean;
    forceRenderDispatch: () => void;
  };
  
  export const DeckListContext = createContext<DeckListContextType>({
        deckList: undefined,
        challenger: "None",
        deckListLength: 0,
        addToDeckList: () => {},
        removeFromDeckList: () => {},
        forceRender: false,
        forceRenderDispatch: () => {}
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
    const [forceRender, forceRenderDispatch] = useReducer((state) => !state, false);
    const { cardsData } = useContext(CardDataContext);

    const addToDeckList = (cardNum: string) => {
        console.log("context adding")
        if (typeof cardsData === "undefined" || typeof deckList === "undefined") {
            return;
        }
        var cardObj = cardsData[parseInt(cardNum) - 1];

        if (cardObj && parseInt(cardObj.cardNum) <= 32) { // checking if card is challenger to set
            setChallenger(cardObj.name);
            return; // nothing else to be added, just updating challenger
        }
        var copyDeckList = [...deckList];
        
        var deckListLimit = challenger === "Byeah Prime" ? 60 : 40;

        if (deckListLength >= deckListLimit) {
            return; // BEN NOTE: MIGHT UPDATE THIS LATER TO SHOW SWAL IF CHANGING FROM BYEAH PRIME
        }

        for (var index in copyDeckList) {
            var deckCard = copyDeckList[index];
            if (cardNum === deckCard.cardNum) {
                if (deckCard.count !== "3" || cardObj.name === "Byeah Beast") { // can have unlimited byeah beast 
                    copyDeckList[index].count = util.toStringInc(copyDeckList[index].count);
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
            isEpic: cardObj.type[0] === '✦'
        }
        copyDeckList.push(parsedCard);
        setDeckListLength(deckListLength + 1);
        setDeckList([...copyDeckList]);
    }

    const removeFromDeckList = (cardNum: string) => {
        console.log("context remove hit")
    }
    
    return (
        <DeckListContext.Provider 
            value={{
                deckList,
                challenger,
                deckListLength,
                addToDeckList,
                removeFromDeckList,
                forceRender,
                forceRenderDispatch
            }}
        >
            {children}
        </DeckListContext.Provider>
    );
  };
  