import React, { useState, useEffect } from 'react';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal
} from 'antd';
import "antd/dist/antd.css";
import './AddPopUp.css';
import axios from "axios";
import Swal from 'sweetalert2';

function AddLivreurPopUp(props) {

    const { visible2, setVisible2 } = props;


    return (
        <>
            <Modal
                closable={false}
                centered
                visible={visible2}
                width={'50%'}
                height={'50%'}
                footer={null}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <AddLivreurForm visible2={visible2} setVisible2={setVisible2} />
            </Modal>
        </>
    );

}

function AddLivreurForm(props) {

    const { visible2, setVisible2 } = props;
    const [fullName1, setFullName1] = useState('');
    const [userName1, setUserName1] = useState('');
    const [cin1, setCin1] = useState('');
    const [password1, setPassword1] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    async function Save(e) {
        e.preventDefault();
        if(fullName1.trim().length != 0 && userName1.trim().length != 0 && password1.trim().length != 0 && cin1.trim().length != 0)
        {
            setSubmitting(true);
            axios.post(`http://localhost:1337/add_new_livreur`, { fullName1, userName1, password1, cin1 })
            .then(res => {
                if (res.data.added == true) {
                    Swal.fire({
                        timer: 3000,
                        text: "Livreur ajoute avec success",
                        type: 'success',
                    })
                    setVisible2(false);
                }
                else if (res.data.added == false) {
                    Swal.fire({
                        timer: 3000,
                        text: "CIN and UserName must be unique",
                        type: 'error',
                    })
                }
                setSubmitting(false);
            })
        }
        else{
            Swal.fire({
                timer: 3000,
                text: "Vous devez remplir tous les champs",
                type: 'warning',
            })
        }
        
        
    }


    async function Back(event) {
        event.preventDefault();
        setVisible2(false)
    }


    return (
        <div className="container-fluid ps-md-0">

            <div className="col-md-12 col-lg-12" id="login">
                <div className="d-flex align-items-center w-100 p-3">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12 col-lg-12">
                                <h3 className="login-heading mb-4"
                                >Ajouter un nouveau livreur</h3>
                                <form>
                                    <div className='row'>
                                        <div className="form-floating mb-3 col-md-6">
                                            <input
                                                type="text"
                                                onChange={(e) => setFullName1(e.target.value)}
                                                className="form-control"
                                                id="floatingName"
                                                placeholder="FulName" />
                                            <label htmlFor="floatingName" className="label-input">FullName</label>

                                        </div>
                                        <div className="form-floating mb-3 col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => setUserName1(e.target.value)}
                                                id="floatingUserName"
                                                placeholder="UserName" />
                                            <label htmlFor="floatingUserName" className="label-input">UserName</label>

                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="form-floating mb-3 col-md-6" >

                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => setCin1(e.target.value)}
                                                id="floatingCin"
                                                placeholder="CIN"
                                            />
                                            <label htmlFor="floatingCin" className="label-input">CIN</label>

                                        </div>
                                        <div className="form-floating mb-3 col-md-6" >
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingPassword"
                                                onChange={(e) => setPassword1(e.target.value)}
                                                placeholder="Password"
                                            />
                                            <label htmlFor="floatingPassword" className="label-input">Password</label>

                                        </div>
                                    </div>

                                    <div className='comment'>

                                    </div>
                                    <div className="d-grid">
                                        <div className="row" >
                                            <div className="col">
                                                <button className="btn btn-lg btn-dark btn-login popup-btn text-uppercase fw-bold mb-2"
                                                    type="submit" onClick={Back}>
                                                    Annuler
                                                </button>
                                            </div>
                                            <div className="col">
                                                <button disabled={isSubmitting} className="btn btn-lg btn-warning btn-login popup-btn text-uppercase fw-bold mb-2"
                                                    onClick={Save}
                                                    type="submit">
                                                    {isSubmitting && (
                                                        <span className="spinner-border spinner-border-sm" id="spinner_login"></span>

                                                    )}
                                                    {isSubmitting ? " Loading" : "Enregistrer"} </button>
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
export default AddLivreurPopUp;