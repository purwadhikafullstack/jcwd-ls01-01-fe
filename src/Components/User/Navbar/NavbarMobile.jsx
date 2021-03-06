import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from './../../../Assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faCartShopping, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import SearchBubble from '../SearchBubble/SearchBubble';

const NavbarMobile = () => {
    let [dropdownOpen, setDropdownOpen] = useState(false); 
    const [username, setUsername] = useState([]);
    const [verified, setVerified] = useState([])
    const [bubbleOpen, setBubbleOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
      if(search.length){
        axios.get(`${API_URL}/product/searchproducts?entry=${search}`, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then((res) => {
            setProducts(res.data.products)
            setTotal(res.data.total)
        }).catch((err) => {
            console.log('Error di search:', err)
        })
      }
    }, [search])

  return (
    <div className="d-lg-none d-md-none d-block">
        <div className='navbar-mobile'>
             <div style={{position:'relative', width:'260px', height:'36px', marginTop:'30px'}}>
              <form>
                <input className="form-control input-home" 
                onChange={(e) => {
                  setSearch(e.target.value)
                  e.target.value ? setBubbleOpen(true)
                  : setBubbleOpen(false)
                }}
                type="search" placeholder="Cari Obat, Vitamin, dan Lainnya" aria-label="Search"   />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-input-home'/>
              </form>
              {
                bubbleOpen && <SearchBubble searchQuery={search} products={products} setBubbleOpen={setBubbleOpen} total={total} />
              }
             </div>
              <div className='icon-navmob'>
              <FontAwesomeIcon icon={faBell} style={{textDecoration: "none", cursor:"pointer", color:"#E0004D", marginTop: "15px"}}/>
                  <Link to="/cart" style={{textDecoration: "none", cursor:"pointer", color:"#E0004D", marginLeft:'20px', marginTop: "15px"}}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  </Link>
              </div>
        </div>
    </div>
  );
}

export default NavbarMobile;