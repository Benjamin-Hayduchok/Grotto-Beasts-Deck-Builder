import React, {useState} from 'react';
import '../../../styles/login.css';
import Swal from "sweetalert2";
import util from '../../components/util';

const RegisterForm = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [questionSelect, setQuestionSelect] = useState("");
    const [answer, setAnswer] = useState("");

    async function createAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (questionSelect === "none" || answer === "") {
            Swal.fire({
                title: '<p>Please properly select security question and insert an answer.</p>',
                icon: 'warning',
                confirmButtonColor: '#257d52',
                confirmButtonText: 'Continue'
            });
            return;
        }
        const response = await util.registerToAPI(username, password, passwordConfirm);
        if (response.id) {
            // do security question and answer insert
            await util.addQuestionToAPI(response.id, questionSelect, username);
            await util.addAnswerToAPI(response.id, answer, username);
            Swal.fire({
                title: '<p>You have created an account. Redirecting you now!</p>',
                icon: 'success',
                confirmButtonColor: '#257d52',
                confirmButtonText: 'Continue'
            }).then(() => {
                sessionStorage.setItem("userId", response.id);
                window.location.href = new URL(window.location.href).origin + "/collection";
            });
        }
    }
    return (
        <form className="login-form" onSubmit={createAccount}>   
            <input type="text" placeholder="username" id="usernameReg" onChange={e=> {setUsername(e.target.value)}}/>
            <input type="password" placeholder="password" id="passwordReg" onChange={e=> {setPassword(e.target.value)}}/>
            <input type="password" placeholder="confirm password" id="passwordConfirmReg" onChange={e=> {setPasswordConfirm(e.target.value)}}/>
            <select className="securitySelect" name="securityQuestion" id="securityQuestion" onChange={e=> {setQuestionSelect(e.target.value)}}>
                <option className="option" value="none">Select Security Question</option>
                <option className="option" value="What was the first concert you attended?">What was the first concert you attended?</option>
                <option className="option" value="What was the make and model of your first car?">What was the make and model of your first car?</option>
                <option className="option"  value="What is the name of your first pet?">What is the name of your first pet?</option>
            </select>
            <input type="text" placeholder="Security Question Answer" id="securityAnswer" onChange={e=> {setAnswer(e.target.value)}}/>
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

export default RegisterForm;