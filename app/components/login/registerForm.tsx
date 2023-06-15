import React from 'react';
import '../../../styles/login.css';
import Swal from "sweetalert2";

const RegisterForm = (props: any) => {
    async function createAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (typeof document !== 'undefined') {
            const userObj = {
              username: (document.getElementById("usernameLogin") as HTMLInputElement).value,
              password: (document.getElementById("passwordLogin") as HTMLInputElement).value,
              passwordConfirm: (document.getElementById("passwordConfirmLogin") as HTMLInputElement).value
            }
            // const response = await fetch("http://127.0.0.1:8090/api/collections/users/records", {   
            //     method: "POST",
            //     cache: "no-cache",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(userObj)
            // });
            // console.log('response', response)
            const response = await fetch("https://grotto-beasts-test.fly.dev/api/collections/users/records", {   
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userObj)
            });
            console.log('response', response)
            // var response = {status: 200};
            if (response.status === 200) {
                Swal.fire({
                    title: '<p>You have created an account. Redirecting you now!</p>',
                    icon: 'success',
                    confirmButtonColor: '#257d52',
                    confirmButtonText: 'Continue'
                }).then(() => {
                    if (typeof window !== "undefined" && typeof window.location !== "undefined") {
                        const url = new URL(window.location.href);
                        window.location.href = url.origin + "/collection"
                    };
                });
            }

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

export default RegisterForm;