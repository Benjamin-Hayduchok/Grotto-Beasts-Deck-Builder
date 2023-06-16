import React from 'react';
import '../../../styles/login.css';

export default function LoginForm(props: any) {
    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (typeof document !== 'undefined') {
            const userObj = {
                email: (document.getElementById("emailRegister") as HTMLInputElement).value,
                password: (document.getElementById("passwordRegister") as HTMLInputElement).value,
            }
            const url = new URL(window.location.href);
            window.location.href = url.origin + "/collection";
        }
    }
    return (
        <form className="login-form" onSubmit={login}>
            <input type="email" placeholder="email" id="emailRegister"/>
            <input type="password" placeholder="password" id="passwordRegister"/>
            <button>
                login
            </button>
            <p className="message">
                Not registered? 
                <a className="changeView" onClick={() => props.toggleView()}>
                    &nbsp;&nbsp;Create an account
                </a>
            </p>
        </form>
    )
}