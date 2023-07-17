import React from 'react';
import classNames from "classnames";
import PocketBase from 'pocketbase';
import Swal from "sweetalert2";

const createNewCollection = async (user: string) => {
    const res = await fetch(
        `https://grotto-beasts-test.fly.dev/api/collections/cardCollection/records`, {   
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user: user, collection: {}})
    });
    const data = await res.json();
    return data.id;
}

const insertCollectionIdIntoUser = async (user: string, collectionCountId: string) => {
    const res = await fetch(
        `https://grotto-beasts-test.fly.dev/api/collections/users/records/${user}`, {   
            method: "PATCH",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({collectionCountId: collectionCountId})
    });
    return res.status;
}

export default function GoogleButton() {

    const googleLogin = async () => {
        const pb = new PocketBase('https://grotto-beasts-test.fly.dev'); 
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
        console.log('authData', authData)
        if (pb.authStore.isValid) {
            if (!authData.record.collectionCountId || authData.record.collectionCountId == "") {
                const collectionCountId = await createNewCollection(authData.record.id);
                localStorage.setItem("collectionCountId", collectionCountId);

                const result = await insertCollectionIdIntoUser(authData.record.id, collectionCountId);
                if (result !== 200) {
                    Swal.fire({
                        title: '<strong>Was unable to properly create user.<br></br>Please try again.</strong>',
                        icon: 'error',
                        confirmButtonColor: '#f27474',
                        confirmButtonText: 'OK'
                    });
                    return;
                }
                if (typeof window !== "undefined") window.location.href = new URL(window.location.href).origin + `/collection/${collectionCountId}`;

            }
            else { // set collection count and login user
                localStorage.setItem("collectionCountId", authData.record.collectionCountId);
                if (typeof window !== "undefined") window.location.href = new URL(window.location.href).origin + `/collection/${authData.record.collectionCountId}`;
            }
        }
        Swal.fire({
            title: '<strong>Was unable to login user.<br></br>Please try again.</strong>',
            icon: 'error',
            confirmButtonColor: '#f27474',
            confirmButtonText: 'OK'
        });
    }

    return (
        <div
            className={classNames(
                "h-5/6"
            )} 
        >
            <div
                style={{
                    backgroundImage: `url(btn_google_signin_light_normal_web@2x.png)`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    border: "none"
                }}
                className={classNames(
                    "w-1/2 h-[90px]",
                    "cursor-pointer hover:opacity-75",
                    "content-center absolute top-1/3 left-1/4"
                )}
                onClick= {googleLogin}
            >
            </div>
        </div>
    )
}