import React from 'react';
import '../../../styles/login.css';

export default function LoginForm(props: any) {
    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (typeof document !== 'undefined') {
            const userObj = {
              username: (document.getElementById("usernameRegister") as HTMLInputElement).value,
              password: (document.getElementById("passwordRegister") as HTMLInputElement).value,
              passwordConfirm: (document.getElementById("passwordConfirmRegister") as HTMLInputElement).value
            }
        }
    }
    return (
        <form className="login-form" onSubmit={login}>
            <input type="text" placeholder="username" id="usernameRegister"/>
            <input type="password" placeholder="password" id="passwordRegister"/>
            <input type="password" placeholder="confirm password" id="passwordConfirmRegister"/>
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