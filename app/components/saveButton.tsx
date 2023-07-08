import React from 'react';
import classNames from "classnames";

export default function SaveButton(props: any) {
    return (
        <a href="#_" 
            className={classNames(
                "flex absolute mt-6 justify-center rounded w-40 h-14 px-5 py-2.5",
                "overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
            )}
        >
            <span className={classNames(
                    "absolute",
                    "text-3xl",
                    "text-center",
                    "justify-center",
                    "items-center"
                )}
            >
                Save
            </span>
        </a>
    )
}