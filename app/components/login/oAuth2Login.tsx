import React from 'react';
import classNames from "classnames";
import GoogleButton from './googleButton';
import LoginHeader from './loginHeader';

export default function OAuth2Login() {
    return (
        <div
            className={classNames(
                "container mx-auto w-1/4 h-[50vh]",
                "bg-gray-200 rounded-[1vw]",
                "flex-col items-center justify-center",
                "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
            )}
        >   
            <LoginHeader/>
            <GoogleButton/>
        </div>
    )
}