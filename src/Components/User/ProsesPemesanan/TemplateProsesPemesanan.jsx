import React, { useState } from "react";
import './TemplateProsesPemesanan.css';
import SidebarProfile from "../../../Components/User/SidebarProfile/SidebarProfile.jsx";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Filter from '../Gambar/Filter.png';
// import Notif from '../Gambar/NOTIF.png';
// import Cart from '../Gambar/CART.png';

const TemplateProsesPemesanan  = () => {
    let [dropdownOpen, setdropdownOpen] = useState(false);
    
    return(
        <div className="container-template-proses">
        <SidebarProfile/>
            {/* TAB VERSI DEKSTOP */}
            <div className="d-md-block d-lg-block d-none">
              <div className='template-tab'>
                <div className="judul-1">Daftar Pemesanan </div>
                {/* TAB */}
                <Link to="/semuapesanan" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                    <div className="tab-semua">Semua</div>
                 </Link>
                 <Link to="/ditunggu" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-menunggu">Menunggu</div>
                 </Link>
                  <Link to="/diproses" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-diproses">Diproses</div>
                 </Link>
                 <Link to="/dikirim" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-dikirim">Dikirim</div>
                 </Link>
                 <Link to="/selesai" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-selesai">Selesai</div>
                 </Link>
                 <Link to="/dibatalkan" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-dibatalkan">Dibatalkan</div>
                 </Link>
              
                <div className="garis-batas-tab"></div>
                {/* FILTER */}
                <div className="judul-filter-jenis-obat">Jenis Obat</div>
                <div className="box-filter">
                  <div className="button-semua-obat">Semua Obat</div>
                  <div  className="button-obat-resep">Obat Resep</div>
                  <div  className="button-obat-bebas">Obat Bebas</div>
                </div>
                <div className="urutkan-filter">Urutkan</div>
                <select className='dropdown-01'>
                  <option className="isi-dropdown-01">Abjad (A-Z)</option>
                  <option className="isi-dropdown-01">Harga Termurah</option>
                  <option className="isi-dropdown-01">Harga Termahal</option>
                </select>
              </div>
            </div>

            
            {/* VERSI MOBILE */}
            <div className="d-md-none d-lg-none d-block">
                {/* TAB */}
                <div className="tab-versi-mobile">
                  <div className="daftar-pemesan-mobile">Daftar Pemesan</div>
                  <div>
                  <span className="material-icons logo-tab-mobile" >notifications</span>
                  <span className="material-icons logo-tab-mobile" >shopping_cart</span>
                  </div>
                  <div className="tab-box-mobile">
                  <Link to="/semuapesanan" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-semua-mobile">Semua</div>
                 </Link>
                 <Link to="/ditunggu" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-menunggu-mobile">Menunggu</div>
                 </Link>
                 <Link to="/diproses" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-diproses-mobile">Diproses</div>
                 </Link>
                 <Link to="/dikirim" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-dikirim-mobile">Dikirim</div>
                 </Link>
                 <Link to="/selesai" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                 <div className="tab-selesai-mobile">Selesai</div>
                 </Link>
                  <Link to="/dibatalkan" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className="tab-dibatalkan-mobile">Dibatalkan</div>
                 </Link>
                
                  </div>
                </div>
                <div className="button-semua-mobile">Semua</div>
                <div className="button-obat-resep-mobile">Obat Resep</div>
                <div className="button-obat-bebas-mobile">Obat Bebas</div>
                <span className="material-icons filter-mobile">format_line_spacing</span>
                <div className="garis-akhir-mobile"></div>
            </div>
        </div>
    )
}

export default TemplateProsesPemesanan