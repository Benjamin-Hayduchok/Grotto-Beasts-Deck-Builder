import React from 'react';
import classNames from "classnames";
import GoogleImg from "./googleImg";

export default function GoogleAuthButton() {
    return (
        <div
            className={classNames(
                "w-full min-w-[350px] pt-44",
                "content-center items-center justify-center"
            )}
        >
            <button 
                type="button"
                className={classNames(
                    "w-2/3 h-full m-100",
                    "flex first-line:content-center rounded-full"
                )}
            >   
                <GoogleImg/>
            </button>
        </div>

    )
}