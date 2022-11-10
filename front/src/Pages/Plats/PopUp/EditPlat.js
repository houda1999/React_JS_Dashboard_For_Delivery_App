import React, { ReactDOM, useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from "react-router-dom";

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal, Spin,Select
} from 'antd';
import "antd/dist/antd.css";
import upload from '../../../images/upload.png';
import axios from "axios";
import Swal from 'sweetalert2';
import { storage, default as firebase } from '../../../Firebase/index';
import { textAlign } from '@mui/system';
const { Option } = Select;

function ModifyPlatPopUp(props) {

    const { visible3, setVisible3, dataPlat ,modifyData} = props;


    return (
        <>
            <Modal
                closable={false}
                centered
                visible={visible3}
                width={'70%'}
                height = {'70%'}
                footer={null}
                title="Modifier Plat"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <ModifyPlatForm
                    visible2={visible3} setVisible2={setVisible3} modifyData={modifyData}
                    dataPlat={dataPlat} />
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
function ModifyPlatForm(props) {

    const { id } = useParams();
    const { visible2, setVisible2, dataPlat ,modifyData} = props;
    const [name1, setName1] = useState('');
    const [price1, setPrice1] = useState('');
    const [categorie1, setCategorie1] = useState(dataPlat[0].categorie);
    const [photo1, setPhoto1] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();
    const [uploaded, setUploaded] = useState(false);
    const [displayed, setDisplayed] = useState(true);
    const [showProgress, setShowProgress] = useState(false);
    const [showError, setShowError] = useState(false);
    const [dataEdit, setDataEdit] = useState(dataPlat[0]);
    const [closed, setClosed] = useState(false);
    const [categorieList, setCategorieList] = useState([]);
    const[selectedCat,setSelectedCat] = useState('');
    const idPlat = dataPlat[0].id;

    useEffect(() => {
   
        if (!closed)
            setDataEdit(dataPlat[0]);

        if (dataEdit != null) {
            if (closed) {
                setPhoto1('');

            }
            else {
                setPhoto1(dataEdit.photo);
            }

         
            setName1(dataEdit.name);
            setCategorie1(dataEdit.categorie);
            setPrice1(dataEdit.price.toString());
            getCategories()
            setSelectedCat(categorie1)
       
        }
        else {
            setClosed(false);
        }
        
     
    }, [dataPlat, dataEdit]);


    async function Save(e) {
        e.preventDefault();
        if ( name1.trim().length != 0
            && price1.trim().length != 0
            && photo1 != null) {

            setSubmitting(true);
            axios.post(`http://localhost:1337/update_plat`, {name1,price1,photo1,selectedCat,idPlat,id })
                .then(res => {
                    if (res.data.updated== true) {

                        Swal.fire({
                            timer: 3000,
                            text: "Plat modifie avec success",
                            type: 'success',
                        })
                        setVisible2(false);

                        let item = {
                            key: res.data.obj.id,
                            name: res.data.obj.name,
                            price: res.data.obj.price,
                            categorie: res.data.obj.categorie,
                            photo: res.data.obj.photo,
                         
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
        setName1('');
        setCategorie1('');
        setPrice1('');

        setUploaded(false);
        setDisplayed(true);
        setShowProgress(false);
        setShowError(false);
        setClosed(true);
        setDataEdit(null);
        setVisible2(false);

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

            if(categorieList.length == 0)
            setCategorieList(results);

        }
    }
    const handleChangeSelect = (value) =>
    {
        setSelectedCat(value)
    }

    const handleChange = async(e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            let image= e.target.files[0];
            setDisplayed(false);
            const uploadTask = storage.ref(`plats/${image.name}`).put(image);
            setShowProgress(true);
            uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {

                storage.ref('plats').child(image.name).getDownloadURL().then(url => {
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
                                       
                                            <div style={{ width: '100%', height: "250px", overflow: 'hidden', marginBottom: '1em' }}>
                                                {photo1 ?<img style={{ backgroundSize: 'cover', width: '100%', height: '80%' }}
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
                                                value={name1}
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
                                                    id="floatingPr"
                                                    value={price1}
                                                    placeholder="Price"
                                                     />
                                                <label htmlFor="floatingPr" className="label-input">Price</label>

                                            </div>
                                        </div>
                                       
                                        <div className='row'>
                                            <div className="form-floating mb-3" >

                                                <Select
                                                    placeholder="Select a Categorie"
                                                    optionFilterProp="children"
                                                    value={selectedCat}
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
export default ModifyPlatPopUp;