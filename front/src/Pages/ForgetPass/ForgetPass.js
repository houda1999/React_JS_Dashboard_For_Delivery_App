import { useEffect, useState } from "react";
import './ForgetPass.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Swal from 'sweetalert2';


export function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [cancel, setCancel] = useState('');
    const [valider, setValider] = useState('');
    const [submitted, setSubmitting] = useState(false);

    useEffect(() => {
        let send = localStorage.getItem("send");
        if(send)
        {
            setSubmitting(true);
        }
    })
    async function Submit(event) {
        event.preventDefault();
        if (cancel == 1) {
            window.location.href = '/';
        }
        else if (valider == 1) {
            if (email.trim() != "") {
                axios.post(`http://localhost:1337/reset_password/user/${email}`).then(res => {

                    const result = res.data;
                    if (result == "true") {
                        setSubmitting(true);
                        localStorage.setItem("send","true");
                    }
                    else if (result == "false") {
                        Swal.fire({
                            timer: 3000,
                            text: "Problem in connexion please retry ",
                            type: 'warning',
                        })
                    }
                    else if (result == "no user") {
                        Swal.fire({
                            timer: 3000,
                            text: "User not found please retry with another email ",
                            type: 'error',
                        })
                    }
                })

                setEmail("");


            }
        }

    }
    async function Back() {
        window.location.href = '/';
    }

    return (
        <div className="container-fluid ps-md-0">
            <div className="row">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6" id="login">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                {submitted ? (
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h4>
                                           We emailed you a link to reset
                                            your password.
                                        </h4>
                                        <a onClick={Back} className="ghost-btn">
                                            <u>Return to sign in</u>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading mb-4">Pour récupérer votre compte veuillez entrer votre l'email</h3>
                                        <form onSubmit={Submit}>
                                            <div className="form-floating mb-3">
                                                <input type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="form-control"
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                />
                                                <label htmlFor="floatingInput">Email address</label>
                                            </div>
                                            <div className="d-grid">

                                                <div className="row" >
                                                    <div className="col">
                                                        <button className="btn btn-lg btn-dark btn-login text-uppercase fw-bold mb-2 annuler"
                                                            type="submit" onClick={() => (setCancel(1), setValider(0))}>
                                                            Annuler
                                                        </button>
                                                    </div>
                                                    <div className="col">
                                                        <button className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-2 valider"
                                                            onClick={() => (setCancel(0), setValider(1))}
                                                            type="submit">Valider</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}  
