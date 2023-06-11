import React from 'react';
import '../../../styles/login.css';

export default function LoginForm(props: any) {
    return (
        <form className="login-form">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>login</button>
            <p className="message">
                Not registered? 
                <a className="changeView" onClick={() => props.toggleView()}>
                &nbsp;&nbsp;Create an account
                </a>
            </p>
        </form>
    )
}