import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal
} from 'antd';
import "antd/dist/antd.css";
import "../Client/PopUp/ViewClient.css";



function ViewCommand(props) {

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
    const [client, setClient] = useState('');
    const [livreur, setLivreur] = useState('');
    const [nbCom, setNbCom] = useState('');
    const [total, setTotal] = useState('');
    const [dateCom, setDateCom] = useState('');
    const [dataEdit, setDataEdit] = useState(viewData[0]);

    useEffect(() => {
        setDataEdit(viewData[0])
        console.log(dataEdit)
        if (dataEdit != null) {
            setClient(dataEdit.client);
            setLivreur(dataEdit.livreur);
            setDateCom(dataEdit.date_commande);

        }

    }, [viewData, dataEdit]);


    async function  getDataCommand()
    {

    }

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
                            <span className='label'>Client : </span>
                            </div>
                            <div className="col">
                            <span>{client}</span>
                            </div>
                        </div>
                        <div className="row mb-3" >
                            <div className="col">
                            <span className='label'>Livreur : </span>
                            </div>
                            <div className="col">
                            <span>{livreur}</span>
                            </div>
                        </div>
                        <div className="row mb-3" >
                            <div className="col">
                            <span className='label'>Date Commande: </span>
                            </div>
                            <div className="col">
                            <span>{dateCom}</span>
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
export default ViewCommand;