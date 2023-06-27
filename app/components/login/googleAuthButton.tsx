import React, {useState} from 'react';
import classNames from "classnames";
import GoogleImg from "./googleImg";
import ContinueMessage from "./continueMessage";

export default function GoogleAuthButton() {
    return (
        <div
            className={classNames(
                "w-[100%]",
                "content-center",
                "flexbox m-auto",
                "min-w-[350px]",
                "items-center",
                "justify-center",
                "pt-44"
            )}
        >
            <button 
                type="button"
                className={classNames(
                    "rounded-full",
                    "bg-green-900",
                    "w-[70%]",
                    "h-[100%]",
                    "content-center",
                    "m-100",
                    "flex m-auto"
                )}
            >   
                <GoogleImg/>
            </button>
        </div>

    )
}