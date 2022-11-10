import { useState , useEffect} from 'react';
import {  useNavigate } from "react-router-dom";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export function Login() {
  return (

    <LoginComponent />

  );
}

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setSubmitting] = useState();
  const [eye, seteye] = useState(true);
  const [type, settype] = useState("password");
  const [showEye, setShowEye] = useState(false);

  useEffect(()=>{
    let token = localStorage.getItem("loginToken");

    if (token) {
      navigate(`/home`);
    }
    else
    {
      navigate(`/`);
    }
  })
  function ForgetPassword() {
    window.location.href = '/forgetpassword'
  }


  async function SignIn(event) {
    event.preventDefault()
    setSubmitting(true);

    if (email.trim() != "" && password.trim() != "") {
      const response = await fetch('http://localhost:1337/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await response.json()

      if (data.status && data.token) {
        localStorage.setItem('loginToken', data.token)
        navigate('/template');
      } else {
        Swal.fire({
          timer: 3000,
          text: "Your email or password is invalid please check",
          type: 'warning',
        })
      }
    }
    else
    {
      Swal.fire({
        text: "You should enter your email and password",
        type: 'error',
      })
    }
    

    setSubmitting(false);
  }
  const Eye = () => {
  
    if (type == "password") {

        seteye(false);
        settype("text");
    }
    else {

        seteye(true);
        settype("password");
    }
}
function handleChange(event)
{
  setPassword(event.target.value);
  if(event.target.value.trim().length==0)
  {
    setShowEye(false); return;
  }
  setShowEye(true);
}

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6" id="login">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Welcome back!</h3>
                  <form onSubmit={SignIn}>
                    <div className="form-floating mb-3">
                      <input type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                   
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3" 
                        onMouseLeave={(e)=> setShowEye(false)}
                        onMouseEnter={(e)=> {if(password.trim()!="" )setShowEye(true)} }>
                      <input
                        type={type}
                        className="form-control"
                        onChange={handleChange}
                        id="floatingPassword" placeholder="Password" />
                      <label htmlFor="floatingPassword">Password</label>
                      {showEye ? <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>:null}
                    </div>

                    <div className="d-grid">
                      <button disabled={isSubmitting} className="btn btn-lg btn-dark btn-login text-uppercase fw-bold mb-2" type="submit">
                        {isSubmitting && (
                          <span className="spinner-border spinner-border-sm" id="spinner_login"></span>

                        )}
                        {isSubmitting ? " Loading" : "Sign in"}

                      </button>
                      <div className="text-center">
                        <a className="small text-dark" href="#" onClick={ForgetPassword}>Forgot password?</a>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
