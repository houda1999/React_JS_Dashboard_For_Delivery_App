import React, { ReactDOM, useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal, Spin
} from 'antd';
import "antd/dist/antd.css";
import upload from '../../../images/upload.png';
import axios from "axios";
import Swal from 'sweetalert2';
import { storage, default as firebase } from '../../../Firebase/index';
import { textAlign } from '@mui/system';


function ModifyRestaurantPopUp(props) {

    const { visible3, setVisible3, dataRes,modifyData } = props;


    return (
        <>
            <Modal
                closable={false}
                centered
                visible={visible3}
                width={'70%'}
                height = {'70%'}
                footer={null}
                title="Modifier Restaurant"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <ModifyRestaurantForm
                    visible2={visible3} setVisible2={setVisible3} dataRes={dataRes} modifyData={modifyData}/>
            </Modal>
        </>
    );

}

const useStyles = createUseStyles({
    image: {
        border: '1px dotted #ced4da',
        borderRadius: '3px',
        width: '90%',
        height: '85%',
        display: 'block',
        textAlign: 'center',
        paddingTop: '35%'
    },
    input: {
        border: 'none',
        display: 'none'
    },
    buttonPop:
    {
        width: '50%'
    },
    upload: {
        display: 'block',
        color: "#373a47",
        textAlign: 'center',
        width: '100%',
        textDecoration: 'underline',
        cursor: 'pointer',
        border: 'none',
        height: '10%',
        marginTop: '1em',
        backgroundColor: '#fff',
        fontSize: '16px'
    },
    display:
    {
        color: "#373a47 !important",
        textDecoration: 'underline',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: '16px'
    },
    errorComment:
    {
        color: '#dc143c',
        fontWeight: 'bold',
        fontSize: '16px',
        marginBottom: '1em'

    },
    loading:
    {
    
        display: 'block',
        textAlign: 'center',
        width: '100%',
        height: '13%',
        marginTop: '1em',
        backgroundColor: '#fff',
    }

});
function ModifyRestaurantForm(props) {

    const { visible2, setVisible2, dataRes,modifyData } = props;
    const [nom1, setNom1] = useState('');
    const [adresse1, setAdresse1] = useState('');
    const [phone1, setPhone1] = useState('');
    const [photo1, setPhoto1] = useState('');
    const [city1, setCity1] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();
    const [uploaded, setUploaded] = useState(false);
    const [displayed, setDisplayed] = useState(true);
    const [showProgress, setShowProgress] = useState(false);
    const [showError, setShowError] = useState(false);
    const [dataEdit, setDataEdit] = useState(dataRes[0]);
    const [closed, setClosed] = useState(false);
    const id = dataRes[0].id;

    useEffect(() => {
        if (!closed)
            setDataEdit(dataRes[0]);

        if (dataEdit != null) {
            if (closed) {
                setPhoto1('');

            }
            else {
                setPhoto1(dataEdit.photo);
            }

            setNom1(dataEdit.name);
            setAdresse1(dataEdit.adresse);
            setPhone1(dataEdit.tele);
            setCity1(dataEdit.city);

        }
        else {
            setClosed(false);
        }
    }, [dataRes, dataEdit]);


    async function Save(e) {
        e.preventDefault();
        if (nom1.trim().length != 0
            && adresse1.trim().length != 0
            && city1.trim().length != 0
            && photo1 != null
            && phone1.trim().length != 0) {

            let tele1 = phone1;
            setSubmitting(true);
            axios.post(`http://localhost:1337/update_restaurant`, { nom1, adresse1, tele1, city1, photo1 ,id})
                .then(res => {
                    if (res.data.updated == true) {

                        Swal.fire({
                            timer: 3000,
                            text: "Restaurant modifiee avec success",
                            type: 'success',
                        })
                        setVisible2(false);
                        
                        let item = {
                            key: res.data.obj.id,
                            name: res.data.obj.name,
                            adresse: res.data.obj.adresse,
                            tele: res.data.obj.tele,
                            photo: res.data.obj.photo,
                            city: res.data.obj.city
                        }
                        modifyData(item)
                    }
                    else if (res.data.updated == false) {
                        Swal.fire({
                            timer: 3000,
                            text: "Problem in connexion please retry",
                            type: 'error',
                        })
                    }
                    setSubmitting(false);

                })
        }
        else {
            setShowError(true);
        }


    }


    async function Back(event) {
        event.preventDefault();
        setSubmitting(false);
        setPhoto1(null);
        setAdresse1('');
        setNom1('');
        setCity1('');
        setPhone1('');
        setUploaded(false);
        setDisplayed(true);
        setShowProgress(false);
        setShowError(false);
        setClosed(true);
        setDataEdit(null);

        setVisible2(false);


    }


    const handleChange = async(e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            let image= e.target.files[0];
            setDisplayed(false);
            const uploadTask = storage.ref(`restauraunts/${image.name}`).put(image);
            setShowProgress(true);
            uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {

                storage.ref('restauraunts').child(image.name).getDownloadURL().then(url => {
                    setPhoto1(url);
                    setShowProgress(false);
                    setDisplayed(true);
                })
            });

            
        }
    }


    return (
        <div className="container-fluid ps-md-0">
            <div className="col-md-12 col-lg-12">
                <div className="d-flex align-items-center w-100 p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <div className='row'>
                                    <div className='col'>
                                       
                                            <div style={{ width: '100%', height: "300px", overflow: 'hidden', marginBottom: '1em' }}>
                                                {photo1 ?<img style={{ backgroundSize: 'cover', width: '100%', height: '85%' }}
                                                    src={photo1} />:
                                                    <div className={classes.image} ></div>
                                                     
                                                    }

                                                {displayed ?
                                                    <label onChange={handleChange} htmlFor="fileInput"
                                                        className={classes.upload}>
                                                        <input type="file" id="fileInput" hidden />
                                                        Change Image
                                                    </label>
                                                    :
                                                   ''
                                                }

                                                <div>
                                                    {showProgress ?
                                                        <Spin  className={classes.loading}/> : ''
                                                    }
                                                </div>

                                            </div>
                                        
                                    </div>

                                    <div className='col'>
                                        <div className='row'>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setNom1(e.target.value)}
                                                    className="form-control"
                                                    value={nom1}
                                                    id="floatingName"
                                                    placeholder="FulName" />
                                                <label htmlFor="floatingName" className="label-input">Name</label>

                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => setAdresse1(e.target.value)}
                                                    id="floatingAddr"
                                                    value={adresse1}
                                                    placeholder="UserName" />
                                                <label htmlFor="floatingAddr" className="label-input">Adresse</label>

                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="form-floating mb-3" >

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => setCity1(e.target.value)}
                                                    id="floatingCity"
                                                    value={city1}
                                                    placeholder="CIN"
                                                />
                                                <label htmlFor="floatingCity" className="label-input">City</label>

                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className="form-floating mb-3" >
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingPhone"
                                                    onChange={(e) => setPhone1(e.target.value)}
                                                    placeholder="Password"
                                                    value={phone1}
                                                />
                                                <label htmlFor="floatingPassword" className="label-input">Phone</label>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {showError ?
                                    <div className='row'>
                                        <span className={classes.errorComment}>* Tous les champs sont obligatoires</span>
                                    </div>
                                    : ''}
                                <div className='row'>
                                    <div className="col" style={{ textAlign: "end" }}>
                                        <button className="btn btn-lg btn-dark btn-login" style={{ width: '50%' }}
                                            type="submit" onClick={Back}>
                                            Annuler
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button disabled={isSubmitting} className="btn btn-lg btn-warning btn-login"
                                            style={{ width: '50%' }}
                                            onClick={Save}
                                            type="submit">
                                            {isSubmitting && (
                                                <span className="spinner-border spinner-border-sm" id="spinner_login"></span>

                                            )}
                                            {isSubmitting ? " Loading" : "Enregistrer"} </button>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );

}
export default ModifyRestaurantPopUp;