import React, { useState } from 'react';
import '../../../styles/login.css';
import Swal from "sweetalert2";
import util from '../../components/util';

export default function LoginForm(props: any) {
    const [failMessage, setFailMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");


    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginResp = await util.loginToAPI(username, password);
        console.log('loginResp  ', loginResp  )
        if (loginResp.record) {
            sessionStorage.setItem("userId", loginResp.record.id);
            window.location.href = new URL(window.location.href).origin + "/collection";
        }
        else setFailMessage("Credentials are not correct, please try again.");
    }

    const handleShowForgotForm = async () => {
        if (username === "") {
            Swal.fire({
                title: '<p>Please insert a valid username.</p>',
                icon: 'warning',
                confirmButtonColor: '#257d52',
                confirmButtonText: 'Continue'
            });
            return;
        }
        const userResp = await util.findUserByUsername(username);
        if (userResp.items.length === 0) {
            Swal.fire({
                title: '<p>Username does not exist.</p>',
                icon: 'warning',
                confirmButtonColor: '#257d52',
                confirmButtonText: 'Continue'
            });
            return;
        }
        const questionResp = await util.getUserQuestions(username);
        if (questionResp.items.length === 0) {
            Swal.fire({
                title: '<p>This user does not have any security questions. Please send a message to the Admin to fix this issue.</p>',
                icon: 'warning',
                confirmButtonColor: '#257d52',
                confirmButtonText: 'Continue'
            });
            return;
        }
        setQuestion(questionResp.items[0].question);
        setShowForgotPassword(true);
    }

    const submitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const answerResp = await util.submitUserAnswer(username, answer);
        if (answerResp.items.length === 0) {
            Swal.fire({
                title: '<p>Incorrect Answer. Please try again.</p>',
                icon: 'warning',
                confirmButtonColor: '#257d52',
                confirmButtonText: 'Continue'
            });
            return;
        }
        // login user, will likely do just oauth2 solution to replace this
        sessionStorage.setItem("userId", answerResp.items[0].id);
        window.location.href = new URL(window.location.href).origin + "/collection";
    }

    if (showForgotPassword) {
        return (
            <form className="login-form" onSubmit={submitAnswer}>
                <span className="questionMessage">
                    {question}
                </span>
                <input type="text" placeholder="Enter Answer" id="securityAnswer" value={answer} onChange={e => setAnswer(e.target.value)}/>
                <button>
                    Submit Answer
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
    return (
        <form className="login-form" onSubmit={login}>
            <input type="text" placeholder="username" id="emailRegister" onChange={e => setUsername(e.target.value)}/>
            <input type="password" placeholder="password" id="passwordRegister" onChange={e => setPassword(e.target.value)}/>
            <button>
                login
            </button>
            <small className="failMessage" id="failMessage"><br></br><u>{failMessage}</u></small>
            <p className="message">
                <a className="changeView" onClick={() => handleShowForgotForm()}>
                     &nbsp;&nbsp;Forgot Password?
                </a>
            </p>
            <p className="message">
                Not registered? 
                <a className="changeView" onClick={() => props.toggleView()}>
                    &nbsp;&nbsp;Create an account
                </a>
            </p>
        </form>
    )
}