import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResetPassword.css';
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';

export function RestPassword() {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [parametrs, setParametrs] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [submitted, setSubmitting] = useState(false);
    const [cancel, setCancel] = useState('');
    const [save, setSave] = useState('');
    const [eye1, seteye1] = useState(true);
    const [eye2, seteye2] = useState(true);
    const [type1, settype1] = useState("password");
    const [type2, settype2] = useState("password");
    const [showEye1, setShowEye1] = useState(false);
    const [showEye2, setShowEye2] = useState(false);
    const [passValid, setPassValid] = useState(true);
    const [passMatched, setPassMatched] = useState(true);
    

    useEffect(() => {

        if (!parametrs) {
            const decodedToken = jwt_decode(token);
            const tokenDate = decodedToken.dateToken;

            const exp = parseInt((decodedToken.expiresIn * 1000)) + parseInt(tokenDate);

            const expiration = new Date(exp);
            const now = new Date();

            if (expiration < now) {
                navigate(`/error`);
            }
            else {
                navigate(`/password/reset/${id}/${token}/`);
                setParametrs(true);
            }
        }


    });
    async function Save(e) {

        e.preventDefault();
        if (cancel == 1) {
            navigate(`/`);
        }
        else if (save == 1) {
           
            if (password.trim() == passwordConfirm.trim() 
            && passwordConfirm.trim().length>0 && password.trim().length>0 && passValid) {
                
                axios
                    .post(
                        `http://localhost:1337/receive_new_password/${id}/${token}`,
                        { password }
                    )
                    .then(res => {
                       if(res.data == "true")
                       {
                        Swal.fire({
                            timer: 3000,
                            text: "Your password has changed sucessfuly",
                            type: 'success',
                          })
                        setSubmitting(true);
                        navigate(`/`);
                       }
                       else if(res.data == "false")
                       {
                        Swal.fire({
                            timer: 3000,
                            text: "There is problem in connexion please retry",
                            type: 'error',
                          })
                       }

                    })
                    


            }

        }

    }

    const Eye1 = () => {
        if (type1 == "password") {

            seteye1(false);
            settype1("text");
        }
        else {

            seteye1(true);
            settype1("password");
        }
    }
    const Eye2 = () => {
        if (type2 == "password") {

            seteye2(false);
            settype2("text");
        }
        else {

            seteye2(true);
            settype2("password");
        }
    }
    async function Back() {
        window.location.href = '/';
    }

    function handleChange1(event) {

        setPassword(event.target.value);
       
        if (event.target.value.trim().length == 0) {
            setShowEye1(false);
        }
        else
            setShowEye1(true);
        var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        var test = reg.test(event.target.value);
        if (test && event.target.value.trim().length > 10) {
            setPassValid(true);
        } else {
            setPassValid(false);
        }
        if (passwordConfirm.trim().length != 0) {
            if (event.target.value.trim() == passwordConfirm.trim()) {
                setPassMatched(true)
            }
            else
                setPassMatched(false)
        }

    }
    function handleChange2(event) {

        setPasswordConfirm(event.target.value);
        if (event.target.value.trim().length == 0) {
            setShowEye2(false);
        }
        else
            setShowEye2(true);

        if (event.target.value.trim() == password.trim()) {
            setPassMatched(true)
        }
        else
            setPassMatched(false)

    }


    return (
        <div className="container-fluid ps-md-0">
            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6" id="login">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                {submitted ? (
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h4>
                                            Your password has changed successfully. To login please return to Sign In Page by this link
                                        </h4>
                                        <a onClick={Back} className="ghost-btn">
                                            Return to sign in
                                        </a>
                                    </div>
                                ) : (
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading mb-4">Reinistialiser votre mot de passe</h3>
                                        <form onSubmit={Save}>
                                            <div className="form-floating mb-3"
                                                onMouseLeave={(e) => setShowEye1(false)}
                                                onMouseEnter={(e) => { if (password.trim() != "") setShowEye1(true) }}>
                                                <input
                                                    type={type1}
                                                    className="form-control passInput"
                                                    onChange={handleChange1}
                                                    placeholder="Password" />
                                                <label htmlFor="floatingPassword">Password</label>
                                                {showEye1 ? <i onClick={Eye1} className={`fa ${eye1 ? "fa-eye-slash" : "fa-eye"}`}></i> : null}
                                            </div>

                                            <div className="form-floating mb-3" onMouseLeave={(e) => setShowEye2(false)}
                                                onMouseEnter={(e) => { if (passwordConfirm.trim() != "") setShowEye2(true) }}>
                                                <input
                                                    type={type2}
                                                   
                                                    className="form-control passInput"
                                                    onChange={handleChange2}
                                                    placeholder="Password" />
                                                <label htmlFor="floatingPassword">Confirm Password</label>
                                                {showEye2 ? <i onClick={Eye2} className={`fa ${eye2 ? "fa-eye-slash" : "fa-eye"}`}></i> : null}
                                            </div>
                                            <div className='comment'>
                                                {passMatched ?
                                                    null :
                                                    <span className='red' >Not matched Passwords Please check</span>
                                                }
                                                {passValid ? null : <span className='yellow'>Weak password, please try with strong one
                                                    try to use numbers(0123..) and symboles(!@%...)</span>}
                                            </div>
                                            <div className="d-grid">
                                                <div className="row" >
                                                    <div className="col">
                                                        <button className="btn btn-lg btn-dark btn-login text-uppercase fw-bold mb-2"
                                                            type="submit" onClick={() => (setCancel(1), setSave(0))}>
                                                            Annuler
                                                        </button>
                                                    </div>
                                                    <div className="col">
                                                        <button className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-2"
                                                            onClick={() => (setCancel(0), setSave(1))}
                                                            type="submit">Save</button>
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