"use client";

import { PocketBaseContext } from "../components/providers/pocketBaseProvider/PocketBaseProvider";
import { useContext } from "react";

const CollectionPage = () => {
    const pocketBaseConnection = useContext(PocketBaseContext);

    if (typeof window === "undefined") {
        return;
    }

    const { authStore } = pocketBaseConnection || {};
    if (authStore?.isValid) {
        const collectionId = localStorage.getItem('collectionCountId');
        if (collectionId && collectionId.length > 0) {
        window.location.href = new URL(window.location.href).origin + "/collection/" + collectionId;
        return;
        }
    }
    
    window.location.href = new URL(window.location.href).origin + "/collection/new";
}

export default CollectionPage;