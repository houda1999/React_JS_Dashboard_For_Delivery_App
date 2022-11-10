import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css';
import { Select } from 'antd';
import { Popup, ModifyPassword } from "./PopUp/PopUp";
import { storage, default as firebase } from '../../Firebase/index';
import profile from '../../assets/image/profile.png';
import {
  Spin
} from 'antd';
import axios from "axios";
import Swal from 'sweetalert2';

const { Option } = Select;
export default function SettingsComponent() {
  
  const [modify, setModify] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [file, setFile] = useState([]);
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [showProgress, setShowProgress] = useState(false);

  useEffect(()=>{
    setName(localStorage.getItem("name")) 
    setPhoto(localStorage.getItem("photo"))
    setEmail(localStorage.getItem("email"))
    setPhone(localStorage.getItem("phone"))
  },[name,photo,email,phone])


  async function Edit(event) {
    event.preventDefault();
    setModify(false);
  }
  async function Save(event) {
    event.preventDefault();
    if(name.trim().length!=0
     && phone.trim().length!=0
     && email.trim().length!=0
     && photo != null
    )
    axios.post(`http://localhost:1337/update_admin`, { name,phone,photo,email })
                .then(res => {
                    if (res.data.updated == true) {

                        Swal.fire({
                            timer: 3000,
                            text: "Profil modifiee avec success",
                            type: 'success',
                        })
                  
                    }
                    else if (res.data.updated == false) {
                        Swal.fire({
                            timer: 3000,
                            text: "Problem in connexion please retry",
                            type: 'error',
                        })
                    }
                 

                })
  }
  async function popUpChange(event) {
    setOpenPopup(true);
  }

  async function UploadImage(e) {
    if (e.target.files[0]) {
      let image = e.target.files[0];
      setShowProgress(true);
      const uploadTask = storage.ref(`users/${image.name}`).put(image);

      uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
          console.log(error);
        },
        () => {

          storage.ref('users').child(image.name).getDownloadURL().then(url => {
            setPhoto(url);
            setShowProgress(false);
          })
        });
    }
  }

  return (
    <div className="container rounded bg-white mt-5 mb-5 principal">
      <div className="row ">
        <div className="col-md-6 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            {photo ? <img className="rounded-circle mt-5" width="150px" height="150px" src={photo} />
              : <img className="rounded-circle mt-5" width="150px" height="150px" src={profile} />
            }
            <span className="font-weight-bold" style={{ marginTop: '1em' }} >
              <label onChange={UploadImage} htmlFor="fileInput" style={{marginRight:'10px'}}>
                <input type="file" id="fileInput" hidden />
                Edit Photo
              </label>
              {showProgress ?
                <Spin  /> : ''
              }
            </span>
            <button className="btn  btn-warning modify-button" onClick={popUpChange}
              type="button">Modify Password</button>
          </div>
        </div>
        <div className="col-md-6 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Modify Informations</h4>
            </div>
            <div className="row mt-2">

            </div>
            <div className="row mt-3">
              <div className="col-md-12 form-floating">
                <input type="text" defaultValue={name} 
                onChange = {(e)=>setName(e.target.value)}
                className="form-control edit-input" id="floatingInput" placeholder="First Name" disabled={modify} />
                <label htmlFor="floatingInput" className="label-input"> Full Name</label>
              </div>
              <div className="form-floating col-md-12">
                <input type="text" defaultValue={email}  
                onChange = {(e)=>setEmail(e.target.value)}
                className="form-control edit-input" id="floatingInput" placeholder="Email" disabled={modify} />
                <label htmlFor="floatingInput" className="label-input">Email</label>
              </div>
              <div className="form-floating col-md-12">
                <input type="tel"  
                defaultValue={phone} 
                onChange = {(e)=>setPhone(e.target.value)}
                className="form-control edit-input" id="floatingInput" placeholder="mobile number" disabled={modify} />
                <label htmlFor="floatingInput" className="label-input">Phone Number</label>
              </div>
            </div>
            <div className="row text-center">
              <div className="col">
                <button className="btn btn-dark  profile-button save-button" onClick={Edit} type="button">Edit</button>
              </div>
              <div className="col">
                <button className="btn btn-warning profile-button save-button" onClick={Save} type="button">Save</button>
              </div>
            </div>
          </div>
        </div>
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <ModifyPassword
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          />
        </Popup>
      </div>

    </div>

  )
}