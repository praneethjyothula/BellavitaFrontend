import './Address.css'
import OrderConfirm from '../Images/orderConfirm.png'
import Cookies from 'js-cookie'
import { Navigate,Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Address(){

    const [fullName,setFullName] = useState('')

    const [errorMsg,setErrorMsg] = useState('')

    const [toShowCOnfirmOrder,toSetConfirm] = useState(false)

    const [mobileNumber,setMobileNumber] = useState('')
    const [pincode,setPincode] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')
    const [landmark,setLandmark] = useState('')


    const onClickOrderBtn = () =>{
        if(fullName === '' || mobileNumber === '' || pincode === '' || address1 === '' || address2 === '' || landmark === ''){

            setErrorMsg("FILL REQUIRED INPUTS")

        }else{
            toSetConfirm(true)

            toDeleteAllData() 
        }
    }

    const toDeleteAllData =async () =>{

        const token = Cookies.get('jwtToken')
        const headers = { Authorization: `Bearer ${token}` }

        const name = localStorage.getItem('name')

        const resultData = await axios.post('https://bellavitabackend-production.up.railway.app/toDeleteAll',{data:{Username:name}},{headers:headers}) 



    }

    return toShowCOnfirmOrder === false ? <div className='address-container'>
        <h1 className='address-h1'>ADDRESS DETAILS</h1>
        <form className='address-form-container'>
            <label>Full Name (First And Last Name)</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} type='text'/>
            <label>Mobile Number</label>
            <input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} type='text'/>
            <label>Pincode</label>
            <input value={pincode} onChange={(e) => setPincode(e.target.value)} type='text'/>
            <label>Flat, House no., Building, Company, Apartment</label>
            <input value={address1} onChange={(e) => setAddress1(e.target.value)} type='text'/>
            <label>Area, Street, Sector, Village</label>
            <input value={address2} onChange={(e) => setAddress2(e.target.value)} type='text'/>
            <label>Landmark</label>
            <input value={landmark} onChange={(e) => setLandmark(e.target.value)} type='text' placeholder='E.g. near apollo Hospital'/>
            <p className='address-error-msg'>{errorMsg}-</p>
            
            

        </form>
        <button onClick={onClickOrderBtn} className='confirm-order-btn'>CONFIRM ORDER</button>
    
    
    
    </div> : <div className='confirm-order-container'>
        <h1 className='order-h1'>Your order is confirmed</h1>
        <div className='confirm-order-image-container'>
            <img src={OrderConfirm} className='confirm-image'/>
        </div>
        <div className='order-details-container'>
            <p> Full Name : <span className='confirm-order-span-item'>{fullName}</span></p>
            <p> Mobile Number : <span className='confirm-order-span-item'>{mobileNumber}</span></p>
            <p> Location : <span className='confirm-order-span-item'>{address1+' '+address2+' '+pincode+' '+landmark}</span></p>
        </div>
        <div >
            <Link to={'/'}>
            <button className='home-button'>Home</button>
            </Link>
        </div>
    </div>
}

export default Address