import React, { useState, useEffect } from "react";
import './EditProfile.css';
import SidebarProfile2 from "../../../Components/User/SidebarProfile/SidebarProfile2.jsx";
import TemplateProfile from "../../../Components/User/TemplateProfile/TemplateProfile.jsx";
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';
import default1 from '../../../Assets/default.jpg';


function EditProfile() {
    const [nama, setNama] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [tanggallahir, setTanggallahir] = React.useState("");
    const [profilepic, setProfilepic] = React.useState("");
    const [editImageFileName, seteditImageFileName] = React.useState('Select Image...');
    const [editImageFile, seteditImageFile] =  React.useState(undefined);
    const [previewImage, setpreviewImage] =  React.useState(null);
    const [listProfile, setlistrofile] = React.useState([]);
    const [selectedEditProfile, setselectedEditProfile] = React.useState(0);

    
    useEffect(() => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/user/datauser`, headers)
        .then((res) => {
            console.log(res.data)
            console.log('ini res.data.nama', res.data[0].nama)
            if(res.data[0].nama) {setNama(res.data[0].nama)}
            if(res.data[0].email) {setEmail(res.data[0].email)}
            if(res.data[0].gender) {setGender(res.data[0].gender)}
            if(res.data[0].profile_picture) {setProfilepic(res.data[0].profile_picture)}
            if(res.data[0].tanggal_lahir) {setTanggallahir(res.data[0].tanggal_lahir)}
        }).catch((err) => {
            console.log('ini err get',err)
        })
        }, [])

        let namaChange = (event) => {
            setNama(event.target.value)
        }
    
        let emailChange = (event) => {
            setEmail(event.target.value)
        }

        let genderChange = (event) => {
            setGender(event.target.value)
        }

        let tanggalChange = (event) => {
            setTanggallahir(event.target.value)
        }

         const onEditImageFileChange = (e) => {
            if(e.target.files[0]) {
                seteditImageFileName(e.target.files[0].name)
                seteditImageFile(e.target.files[0])
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    if(reader.readyState === 2){
                        setpreviewImage(reader.result)
                    }
                }
            }
            else {
                seteditImageFileName('Select Image...')
                seteditImageFile("")
            }
        }

        const onBtnUpdateProfile = () => {
            var formData = new FormData()
            let token = localStorage.getItem('myTkn')
            var headers = {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

            console.log('ini tanggallahir', tanggallahir)
            let borndate = tanggallahir
            borndate = borndate.split('T')
            borndate = borndate.join(' ') 
            console.log('ini borndate', borndate)

            let tahun = tanggallahir
            tahun = tahun.split('')
            tahun = tahun.slice(0,4).join('')
            console.log('tahun', tahun)
            
            var data = {
                nama: nama,
                email: email,
                gender: gender,
                tanggal_lahir: borndate,
                umur: tahun
            }
    
            formData.append('image', editImageFile)
            formData.append('data', JSON.stringify(data))
            
            if(!data.email.includes('@')) throw { message: Swal.fire({
                title: 'Error!',
                text: 'Email Wrong',
                icon: 'error',
                confirmButtonText: 'Okay!'
            }) }
            axios.patch(API_URL + "/user/editprofiledata", formData, headers)
            .then((res) => {
                console.log(res.data)
                if(res.data[0].nama) {setNama(res.data[0].nama)}
                else {setNama('')}
                if(res.data[0].email) {setEmail(res.data[0].email)}
                 else {setEmail('')}
                if(res.data[0].gender) {setGender(res.data[0].gender)}
                if(res.data[0].profile_picture) {setProfilepic(res.data[0].profile_picture)}
                else {setProfilepic('')}
                {setTanggallahir(res.data[0].tanggal_lahir)}
                
                setselectedEditProfile(0)
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Okay!'
                })
            })
            .catch((err) =>{
                Swal.fire({
                    title: 'Error!',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Okay!'
                })
            })
        }
       
  
  

    return (
        <div className="container">
        <TemplateProfile/>
        <SidebarProfile2/>
        <div className="edit-foto-profile">
        {
            previewImage? 
            <img src={previewImage} alt='Image Preview' className='userImgSet' /> 
            : 
            profilepic?
            <img src={`${API_URL + '/'}${profilepic}`} alt='Image Preview' className='userImgSet' />
            :
            <img  src={default1} alt='Image Preview' className='userImgSet' />
        }
        </div>
        <div>
        <input className="button-edit-foto" type="file" label={editImageFileName} onChange={onEditImageFileChange} />
        </div>
        <div className="baris-edit-profile-1">
            <input type="text" 
            onChange={namaChange} defaultValue={nama}
            name="editUserName"
            className="form-control input-edit-profile-1" placeholder="Name" />
        </div>
        <div className="form-group baris-edit-profile-2">
            <input type="text" 
             onChange={emailChange} defaultValue={email}
             name="editUserEmail"
            className="form-control input-edit-profile-2"  placeholder="Email Address" />
        </div>
        <div className="form-group baris-edit-profile-3">
            <select 
            id="inputGender" 
            onChange={genderChange} defaultValue={gender}
            name="editUserGender"
            className="form-control input-edit-profile-3"  placeholder="Gender"
            >
                <option value="" >All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </div>
        <div className="form-group mt-3 mb-3 baris-edit-profile-4">
            <div className="input-group">
                <input type="datetime-local"
                defaultValue={tanggallahir}  onChange={tanggalChange}
                 placeholder="Tanggal Lahir" className="form-control rounded-0 border-top-0 border-left-0 border-right-0 mytetring-input" required />
                <div className="input-group-prepend">
                </div>
            </div>
        </div>
        {/* <div className="form-group baris-edit-profile-4">
            <input type="text"
             value={this.state.usia} onChange={this.onUsiaEditChange}
             name="editUserGender" 
            className="form-control input-edit-profile-4"  placeholder="Usia" />
        </div> */}
        <div className="d-lg-none d-md-none d-block" id="wanna-change-password">Wanna change password? <span>click here</span></div>
        <button type="submit" className="button-batalkan-edit-profile" onClick={() => selectedEditProfile(0)} >Batalkan</button>
        <button type="submit" className="button-simpan-edit-profile" onClick={() => onBtnUpdateProfile ()}>Simpan</button>
    </div>
    );
}

export default EditProfile;