import React, { useEffect, useState } from 'react';
import './PopUp.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';

import {
    Modal
} from 'antd';



export function Popup(props) {

    const { title,  openPopup, setOpenPopup } = props;

    return (
        <>
            <Modal
                closable={false}
                centered
                visible={openPopup}
                width={'50%'}
                footer={null}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <ModifyPassword openPopup={openPopup} setOpenPopup={setOpenPopup} />
            </Modal>
        </>
    );
}




export function ModifyPassword(props) {

    const {openPopup, setOpenPopup } = props;
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




    });
    async function Save(e) {

        e.preventDefault();




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
        setOpenPopup(false)
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
        if (event.target.value.trim().length == 0 && passwordConfirm.trim().length == 0) {
            setPassValid(true);
            setPassMatched(true);
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
            setPassMatched(false);
        if (event.target.value.trim().length == 0 && password.trim().length == 0) {
            setPassMatched(true);
            setPassValid(true);
        }



    }


    return (
        <div className="container-fluid ps-md-0">

            <div className="col-md-12 col-lg-12" id="login">
                <div className="d-flex align-items-center w-100 p-3">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12 col-lg-12">
                                <h3 className="login-heading mb-4"
                                >Reinistialiser votre mot de passe</h3>
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
                                                <button className="btn btn-lg btn-dark btn-login  popup-btn text-uppercase fw-bold mb-2"
                                                    type="submit" onClick={Back}>
                                                    Annuler
                                                </button>
                                            </div>
                                            <div className="col">
                                                <button className="btn btn-lg btn-warning btn-login popup-btn text-uppercase fw-bold mb-2"
                                                    onClick={() => (setCancel(0), setSave(1))}
                                                    type="submit">Save</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );

}