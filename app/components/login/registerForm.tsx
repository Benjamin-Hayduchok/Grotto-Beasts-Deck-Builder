import React from 'react';
import '../../../styles/login.css';

export default function RegisterForm(props: any) {
    async function createAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (typeof document !== 'undefined') {
            const userObj = {
              username: (document.getElementById("usernameLogin") as HTMLInputElement).value,
              password: (document.getElementById("passwordLogin") as HTMLInputElement).value,
              passwordConfirm: (document.getElementById("passwordConfirmLogin") as HTMLInputElement).value
            }
            const response = await fetch("http://127.0.0.1:8090/api/collections/users/records", {   
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userObj)
            });
            console.log('response', response)
        }
    }
    return (
        <form className="login-form" onSubmit={createAccount}>   
            <input type="text" placeholder="username" id="usernameLogin"/>
            <input type="password" placeholder="password" id="passwordLogin"/>
            <input type="password" placeholder="confirm password" id="passwordConfirmLogin"/>
            <button>
                create
            </button>
            <p className="message">
                Already registered?
                <a className="changeView" onClick={() => props.toggleView()}>
                    &nbsp;&nbsp;Sign In
                </a>
            </p>
        </form>
    )
}
