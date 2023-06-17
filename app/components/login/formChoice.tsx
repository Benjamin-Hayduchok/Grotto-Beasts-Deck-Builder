import React, {useState} from 'react';
import RegisterForm from './registerForm';
import LoginForm from "./loginForm";

export default function FormChoice() {
    const [loginView, setLoginView] = useState(true);

    const toggleView = () => {
        setLoginView(!loginView);
    }
    
    if (loginView) {
        return (                
            <LoginForm toggleView={toggleView}/>
        )
    }
    return (
        <RegisterForm toggleView={toggleView}/>
    )
}