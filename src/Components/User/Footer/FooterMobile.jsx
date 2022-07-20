import React from 'react';
import './Footer.css';
import logo from './../../../Assets/logo.svg';
import fb from './../../../Assets/fb.svg';
import ig from './../../../Assets/ig.svg';
import twitter from './../../../Assets/twitter.svg';
import wa from './../../../Assets/Whatsapp.png';
import email from './../../../Assets/email.svg';
import call from './../../../Assets/call.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate  } from 'react-router-dom';
import { faUser, faHome, faPills, faReceipt, faHeadset } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const navigate = useNavigate()

  return (
   <>     
    <div className="d-lg-none d-md-none d-block">
      <div className='container-footer-mobile'>
        <div className="container-inside-footer-mobile">
          <div className="beranda-footer"  onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faHome} className="mb-2 mx-3" />
           Beranda
          </div>
           <div className="beranda-footer">
          <FontAwesomeIcon icon={faPills} className="mb-2 mx-3"  />
           Kategori
          </div>
          <div className="beranda-footer" onClick={() => navigate('/semuapesanan')}>
          <FontAwesomeIcon icon={faReceipt} className="mb-2 mx-4"  />
           Transaksi
          </div>
          <div className="beranda-footer">
          <FontAwesomeIcon icon={faHeadset} className="mb-2 mx-3"  />
           Bantuan
          </div>
          <div className="beranda-footer" onClick={() => navigate('/profile')}>
          <FontAwesomeIcon icon={faUser} className="mb-2 mx-3"  />
           Profile
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default Footer;