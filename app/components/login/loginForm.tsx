import React, { useState } from 'react';
import util from '../../components/util';
import PocketBase from 'pocketbase';


const test = async () => {
    const pb = new PocketBase('https://grotto-beasts-test.fly.dev'); 
    console.log("1")
    const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
    // Authenticates a record with OAuth2 code.
    var provider = "google", code = "test"

    // pb.collection('users').authWithOAuth2Code(provider, code, codeVerifier, redirectUrl, createData = {}, bodyParams = {}, queryParams = {});

    console.log('2');
    // after the above you can also access the auth data from the authStore
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    // console.log(pb.authStore.model.id);
}

export default function LoginForm(props: any) {
    const [failMessage, setFailMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    test();

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (typeof document === 'undefined') return
        if ((await util.loginToAPI(username, password)).status === 200) window.location.href = new URL(window.location.href).origin + "/collection";        
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