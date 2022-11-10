import React, { ReactDOM, useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { cities } from "../../../resources/city";
import { Select } from 'antd';

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

const { Option } = Select;
function AddRestaurantPopUp(props) {

    const { visible2, setVisible2, modifyData } = props;


    return (
        <>
            <Modal
                closable={false}
                centered
                visible={visible2}
                width={'70%'}
                footer={null}
                title="Ajouter une nouvelle Restaurant"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <AddRestaurantForm
                    visible2={visible2} setVisible2={setVisible2} modifyData={modifyData} />
            </Modal>
        </>
    );

}

const useStyles = createUseStyles({
    image: {
        border: '1px dotted #ced4da',
        borderRadius: '3px',
        width: '90%',
        height: '95%',
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
    uplaod: {
        display: 'block',
        color: "#373a47",
        textDecoration: 'underline',
        cursor: 'pointer',
        border: 'none',
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
    succesText:
    {
        fontWeight: 'bold',
        color: '#22bb33',
        fontSize: '16px'
    },
    errorComment:
    {
        color: '#dc143c',
        fontWeight: 'bold',
        fontSize: '16px',
        marginBottom: '1em'

    }

});
function AddRestaurantForm(props) {

    const { visible2, setVisible2, modifyData } = props;
    const [nom1, setNom1] = useState('');
    const [adresse1, setAdresse1] = useState('');
    const [phone1, setPhone1] = useState('');
    const [photo1, setPhoto1] = useState('');
    const [city1, setCity1] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [displayed, setDisplayed] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [progressValue, setProgresValue] = useState(0);
    const [showError, setShowError] = useState(false);
    const[selectedCat,setSelectedCat] = useState('');


    async function Save(e) {
        e.preventDefault();
        setCity1(selectedCat)
        if (nom1.trim().length != 0
            && adresse1.trim().length != 0
            && city1.trim().length != 0
            && photo1 != null
            && phone1.trim().length != 0) {

            setSubmitting(true);
            axios.post(`http://localhost:1337/add_new_restaurant`, { nom1, adresse1, phone1, city1, photo1 })
                .then(res => {
                    if (res.data.added == true) {

                        Swal.fire({
                            timer: 3000,
                            text: "Restaurant ajoute avec success",
                            type: 'success',
                        })
                        setVisible2(false);

                        modifyData({
                            key: res.data.addObj._id,
                            name: res.data.addObj.name,
                            adresse: res.data.addObj.adresse,
                            tele: res.data.addObj.tele,
                            photo: res.data.addObj.photo,
                            city: res.data.addObj.city
                        })
                    }
                    else if (res.data.added == false) {
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
        setDisplayed(false);
        setShowError(false);
        setVisible2(false);


    }


    const handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setFile(image);
            setUploaded(true);
            setDisplayed(true);
        }
    }
    const handleUpload = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`restauraunts/${file.name}`).put(file);
        setDisplayed(false);
        setShowProgress(true);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {

                storage.ref('restauraunts').child(file.name).getDownloadURL().then(url => {
                    setShowProgress(false);
                    setPhoto1(url);
                })
            });

    }


    const handleChangeSelect = (value) =>
    {
        setSelectedCat(value)
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
                                        {photo1 ?
                                            <div style={{ width: '100%', height: "94%", overflow: 'hidden', marginBottom: '1em' }}>
                                                <img style={{ backgroundSize: 'cover', width: '100%', height: '100%' }}
                                                    src={photo1} />
                                            </div>
                                            :
                                            <div className={classes.image}>
                                                <label onChange={handleChange} htmlFor="fileInput">
                                                    <input type="file" id="fileInput" className={classes.input} hidden />
                                                    {!uploaded ? <span className={classes.uplaod}>Upload Image</span> : ''}
                                                    {displayed ? <span className={classes.succesText}>Image uploaded to display it click here</span>
                                                        : ''}

                                                </label>
                                                {displayed ?
                                                    <button type="button" onClick={handleUpload}
                                                        className={classes.display}>
                                                        Display image
                                                    </button>
                                                    : ''
                                                }
                                                {showProgress ?
                                                    <Spin tip="Loading..." /> : ''
                                                }


                                            </div>
                                        }
                                    </div>

                                    <div className='col'>
                                        <div className='row'>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setNom1(e.target.value)}
                                                    className="form-control"

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
                                                    placeholder="UserName" />
                                                <label htmlFor="floatingAddr" className="label-input">Adresse</label>

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
                                                />
                                                <label htmlFor="floatingPassword" className="label-input">Phone</label>

                                            </div>
                                        </div>

                                        <div className='row'>
                                        <div className="form-floating mb-3" >
                                            <Select
                                                showSearch
                                                placeholder="Select a city"
                                                onChange={handleChangeSelect}
                                                style={{
                                                    width: '100%', marginBottom: '1em'
                                                }}
                                                size='large'
                                               
                                            >
                                                {cities.map(function (item, i) {
                                                    return <Option key={item.city} value={item.city}>{item.city}</Option>
                                                })}
                                            </Select>
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
export default AddRestaurantPopUp;