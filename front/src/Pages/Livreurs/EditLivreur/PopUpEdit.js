import React, { useState,useEffect } from 'react';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal
} from 'antd';
import "antd/dist/antd.css";
import './PopUpEdit.css';
import axios from "axios";
import Swal from 'sweetalert2';



function EditLivreur(props) {

    const { visible1, setVisible1 ,editData} = props;

    useEffect(() => {
        
    }, [editData]);

    
    return (
        <>
            <Modal
                closable={false}
                centered
                visible={visible1}
                width={800}
                footer={null}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <ModifyLivreur visible1={visible1} setVisible1={setVisible1} 
                 editData={editData}  />
            </Modal>
        </>
    );

}

export function ModifyLivreur(props) {

    const { setVisible1 ,editData} = props;
    const [newFullName,setNewFullName]=useState('');
    const [newUserName,setNewUserName] = useState('');
    const [cin,setCin] = useState('');
    const [city,setCity] = useState('');
    const [isSubmitting2, setSubmitting2] = useState(false);
    const [isChange, setChange] = useState(false);
    const [dataEdit,setDataEdit] = useState();

    useEffect(() => {
        setDataEdit(editData[0]);
        if(dataEdit != null)
        {
            setNewFullName(dataEdit.fullname);
            setNewUserName(dataEdit.username);
            setCin(dataEdit.cin);
            setCity(dataEdit.city);
        }
        
    }, [editData,dataEdit]);


    async function Edit(e) {
        e.preventDefault();
        console.log(isChange);
        if(isChange)
        {
        if(newFullName.trim().length !=0 && newUserName.trim().length !=0)
        {
            setSubmitting2(true);
            axios.post(`http://localhost:1337/update_livreur`, { newFullName, newUserName, cin })
            .then(res => {
                if (res.data.updated == true) {
                    Swal.fire({
                        timer: 3000,
                        text: "Livreur modifie avec success",
                        type: 'success',
                    })
                    setVisible1(false);
                }
                else if (res.data.updated == false) {
                    Swal.fire({
                        timer: 3000,
                        text: "CIN and UserName must be unique",
                        type: 'error',
                    })
                }
                setSubmitting2(false);
                setChange(false);
            })
        }
        else{
            Swal.fire({
                timer: 3000,
                text: "Nom ou Username ne peuvent pas etre vides",
                type: 'warning',
            })
        }
    }
        else{
            Swal.fire({
                timer: 3000,
                text: "Vous n'avez rien modifier",
                type: 'warning',
            })
        }
        
    }

    async function Back(event) {
        event.preventDefault();
        setVisible1(false);
        setDataEdit(null);
    }

    return (
        <div className="container-fluid ps-md-0">

            <div className="col-md-12 col-lg-12" id="login">
                <div className="d-flex align-items-center w-100 p-3">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12 col-lg-12">
                                <h3 className="login-heading mb-4"
                                >Modifier les informations de livreur</h3>
                                <form>
                                    <div className='row'>
                                        <div className="form-floating mb-3 col-md-6">
                                            <input
                                                value={newFullName}
                                                type="text"
                                                onChange={(e)=>{setNewFullName(e.target.value);setChange(true)}}
                                                className="form-control"
                                                id="floatingName"
                                                placeholder="FulName" />
                                            <label htmlFor="floatingName" className="label-input">FullName</label>

                                        </div>
                                        <div className="form-floating mb-3 col-md-6">
                                            <input
                                                value={newUserName}
                                                type="text"
                                                className="form-control"
                                                onChange={(e)=>{setNewUserName(e.target.value);setChange(true)}}
                                                id="floatingUserName"
                                                placeholder="UserName" />
                                            <label htmlFor="floatingUserName" className="label-input">UserName</label>

                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="form-floating mb-3 col-md-6">
                                            <input
                                                value={cin}
                                                type="text"
                                                readOnly={true}
                                                className="form-control"
                                                id="floatingCin"
                                                placeholder="CIN" 
                                                disabled = {true}/>
                                            <label htmlFor="floatingCin" className="label-input">CIN</label>

                                        </div>
                                        <div className="form-floating mb-3 col-md-6">
                                            <input
                                                value={city}
                                                readOnly={true}
                                                type="text"
                                                className="form-control"
                                                id="floatingCity"
                                                placeholder="City" 
                                                disabled = {true}/>
                                            <label htmlFor="floatingCity" className="label-input">City</label>

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
                                            <button disabled={isSubmitting2} className="btn btn-lg btn-warning btn-login popup-btn text-uppercase fw-bold mb-2"
                                                    onClick={Edit}
                                                    type="submit">
                                                    {isSubmitting2 && (
                                                        <span className="spinner-border spinner-border-sm" id="spinner_login"></span>

                                                    )}
                                                    {isSubmitting2 ? " Loading" : "Enregistrer"} </button>
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
export default EditLivreur;