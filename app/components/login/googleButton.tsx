import React from 'react';
import classNames from "classnames";

export default function GoogleButton() {
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
                    "h-[90px]",
                    "cursor-pointer",
                    "w-1/2",
                    "content-center",
                    "hover:opacity-75",
                    "absolute",
                    "top-1/3",
                    "left-1/4",
                )}
            >
            </div>
        </div>
    )
}