import React, { useState, useEffect } from "react";
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import './Home.css';
import bca from './../../../Assets/Bca.svg';
import mandiri from './../../../Assets/Mandiri.svg';
import permata from './../../../Assets/Permata.svg';
import ovo from './../../../Assets/Ovo.svg';
import gopay from './../../../Assets/Gopay.svg';
import shoope from './../../../Assets/Shoope.svg';
import jumbotron1 from './../../../Assets/Jumbotron1.svg';
import jumbotron2 from './../../../Assets/Jumbotron2.svg';
import obat from './../../../Assets/Obat.svg';
import nutrisi from './../../../Assets/Nutrisi.svg';
import perawatanTubuh from './../../../Assets/Perawatan Tubuh.svg';
import alatKesehatan from './../../../Assets/Alat Kesehatan.svg';
import vitamins from './../../../Assets/Vitamin.svg';
import herbal from './../../../Assets/Herbal.svg';
import ibuAnak from './../../../Assets/IbuAnak.png';
import kranjang from './../../../Assets/Kranjang.svg';
import manusia1 from './../../../Assets/Manusia.svg';
import hamil from './../../../Assets/Hamil.svg';
import framebg from './../../../Assets/Bg.svg';
import friend from './../../../Assets/Friend.png';
import obats from './../../../Assets/Obats.svg';
import hemat from './../../../Assets/Hemat.svg';
import kirim from './../../../Assets/Kirim.svg';
import logo from './../../../Assets/LogoFull.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
  const [produkDiskon, setProdukDiskon] = useState([])
  const [produkTerbaru, setProdukTerbaru] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${API_URL}/product/homeproduk`)
    .then((res) => {

        setProdukDiskon(res.data.produkDiskon)
        setProdukTerbaru(res.data.produkTerbaru)
    }).catch((err) => {
        console.log('ini err get',err)
    })
}, [])

const printData = (props) => {
  return produkDiskon.map((value, index) => {
      return (
          <div key={value.id}>
             <div className='product-card-home-2 mx-2'>
                <div className='circle-home' onClick={(e) => e.stopPropagation()}>
                    <span style={{fontSize:'30px', color:'#B4B9C7', marginTop:'5px'}}><FontAwesomeIcon icon={faHeart} /></span>
                </div>
                <div id="box-data-produk-home">
                <img className='product-image-home' src={`${API_URL}/${value.gambar}`} alt="" />
                  <p className='product-name-home'>{value.nama_obat}</p>
                  <div className="box-diskon-produk">
                    <div className="nominal-diskon">10%</div>
                    <div className="harga-diskon-home">{value.harga.toLocaleString('de-DE', { minimumFractionDigits: 0})}</div>

                  </div>
                  <div style={{display:'flex'}}>
                        <span className='product-price-home'>Rp</span>
                        <span className='product-price-home'>{value.diskon.toLocaleString('de-DE', { minimumFractionDigits: 0})}</span>
                        <span className='product-unit-home'>/</span>
                        <span className='product-unit-home' style={{marginLeft:'2px'}}>{value.satuan_obat}</span>
                    </div>
                </div>
                {
                        value.butuh_resep === 'Ya'
                        ? <button className='keranjang-home' onClick={(e) => e.stopPropagation()}>
                            Butuh Resep
                        </button>
                        : <button className='keranjang-home' onClick={(e) => {
                            e.stopPropagation()
                           
                        }}>
                            Keranjang
                        </button>
                    }
          </div> 

              
          </div>
      )
  })
}

const printData2 = (props) => {
  return produkTerbaru.map((value, index) => {
      return (
        <div key={value.id}>
        <div className='product-card-home-4 mx-2'>
           <div className='circle-home' onClick={(e) => e.stopPropagation()}>
               <span style={{fontSize:'30px', color:'#B4B9C7', marginTop:'5px'}}><FontAwesomeIcon icon={faHeart} /></span>
           </div>
           <div id="box-data-produk-home">
           <img className='product-image-home' src={`${API_URL}/${value.gambar}`} alt="" />
             <p className='product-name-home'>{value.nama_obat}</p>
             <div className="box-diskon-produk">
               <div className="nominal-diskon">10%</div>
               <div className="harga-diskon-home">{value.harga.toLocaleString('de-DE', { minimumFractionDigits: 0})}</div>

             </div>
             <div style={{display:'flex'}}>
                   <span className='product-price-home'>Rp</span>
                   <span className='product-price-home'>{value.diskon.toLocaleString('de-DE', { minimumFractionDigits: 0})}</span>
                   <span className='product-unit-home'>/</span>
                   <span className='product-unit-home' style={{marginLeft:'2px'}}>{value.satuan_obat}</span>
               </div>
           </div>
           {
                   value.butuh_resep === 'Ya'
                   ? <button className='keranjang-home' onClick={(e) => e.stopPropagation()}>
                       Butuh Resep
                   </button>
                   : <button className='keranjang-home' onClick={(e) => {
                       e.stopPropagation()
                      
                   }}>
                       Keranjang
                   </button>
               }
     </div> 

         
     </div>
      )
  })
}




  return (
    <div>
      <div className='gradient'></div>
      <div id="container-home">
        <div className='inside-container-home'>
          <div className='box-jumbotron1'></div>
          <div className='head-image'>
          <div className='selamat-datang-home'>Selamat Datang Di</div>
          <div className='box-apotakecare'>
            <img src={logo} alt=""  />
            <div className='tulisan-apotakecare'>Apotakecare</div>
          </div>
            <div className='keterangan-persen-asli'>100% Asli, Produk BPOM, Uang Dijamin Kembali</div>
            <div className='apotake-terpercaya'>APOTEK ONLINE TERPERCAYA</div>
            <img src={jumbotron1} alt="" className="jumbotron1" />
          </div>
        </div>
        <div className='inside-container-home-2'>
        <img src={jumbotron2} alt="" className="jumbotron2" />
        <div className='box-unggah-resep'>
          <div className='tulisan-perlu-resep'>Punya Resep Doktor?</div>
          <div className='tulisan-tak-antre'>Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Foto tidak boleh lebih dari 10 MB</div>
        </div>
        <button className='btn-unggah-resep' onClick={() => navigate('/uploadresep')}>Unggah Resep</button>

        </div>
        <div className='inside-container-home-3'>
          <div className='home-kategori'>Kategori</div>
          <div className='box-home-kategori'>
           <div className='box-home-kategori-2'>
             <div className='product-card-home mx-2'>
                <img src={obat} alt="" className="obat1" />
                <div className='Obat-obatan'>Obat - Obatan</div>
              </div>
              <div className='product-card-home mx-2'>
                <img src={nutrisi} alt="" className="obat1" />
                <div className='Obat-obatan'>Nutrisi</div>
              </div>
              <div className='product-card-home mx-2'>
                <img src={herbal} alt="" className="obat1" />
                <div className='Obat-obatan'>Herbal</div>
              </div>
              <div className='product-card-home mx-2'>
                <img src={vitamins} alt="" className="obat1" />
                <div className='Obat-obatan'>Vitamin & Suplemen</div>
              </div>
              <div className='product-card-home mx-2'>
                <img src={alatKesehatan} alt="" className="obat1" />
                <div className='Obat-obatan'>Alat Kesehatan</div>
              </div>
              <div className='product-card-home mx-2'>
                <img src={perawatanTubuh} alt="" className="obat1" />
                <div className='Obat-obatan'>Perawatan Tubuh</div>
              </div>
              <div className='product-card-home mx-2'>
                <img src={ibuAnak} alt="" className="obat1" />
                <div className='Obat-obatan'>Ibu & Anak</div>
              </div>  
           </div>
          </div>
        </div>
        <div className='inside-container-home-4'>
          <div className='kejar-diskon'>Kejar Diskon Hari Ini </div>
          <div className='d-flex'>
          <div className='box-buruan-ikut'>
            <div className='yuk-buruan-ikut'>Yuk Buruan Ikutan!</div>
            <img src={kranjang} alt="" className="kranjang" />
            <img src={manusia1} alt="" className="manusia1" />
          </div>
          <div className='box-isi-card-home'>
            {printData()}
          </div>
          </div>
        </div>
        <hr />
        <div className="inside-container-home-5">
          <div className='box-1-jumbotron'>
            <img src={hamil} alt="" className="hamil" />
            <div className='program-hamil'>Program Hamil</div>
            <div className='wujudkan-rumah'>Wujudkan rumah tanggamu dengan si buah hati</div>
          </div>
          <div className='box-2-jumbotron'>
            <img src={friend} alt="" className="friend" />
            <img src={framebg} alt="" className="framebg" />
            <div className='kebutuhan'>Kebutuhan Untuk Sehari-hari</div>
            <div className='lengkapi-kebutuhan'>Lengkapi kebutuhan gizi & asupan setiap saat</div>
          </div>

        </div>
        <div className='inside-container-home-6'>
          <div className='box-tulisan-6'>
            <div className='box-tulisan-6-2'>
            <div className='tulisan-6-1'>Newest Product</div>
            <div className='tulisan-6-2'>Lihat Semua</div>
            </div>
            <div className="box-3-jumbotron">
                {printData2()}
   
            </div>
          </div>
        </div>
        <hr />
        <div className='inside-container-home-7'>
         <div className='jaminan'> Jaminan Untuk Anda</div>
         <div className='container-box-7'>
            <div className='product-card-home-3 mx-2'>
                <img src={obats} alt="" className="obats" />
                <div>
                  <div className='tulisan-7'>100 % Obat Asli</div>
                  <div className='tulisan-7-2'>Semua produk yang kami jual dijamin asli  & kualitas terbaik untuk anda.</div>
                </div>
              </div>
              <div className='product-card-home-3 mx-2'>
                <img src={hemat} alt="" className="hemat" />
                <div>
                  <div className='tulisan-7'>Dijamin Hemat</div>
                  <div className='tulisan-7-2'>Kami menjamin akan mengembalikan uang dari selisih perbedaan harga.</div>
                </div>
              </div>
              <div className='product-card-home-3 mx-2'>
                <img src={kirim} alt="" className="kirim" />
                <div>
                  <div className='tulisan-7'>Pengiriman Express</div>
                  <div className='tulisan-7-2'>Tak perlu khawatir menunggu, Kami kirim  langsung secepatnya ke alamat Anda</div>
                </div>
              </div>

         </div>
        </div>
        <div className="d-flex">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      <div id="container-jumbotron-payment">
        <div>
          <div>Metode Pembayaran</div>
          <div className="d-flex justify-content-center">
            <img src={bca} alt="" className="me-4" />
            <img src={mandiri} alt="" className="me-4" />
            <img src={permata} alt="" className="me-4" />
            <img src={ovo} alt="" className="me-4" />
            <img src={gopay} alt="" className="me-4" />
            <img src={shoope} alt="" className="col-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
