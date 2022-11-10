import React from "react";
import { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers,faMotorcycle,faStore,faFile} from '@fortawesome/fontawesome-free-solid'
import './Styles/dashboard.css';
import ChartBar from "./BarChat";
import CompenentChart from "./CompenentChart";
import axios from "axios";

function DashboardComponent() {
  
    const [nbClient,setnbClient] = useState(0);
    const [nbliv,setnbLiv] = useState(0);
    const [nbRes,setnbRes] = useState(0);
    const [nbComm,setnbComm] = useState(0);

    useEffect(() => {
        getData()
    }, [nbClient,nbliv,nbRes,nbComm]);

    async function getData()
    {
        axios.get('http://localhost:1337/get_number_client')
              .then(res => {
                   if(res.data.count)
                    setnbClient(res.data.count)
        })

        axios.get('http://localhost:1337/get_number_livreur')
              .then(res => {
                   if(res.data.count)
                    setnbLiv(res.data.count)
        })
        axios.get('http://localhost:1337/get_number_restaurant')
              .then(res => {
                   if(res.data.count)
                    setnbRes(res.data.count)
        })
        axios.get('http://localhost:1337/get_number_commande')
              .then(res => {
                   if(res.data.count)
                    setnbComm(res.data.count)
        })
    }
    
    return (
        <div className="bg-default" >
            <div className="main-content">
                <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
                    <div className="container-fluid">
                        <div className="header-body">
                            <div className="row">
                                <div className="col-xl-3 col-lg-6">
                                    <div className="card card-stats mb-4 mb-xl-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="card-title text-uppercase text-muted mb-0">Clients</h5>
                                                    <span className="h2 font-weight-bold mb-0">{nbClient}</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                        <i><FontAwesomeIcon icon={faUsers}/></i>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6">
                                    <div className="card card-stats mb-4 mb-xl-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="card-title text-uppercase text-muted mb-0">Livreurs</h5>
                                                    <span className="h2 font-weight-bold mb-0">{nbliv}</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <i><FontAwesomeIcon icon={faMotorcycle}/></i>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6">
                                    <div className="card card-stats mb-4 mb-xl-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="card-title text-uppercase text-muted mb-0">Restaurants</h5>
                                                    <span className="h2 font-weight-bold mb-0">{nbRes}</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                        <i><FontAwesomeIcon icon={faStore}/></i>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6">
                                    <div className="card card-stats mb-4 mb-xl-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="card-title text-uppercase text-muted mb-0">Commandes</h5>
                                                    <span className="h2 font-weight-bold mb-0">{nbComm}</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                        <i><FontAwesomeIcon icon={faFile}/></i>
                                                    </div>
                                                </div>
                                            </div>
                                         
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ChartBar/>
                        <CompenentChart/>
                    </div>
                   
                </div>
                
            </div>
   
        </div>
    );
}

export default DashboardComponent;