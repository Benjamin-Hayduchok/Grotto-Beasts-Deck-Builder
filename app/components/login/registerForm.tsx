import React, {useState} from 'react';
import Swal from "sweetalert2";
import util from '../../components/util';

const RegisterForm = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    async function createAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (typeof document === 'undefined') return;
        if ((await util.registerToAPI(username, password, passwordConfirm)).status === 200) {
            Swal.fire({
                title: '<p>You have created an account. Redirecting you now!</p>',
                icon: 'success',
                confirmButtonColor: '#257d52',
                confirmButtonText: 'Continue'
            }).then(() => {
                window.location.href = new URL(window.location.href).origin + "/collection";
            });
        }
    }
    return (
        <form className="login-form" onSubmit={createAccount}>   
            <input type="text" placeholder="username" id="usernameReg" onChange={e=> {setUsername(e.target.value)}}/>
            <input type="password" placeholder="password" id="passwordReg" onChange={e=> {setPassword(e.target.value)}}/>
            <input type="password" placeholder="confirm password" id="passwordConfirmReg" onChange={e=> {setPasswordConfirm(e.target.value)}}/>
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