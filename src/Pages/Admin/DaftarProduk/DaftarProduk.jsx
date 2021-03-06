import React, { useState, useEffect } from "react";
import './DaftarProduk.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import ModalTambahObat from '../../../Components/Admin/ModalAddProduk/ModalTambahObat.jsx';
import ModalEditObat from '../../../Components/Admin/ModalEditProduk/ModalEditObat.jsx';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import TableData from './TableData';
import { RingLoader } from "react-spinners";
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from "react-bootstrap/Dropdown";
import { faDownload, faFileExcel, faSearch, faAngleDown, faEllipsisVertical, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';


const DaftarProduk  = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);
    const [produkFilter, setProdukFilter] = useState([])
    let [modalOpen, setModalOpen] = useState(false); 
    const [openModal, setOpenModal] = useState(false)
    const [openModal2, setOpenModal2] = useState(false)
    let [modalOpens, setModalOpens] = useState(false);
    const [kategori, setKategori] = React.useState("");
    const [nama, setNama] = React.useState("");
    const [selectedProdukId, setSelectedProdukId]  = useState();
    const [data, setData] = useState([]);
    const [jumlahList, setJumlahList] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(10);
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [totalProduk, setTotalProduk] = useState(0);
    const [selected, setSelected] = useState(null)
    const [selected2, setSelected2] = useState(null)
    const [idProduk, setIdProduk] = useState(0)
    const [listSearch, setListSearch] = useState(0)
    const [tokenAdmin, setTokenAdmin] = useState('')
    useEffect(() => {
      let token = localStorage.getItem('token')
      const headers = {
          headers: { 
              'Authorization': `${token}`,
          }
      }
      axios.get(`${API_URL}/admin/gettokenadmin`, headers)
      .then((res) => {
          setTokenAdmin(res.data[0].token)
      }).catch((err) => {
          console.log('ini err get',err)
      })
  }, [tokenAdmin])

    useEffect(() => {
        setLoading(true)
        let token = localStorage.getItem('token')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/admin/paginate?page=${currentPage}&limit=${itemsPerPage}`, headers)
        .then((res) => {
            // console.log(res.data)
            setData(res.data.data)
            setTotalProduk(res.data.pagination.totalRow[0].TotalData)
            setJumlahList(res.data.data.length)
            setLoading(false)
        }).catch((err) => {
            console.log('ini err get',err)
            setLoading(false)
        })
    }, [currentPage])

    // FITER AND SEARCH KIKI

    useEffect(() => {
        setLoading(true)
        var data = parseInt(kategori)
        var searchNama = nama
       
        axios.get(`${API_URL}/admin/search?kategori=${data}&nama=${searchNama}`)
        .then((res) => {
            console.log(res)
            setProdukFilter(res.data.result)
            setLoading(false)
            setListSearch(res.data.total)
        }).catch((err) => {
            console.log('ini err get',err)
            setLoading(false)
        })
       
    }, [kategori, nama])

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
      };
    
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalProduk / itemsPerPage); i++) {
    pages.push(i);
    }

    const pages2 = [];
    for (let i = 1; i <= Math.ceil(listSearch / itemsPerPage); i++) {
    pages2.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems2 = produkFilter.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers2 = pages2.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
        return (
            <li
            key={number}
            id={number}
            onClick={handleClick}
            className={currentPage == number ? "active" : null}
            >
            {number}
            </li>
        );
        } else {
        return null;
        }
    });


    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
        return (
            <li
            key={number}
            id={number}
            onClick={handleClick}
            className={currentPage == number ? "active" : null}
            >
            {number}
            </li>
        );
        } else {
        return null;
        }
    });

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit == 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageIncrementBtn2 = null;
    if (pages2.length > maxPageNumberLimit) {
        pageIncrementBtn2 = <li onClick={handleNextbtn}> &hellip; </li>;
    }


    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }


    let kategoriChange = (event) => {
        setKategori(event.target.value)
    }

    let namaObatChange = (event) => {
          setNama(event.target.value)
      }

    const printFilterKiki = (props) => {
        return produkFilter.map((value, index) => {
           
            return (
                <tr key={index}>
                    <td>
                    {
                        value.id > 115 ?
                        <>{111 + index}</>
                        :
                        <>{value.id}</> 
                    }
                    </td>
                    <td>{value.nama_obat}</td>
                    <td>
                    {
                        value.golongan_obat === "Obat Keras" ?
                        <> {"OBK"+ value.id + 15211}</>
                        :
                        <>
                        {
                           value.golongan_obat ===  "Obat Bebas Terbatas" ?
                           <>{"OBT"+ value.id + 15220}</>
                           :
                           <>
                           {
                             value.golongan_obat ===  "Lain-lain" ?
                             <>{"OLL"+ value.id + 151212}</>
                             :
                             <>{"MDC"+ value.id + 1343}</>
                           }
                           </>
                        }
                       
                        </>
                    }
                    </td>
                    <td>{value.NIE}</td>
                    <td>{value.golongan_obat}</td>
                    <td>{value.stok}</td>
                    <td>{value.satuan_obat}</td>
                    <td>{value.nilai_barang}</td>
                    <td>{value.harga}</td>    
                    <td>
                        <div  className="d-flex">
                        <button className="button-lihat-detail-produk mx-3" type="button" onClick={() => navigate(`/kartustok/${value.id}`)} >Lihat Detail</button>
                        <Dropdown>
                                <Dropdown.Toggle id="dropdown-edit-menu-admin">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item value="1">
                                <div onClick={() => klikModalEdit(value.id)}>Edit Obat</div>
                                </Dropdown.Item>
                                <Dropdown.Item value="2"  onClick={() => deleteDataKiki(value.id)}>
                                    Delete
                                </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                       
                        </div>
                    </td>
                </tr>
            )
        })
    }
      
    
   
    const printDataAisyah = (props) => {
        return data.map((value, index) => {
            return (
                <tr key={value.id}>
                    <td>
                    {
                        value.id > 115 ?
                        <>{111 + index}</>
                        :
                        <>{value.id}</> 
                    }
                    </td>
                    <td>{value.nama_obat}</td>
                    <td>
                    {
                        value.golongan_obat === "Obat Keras" ?
                        <> {"OBK"+ value.id + 15211}</>
                        :
                        <>
                        {
                           value.golongan_obat ===  "Obat Bebas Terbatas" ?
                           <>{"OBT"+ value.id + 15220}</>
                           :
                           <>
                           {
                             value.golongan_obat ===  "Lain-lain" ?
                             <>{"OLL"+ value.id + 151212}</>
                             :
                             <>{"MDC"+ value.id + 1343}</>
                           }
                           </>
                        }
                       
                        </>
                    }
                    </td>
                    <td>{value.NIE}</td>
                    <td>{value.golongan_obat}</td>
                    <td>{value.stok}</td>
                    <td>{value.satuan_obat}</td>
                    <td>{value.nilai_barang}</td>
                    <td>{value.harga}</td>    
                    <td>
                        <div  className="d-flex">
                        {
                                openModal2 && <ModalEditObat setOpenModal={setOpenModal2}  selected={selected2}
                                setSelected={setSelected2} id={idProduk}/>
                        }
                        
                        <button className="button-lihat-detail-produk mx-3" type="button" onClick={() => navigate(`/kartustok/${value.id}`)}>Lihat Detail</button>
                        <Dropdown>
                                <Dropdown.Toggle id="dropdown-edit-menu-admin">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item value="1">
                                <div onClick={() => klikModalEdit(value.id)}>Edit Obat</div>
                                </Dropdown.Item>
                                <Dropdown.Item value="2" onClick={() => deleteDataKiki(value.id)}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </td>
                </tr>
            )
        })
    }


    const deleteDataKiki = (id) => {
        console.log('ini id delete', id)
        let token = localStorage.getItem('token')
        var headers = {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.delete(API_URL + `/admin/deleteproduct/${id}`, headers)
        .then((res) => {
            console.log(res.data)
            console.log('get delete kiki', res.data.error)
            let newData = res.data.data
            newData.splice(0,110)
            setData(newData)
        })
        .catch((err) =>{
           console.log(err)
        })
    }
    

    const klikModalEdit = (id) => {
        setIdProduk(id)
        console.log('klik edit', id)
        setOpenModal2(true)
    }

    const daftarProduk = () => {
        return(
            <>
            <SidebarAdmin />
             <div className="container">
                 <div className="box-daftar-produk-admin">
                 <div className="tulisan-dalam-daftar-produk-1">Daftar Obat
                 {
                        openModal && <ModalTambahObat setOpenModal={setOpenModal}  selected={selected}
                        setSelected={setSelected}/>
                 }
                 
                 </div>
                
                 <div className="button-unduh-pdf-produk"><FontAwesomeIcon icon={faDownload} className="" />Unduh PDF</div>
                 <div className="button-unduh-excel-produk"><FontAwesomeIcon icon={faFileExcel} className="" />Excel</div>
                 <div className="inside-box-daftar-produk-admin">
                     <div className="filter-cari-nama-obat-dalam-produk">
                     <input type="text" className="form-control input-admin-daftar-1"   onChange={namaObatChange} defaultValue={nama}  placeholder="Cari Nama Obat" />
                      <FontAwesomeIcon icon={faSearch}  className='logo-input-group-text-daftar' />
                     </div>
                     <div className="filter-dropdown-dalam-produk">
                     <select 
                     id="inputFillter" 
                     name="editAdminFilter"
                    onChange={kategoriChange} defaultValue={kategori}
                     
                     className="form-control border-0  input-admin-daftar-2"  placeholder="Filter"
                     >
                         <option value="" >Filter</option>
                         <option value="1">Obat Keras</option>
                         <option value="2">Obat Bebas Terbatas</option>
                         <option value="3">Medical Device & Consumable</option>
                         <option value="4">Lain-lain</option>
                     </select>
                     <div  className='logo-input-group-text-daftar-2'>
                         <FontAwesomeIcon icon={faAngleDown}  className='logo-input-group-text-daftar-3'/>
                     </div>
     
                     </div>
                     <div id="button-tambah-obat-produk"  onClick={() => setOpenModal(true)} ><FontAwesomeIcon icon={faDownload} className="" />Tambah Obat</div>
                     <div className="garis-inside-box-daftar-produk"></div>
                     <div className="box-tabel-daftar-produk">
                     <div className="inside-box-daftar-produk">
                        {
                            loading ?
                            <> <div className="d-flex justify-content-center align-items-center mt-5"><RingLoader color={'#E0004D'} size={150}/></div></>
                            :
                            <TableData>
                           {
                            produkFilter.length > 0   ?
                            <>
                            {printFilterKiki()}</>
                            :
                            <>{printDataAisyah()}</>
                           }
                        </TableData>
                        }
                       
                     </div>
     
                     <div className="box-footer-tabel-daftar-produk">
                            {
                            produkFilter.length !== 0   ?
                            <>
                             <div className="keterangan-footer-tabel-daftar-produk">Menampilkan {listSearch} dari {totalProduk} data</div>
                            </>
                            :
                            <>
                             <div className="keterangan-footer-tabel-daftar-produk">Menampilkan {jumlahList} dari {totalProduk} data</div>
                            </>
                           }
                        
                      
    
                         <div className="box-pagination-footer-produk">
                            <div className='d-flex'>
                                 {
                                    produkFilter.length !== 0   ?
                                    <>
                                      <ul className="pageNumbers">
                                    <li>
                                    <button
                                        onClick={handlePrevbtn}
                                        disabled={currentPage == pages2[0] ? true : false}
                                    >
                                        <FontAwesomeIcon icon={faAngleLeft} className="logo-next-1" />
                                         <FontAwesomeIcon icon={faAngleLeft} className="logo-next-2" />
                                    </button>
                                        </li>
                                        {pageDecrementBtn}
                                        {renderPageNumbers2}
                                        {pageIncrementBtn2}
    
                                        <li>
                                        <button
                                            onClick={handleNextbtn}
                                            disabled={currentPage == pages2[pages2.length - 1] ? true : false}
                                        >
                                            <FontAwesomeIcon icon={faAngleRight} className="logo-next-2"/>
                                            <FontAwesomeIcon icon={faAngleRight} className="logo-next-1"/>
                                        </button>
                                        </li>
                                    </ul> 
                                    </>
                                    :
                                    <>
                                      <ul className="pageNumbers">
                                        <li>
                                        <button
                                            onClick={handlePrevbtn}
                                            disabled={currentPage == pages[0] ? true : false}
                                        >
                                            <FontAwesomeIcon icon={faAngleLeft} className="logo-next-1" />
                                            <FontAwesomeIcon icon={faAngleLeft} className="logo-next-2" />
                                        </button>
                                        </li>
                                        {pageDecrementBtn}
                                        {renderPageNumbers}
                                        {pageIncrementBtn}
    
                                        <li>
                                        <button
                                            onClick={handleNextbtn}
                                            disabled={currentPage == pages[pages.length - 1] ? true : false}
                                        >
                                            <FontAwesomeIcon icon={faAngleRight} className="logo-next-2"/>
                                            <FontAwesomeIcon icon={faAngleRight} className="logo-next-1"/>
                                        </button>
                                        </li>
                                    </ul> 
                                    </>
                                }
                              
                            </div>
                         </div>
                     </div>
                     </div>
                 </div>
                 </div>
             </div>
            </>
        )
    }

    if(localStorage.getItem('myTkn')){
        if(localStorage.getItem('myTkn') === tokenAdmin){
            return(
                <>{daftarProduk()}</>
            )
        }else{
            return(
                <Navigate to='/' />
            )
        }
    }else{
        if(localStorage.getItem('token') === tokenAdmin){
            return(
                <>{daftarProduk()}</>
            )
        }else if(!localStorage.getItem('token')){
            return(
                <Navigate to='/loginadmin' />
            )
        }
    }
  
   
}

export default DaftarProduk