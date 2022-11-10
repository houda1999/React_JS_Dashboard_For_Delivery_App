import React, { ReactDOM, useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal, Spin,
    Menu, Space, Select
} from 'antd';
import "antd/dist/antd.css";
import upload from '../../../images/upload.png';
import axios from "axios";
import Swal from 'sweetalert2';
import { storage, default as firebase } from '../../../Firebase/index';
import { textAlign } from '@mui/system';
const { Option } = Select;
function AddPlatPopUp(props) {

    const { visible2, setVisible2, modifyData, idRes,nameRes } = props;


    return (
        <>
            <Modal
                closable={false}
                centered
                visible={visible2}
                width={'70%'}
                height={'70%'}
                footer={null}
                title="Ajouter une nouveau plat"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <AddPlatForm
                    visible2={visible2} setVisible2={setVisible2} modifyData={modifyData}
                     idRes={idRes} nameRes={nameRes} />
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
function AddPlatForm(props) {

    const { visible2, setVisible2, modifyData, idRes, nameRes } = props;
    const [name1, setName1] = useState('');
    const [price1, setPrice1] = useState('');
    const [categorie1, setCategorie1] = useState('');
    const [photo1, setPhoto1] = useState('');
    const [restaurant1, setRestaurant1] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [displayed, setDisplayed] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [showError, setShowError] = useState(false);
    const [categorieList, setCategorieList] = useState([]);
    const[selectedCat,setSelectedCat] = useState('');

    async function Save(e) {
        e.preventDefault();
        if (name1.trim().length != 0
            && price1.trim().length != 0
            && photo1 != null) {

            setSubmitting(true);
            axios.post(`http://localhost:1337/add_new_plat`, {name1,price1,idRes,photo1,selectedCat})
                .then(res => {
                    if (res.data.added == true) {

                        Swal.fire({
                            timer: 3000,
                            text: "Plat ajoute avec success",
                            type: 'success',
                        })
                        setVisible2(false);

                        let itemCat = categorieList.filter((item) => item.key == selectedCat);
                    
                        modifyData({
                            key: res.data.addObj._id,
                            name: res.data.addObj.name,
                            price: res.data.addObj.price,
                            categorie: itemCat[0]['name'],
                            photo: res.data.addObj.photo
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
        setName1('');
        setPrice1('');
        setCategorie1('');
        setRestaurant1('');
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
        console.log(file)
        e.preventDefault();
        const uploadTask = storage.ref(`plats/${file.name}`).put(file);
        setDisplayed(false);
        setShowProgress(true);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {

                storage.ref('plats').child(file.name).getDownloadURL().then(url => {
                    setShowProgress(false);
                    setPhoto1(url);
                })
            });

    }

    const getCategories = async () => {
        let response = await axios.get("http://localhost:1337/get_all_categories").then((response) => {
            return response;
        });
        let result = await response.data;

        if (result.status == true) {

            const results = await result.dataCategories.map(row => ({
                key: row._id,
                name: row.name,
            }))

            setCategorieList(results);

        }
    }

    useEffect(() => {
        getCategories()
        setRestaurant1(nameRes);
    }, [categorieList,restaurant1]);

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
                                            <div style={{ width: '100%', height: "250px", overflow: 'hidden', marginBottom: '1em' }}>
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
                                                    onChange={(e) => setName1(e.target.value)}
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
                                                    onChange={(e) => setPrice1(e.target.value)}
                                                    id="floatingPrice"
                                                    placeholder="UserName" />
                                                <label htmlFor="floatingPrice" className="label-input">Price</label>

                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="form-floating mb-3" >
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingRes"
                                                    defaultValue={restaurant1}
                                                
                                                    placeholder="Restaurant"
                                                    disabled={true}
                                                />
                                                <label htmlFor="floatingRes" className="label-input">Restaurant</label>

                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="form-floating mb-3" >

                                                <Select
                                                    placeholder="Select a Categorie"
                                                    optionFilterProp="children"
                                                    style={{ width: '100%' }}
                                                    onChange={handleChangeSelect}
                                                >
                                                    
                                                    {categorieList.map(function (item, i) {
                                                        return <Option key={item.key} value={item.key}>{item.name}</Option>
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
export default AddPlatPopUp;