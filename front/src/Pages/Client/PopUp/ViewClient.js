import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal
} from 'antd';
import "antd/dist/antd.css";
import "./ViewClient.css";



function ViewClient(props) {

    const { visible2, setVisible2, viewData } = props;

    useEffect(() => {

    }, [viewData]);


    return (
        <>
            <Modal
                closable={false}
                centered
                visible={visible2}
                width={800}
                footer={null}
                title = "Voir les informations du client"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <ClientData visible2={visible2} setVisible2={setVisible2}
                    viewData={viewData} />
            </Modal>
        </>
    );

}

export function ClientData(props) {

    const { setVisible2, viewData } = props;
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [activated, setActivated] = useState('');
    const [city, setCity] = useState('');
    const [dataEdit, setDataEdit] = useState();

    useEffect(() => {
        setDataEdit(viewData[0]);
        if (dataEdit != null) {
            setNom(dataEdit.name);
            setEmail(dataEdit.email);
            setActivated(dataEdit.activated);
            setCity(dataEdit.city);
        }

    }, [viewData, dataEdit]);




    async function Close(event) {
        event.preventDefault();
        setVisible2(false);
        setDataEdit(null);
    }

    return (
        <div className="container-fluid ps-md-0">

            <div className="row">

                <div className="col-md-12 col-lg-12">
        
                    <div className="d-grid">
                        <div className="row mb-3" >
                            <div className="col">
                            <span className='label'>Nom Complet : </span>
                            </div>
                            <div className="col">
                            <span>{nom}</span>
                            </div>
                        </div>
                        <div className="row mb-3" >
                            <div className="col">
                            <span className='label'>Email : </span>
                            </div>
                            <div className="col">
                            <span>{email}</span>
                            </div>
                        </div>
                        <div className="row mb-3" >
                            <div className="col">
                            <span className='label'>City : </span>
                            </div>
                            <div className="col">
                            <span>{city?city:'empty'}</span>
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
export default ViewClient;