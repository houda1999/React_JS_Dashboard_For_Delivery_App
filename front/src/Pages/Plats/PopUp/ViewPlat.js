import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal
} from 'antd';
import "antd/dist/antd.css";



function ViewPlat(props) {

    const { visible, setVisible, viewData } = props;

    useEffect(() => {

    }, [viewData]);


    return (
        <>
            <Modal
                closable={false}
                centered
                visible={visible}
                width={'50%'}
              
                footer={null}
                title="Voir les informations d'un plat"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <PlatData setVisible={setVisible}
                    viewData={viewData} />
            </Modal>
        </>
    );

}

export function PlatData(props) {

    const { setVisible, viewData } = props;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categorie, setCategorie] = useState('');
    const [photo, setPhoto] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [dataEdit, setDataEdit] = useState(viewData[0]);
    const [closed, setClosed] = useState(false);

    useEffect(() => {
        if (!closed)
            setDataEdit(viewData[0]);

        if (dataEdit != null) {
            if (closed) {
                setPhoto('');

            }
            else {
                setPhoto(dataEdit.photo);
            }

            setName(dataEdit.name);
            setPrice(dataEdit.price);
            setCategorie(dataEdit.categorie);
            setRestaurant(dataEdit.restaurant);

        }
        else {
            setClosed(false);
        }
    }, [viewData, dataEdit]);




    async function Close(event) {
        event.preventDefault();
        setClosed(true);
        setVisible(false);
        setDataEdit(null);
    }

    return (
        <div className="container-fluid ps-md-0">

            <div className="row">

                <div className="col-md-12 col-lg-12">
                
                        <div className="d-grid">

                            <div className="row">
                                <div className='col'>
                                    <div className="row mb-5" >
                                        <img src={photo} style={{ width: '100%' }} />
                                    </div>
                                </div>
                                <div className='col mt-5'>
                                    <div className="row mb-3" >
                                        <div className="col">
                                            <span className='label'>Nom Plat : </span>
                                        </div>
                                        <div className="col">
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-3" >
                                        <div className="col">
                                            <span className='label'>Nom Restaurant : </span>
                                        </div>
                                        <div className="col">
                                            <span>{restaurant}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-3" >
                                        <div className="col">
                                            <span className='label'>Prix  : </span>
                                        </div>
                                        <div className="col">
                                            <span>{price}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-5" >
                                        <div className="col">
                                            <span className='label'>Categorie : </span>
                                        </div>
                                        <div className="col">
                                            <span>{categorie}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='div-btn'>
                                <button onClick={Close} className='btn btn-lg btn-dark btn-login close-btn  mb-2'>Close</button>
                            </div>
                        </div>
                     
                </div>

            </div>

        </div>
    );

}
export default ViewPlat;