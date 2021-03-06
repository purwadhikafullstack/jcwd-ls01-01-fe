import React, {useState, useEffect} from 'react';
import './Confirmation.css';
import Axios from 'axios'
import API_URL from "../../../Helpers/API_URL.js"
import Sorry from "../../../Assets/Sorry.svg"
import Welcome from "../../../Assets/Welcome.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, Navigate, Link } from 'react-router-dom'
import FooterMobile from '../../../Components/User/Footer/FooterMobile.jsx'

// SweetAlert
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
})

const Confirmation = () => {
  const [isRedirect, setIsRedirect] = useState(false)

  let params = useParams();

  const [message, setMessage] = useState('')

  useEffect(() => {
      Confirmation()
  }, [])

  const Confirmation = () => {
    Axios.patch(`${API_URL}/user/confirmation`, {}, {headers: {
        'Authorization': params.token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }})
    .then((res) => {
        Toast.fire({
            icon: 'success',
            title: res.data.message
        })
        setIsRedirect(true)
        localStorage.setItem('myTkn', params.token)
    })
    .catch((err) => {
        setMessage(err.response.data.message)
        Toast.fire({
            icon: 'error',
            title: err.response.data.message
        })
    })
}

if(isRedirect){
    return(  
        <Navigate to='/' />
    )
}

  return (
    <>
   <div className='container-confirmation'>
         <div className="d-lg-none d-md-none d-block navbar-pro">
         <Link to={localStorage.getItem('myTkn') ? "/" : "/login"} style={{textDecoration: "none"}}>
         <div className="logo-to-homepage"><FontAwesomeIcon icon={faAngleLeft} /></div>
                </Link>
           
            <div className="tulisan-confirmation">Confirmation</div>
        </div>
        <div>
        {
            message ? 
            <div className='box-confirmation-page' >
                <div><img src={Sorry} alt=""  className="logo-confirmation-page"/></div>
                <h1 className="tulisan-welcome">{message}</h1>
                <br/>
                <Link to={localStorage.getItem('myTkn') ? "/" : "/login"} style={{textDecoration: "none"}}>
                    <h4 className="tulisan-redirect">Kembali ke home</h4>
                </Link>
                
            </div>
                : 
            <div className='box-confirmation-page'>
                <div><img src={Welcome} alt="" className="logo-verify-page-2"/></div>
                <div className="tulisan-welcome-2">Selamat Datang di Apotakecare!</div>
                <div className="tulisan-redirect-2">Anda akan diarahkan menuju homepage. Nikmati setiap moment bersama kami ~</div>
            </div>
        }
        </div>
   </div>
   <FooterMobile/>
   </>
  );
};

export default Confirmation;
