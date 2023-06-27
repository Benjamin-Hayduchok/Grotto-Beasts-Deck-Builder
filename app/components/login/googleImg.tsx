import React from 'react';
import classNames from "classnames";

export default function GoogleImg() {
    return (
        <div
        style={{
            backgroundImage: `url(Google__G__Logo.svg)`,
            backgroundSize: "cover"
          }}
            className={classNames(
               "w-[40px]",
               "h-[40px]",
               "ml-5"
            )}
        >
        </div>
    )
}