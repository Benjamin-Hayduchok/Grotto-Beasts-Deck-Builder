import React from 'react';
import '../../../styles/login.css';

export default function RegisterForm(props: any) {
    return (
        <form className="login-form">   
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>create</button>
            <p className="message">
                Already registered?
                <a className="changeView" onClick={() => props.toggleView()}>
                    &nbsp;&nbsp;Sign In
                </a>
            </p>
        </form>
    )
}
