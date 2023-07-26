import React from 'react';
import classNames from "classnames";
import PocketBase from 'pocketbase';
import Swal from "sweetalert2";

const createNewCollection = async (pb: PocketBase, user: string) => {
    try {
        const record = await pb.collection('cardCollection').create(JSON.stringify({user: user, collection: {}}));
        return record.id;
    }
    catch {
        return; // returns undefined to be checked in previous func
    }
}
    

const insertCollectionIdIntoUser = async (pb: PocketBase, user: string, collectionCountId: string) => {
    try {
        const record = await pb.collection('users').update(user, JSON.stringify({collectionCountId: collectionCountId}));
        return record;
    }
    catch {
        return; // returns undefiend for previous func to check
    }
}

export default function GoogleButton() {

    const googleLogin = async () => {
        const pb = new PocketBase('https://grotto-beasts-test.fly.dev');
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
        if (!pb.authStore.isValid) {
          Swal.fire({
            title: '<strong>Was unable to login user.<br></br>Please try again.</strong>',
            icon: 'error',
            confirmButtonColor: '#f27474',
            confirmButtonText: 'OK'
          });
          return;
        }
        let collectionCountId = authData.record.collectionCountId;
        if (!collectionCountId || collectionCountId === "") {
          collectionCountId = await createNewCollection(pb, authData.record.id);
          if (typeof collectionCountId === "undefined") {
            Swal.fire({
                title: '<strong>Was unable to properly create user.<br></br>Please try again.</strong>',
                icon: 'error',
                confirmButtonColor: '#f27474',
                confirmButtonText: 'OK'
              });
              return;
          }
          const result = await insertCollectionIdIntoUser(pb, authData.record.id, collectionCountId);
          if (typeof result === "undefined") {
            Swal.fire({
              title: '<strong>Was unable to properly create user.<br></br>Please try again.</strong>',
              icon: 'error',
              confirmButtonColor: '#f27474',
              confirmButtonText: 'OK'
            });
            return;
          }
          Swal.fire({
            title: '<strong>Logging in now...</strong>',
            icon: 'success',
          });
        }
        localStorage.setItem("collectionCountId", collectionCountId);
        if (typeof window !== "undefined") {
            window.location.href = new URL(window.location.href).origin + `/collection/${collectionCountId}`;
        }
      };

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