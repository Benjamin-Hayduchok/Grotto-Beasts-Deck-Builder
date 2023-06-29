import React from 'react';
import classNames from "classnames";

export default function LoginHeader() {
    return (
        <div
            className={classNames(
                "h-1/6",
                "mt-[2vh]",
            )}
        >   
            <h1
                className={classNames(
                    "justify-center",
                    "text-center",
                    "text-[2vw]", 
                    "resize-none"
                )}
            >
                Log in Options
            </h1>
        </div>

    )
}