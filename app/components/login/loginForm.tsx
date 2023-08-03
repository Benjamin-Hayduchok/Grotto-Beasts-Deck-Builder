import React, { useState } from 'react';
import util from '../../components/util';
import PocketBase from 'pocketbase';


export default function LoginForm(props: any) {
    const [failMessage, setFailMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (typeof document === 'undefined') return
        else setFailMessage("Credentials are not correct, please try again.");
    }
    return (
        <form className="login-form" onSubmit={login}>
            <input type="text" placeholder="username" id="emailRegister" onChange={e => setUsername(e.target.value)}/>
            <input type="password" placeholder="password" id="passwordRegister" onChange={e => setPassword(e.target.value)}/>
            <button>
                login
            </button>
            <small className="failMessage" id="failMessage"><br></br><u>{failMessage}</u></small>
            <p className="message">
                Not registered? 
                <a className="changeView" onClick={() => props.toggleView()}>
                    &nbsp;&nbsp;Create an account
                </a>
            </p>
        </form>
    )
}