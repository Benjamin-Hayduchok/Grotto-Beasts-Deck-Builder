import React, { FC, useContext } from "react";
import classNames from "classnames";
import { PocketBaseContext } from "../providers/pocketBaseProvider/PocketBaseProvider";
import Swal from "sweetalert2";

type CollectionAddDeckListButtonProps = {
  deckLists?: string[];
};

const CollectionAddDeckListButton: FC<CollectionAddDeckListButtonProps> = ({
  deckLists,
}) => {
  const pocketBaseConnection = useContext(PocketBaseContext);
  const addDecklist = async () => {
    if (!pocketBaseConnection) {
      Swal.fire({
        title: "<strong>YOU ARE NOT LOGGED IN</strong>",
        html: '<a href="/login" style="color:blue;"><u>Click here to go to the Login Page...<u></a>',
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
      return;
    }

    try {
      const collectionId = localStorage.getItem("collectionCountId") || "none";
      const deckListData = {
        user: localStorage.getItem("userId"),
        decklist: {},
        challenger: "None",
        decklistLength: 0,
        collectionid: collectionId,
        epicArray: [],
        name: "TO BE ADDED LATER",
      };

      const deckListRecord = await pocketBaseConnection
        .collection("decklists")
        .create(deckListData);
      deckLists?.push(deckListRecord.id);
      const collectionData = {
        user: localStorage.getItem("userId"),
        deckLists: deckLists,
      };

      const collectionRecord = await pocketBaseConnection
        .collection("cardCollection")
        .update(collectionId, collectionData);
      console.log("collectionRecord", collectionRecord);
      if (typeof window !== "undefined") {
        window.location.href =
          new URL(window.location.href).origin +
          "/deckbuilder/" +
          deckListRecord.id;
      }
    } catch {
      Swal.fire({
        title: "<strong>Error Creating Decklist.</strong>",
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
    }
  };
  return (
    <button className={classNames("btn btn-neutral")} onClick={addDecklist}>
      Add Deck
    </button>
  );
};

export default CollectionAddDeckListButton;
