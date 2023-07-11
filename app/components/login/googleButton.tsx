import React from 'react';
import classNames from "classnames";
import PocketBase from 'pocketbase';

export default function GoogleButton() {

    const googleLogin = async () => {
        const pb = new PocketBase('https://grotto-beasts-test.fly.dev'); 
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
        console.log('authData', authData)
        if (pb.authStore.isValid) {
            if (!authData.record.collectionCountId) {
                // INSERT COLLECTION ID into db now
            }
            else {
                localStorage.setItem("collectionCountId", authData.record.collectionCountId);
                // login user
                if (typeof window !== "undefined") window.location.href = new URL(window.location.href).origin + `/collection/${authData.record.collectionCountId}`;
            }
        }
        // prevent login
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