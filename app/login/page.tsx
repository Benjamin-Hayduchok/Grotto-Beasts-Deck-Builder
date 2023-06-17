"use client";
import React from 'react';
import "../../styles/login.css"
import FormChoice from "../components/login/formChoice"

export default function Login() {

    return (
        <div className="login-page">
            <div className="form">
                <FormChoice/>
            </div>
        </div>
    )
}