import { MdOutlineCancel } from "react-icons/md";
import { TbShoppingCartOff } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa";
import './Cart.css'

import { useSelector } from 'react-redux'

import Address from "../AddressDetails/Address";

import { useEffect, useState } from 'react'

import Header from '../Header/Header'

import Cookies from 'js-cookie'

import axios from 'axios'

function Cart() {

    useEffect(() => {
        toGetData()
    }, [])


    const [getData, toSetGetData] = useState([])

    const [toShowAddressSection, toSetAddressSeciton] = useState(false)

    

    const name = localStorage.getItem('name')

    const toGetData = async () => {

        const token = Cookies.get('jwtToken')

        
        const headers = { Authorization: `Bearer ${token}` }

        

        let result = await axios.post('http://localhost:4000/toGetCart',{data:{Username:name}}, { headers: headers })

        console.log(result)

        toSetGetData(result.data)

    }





    const toDeleteData = async (ID) => {

        const token = Cookies.get('jwtToken')
        const headers = { Authorization: `Bearer ${token}` }
        let result = await axios.post(`http://localhost:4000/toDeleteData/${ID}`,{data:{Username:name}}, { headers: headers })


        toGetData()
    }



    let total = getData.map((item) => {
        return parseInt(item.price) * parseInt(item.quantity)

    })

    let sumValue = 0;

    if (total.length !== 0) {

        sumValue = total.reduce((c, a) => {
            return c + a

        })

    } else {
        sumValue = 0
    }






    return <div className='cart-container'>
        <nav className='cart-header'>
            <Header />
        </nav>
        {toShowAddressSection === false ? <div className='cart-content-container'>

            {
                getData.length === 0 ? <div className="empty-cart-container">
                    <TbShoppingCartOff className="empty-cart-icon" />
                    <h1 className="empty-cart-heading">EMPTY CART</h1>
                </div> :
                    <div className='cart-list-container'>

                        {
                            getData.map((eachItem) => {

                                return <div className='each-cart'>
                                    <div className='cart-image-container'>
                                        <img className='each-cart-item' src={eachItem.image_url} />

                                    </div>
                                    <div className='cart-title-name-container'>
                                        <h1 className='title cart-title'>{eachItem.title}</h1>
                                        <h1 className='name cart-name'>{eachItem.name}</h1>
                                        <p className='item-quantity'>Quantity : {eachItem.quantity}</p>
                                    </div>

                                    <div className='item-price-container'>
                                        <h1 className="item-price"><FaRupeeSign /> {eachItem.price * eachItem.quantity}/-</h1>
                                        <button onClick={() => toDeleteData(eachItem.id)} className="cancel"><MdOutlineCancel /></button>
                                    </div>


                                </div>

                            })
                        }
                    </div>
            }

            {
                getData.length !== 0 ? <div className="total-order-button-container">
                    <div className="total-container">
                        <h1 className="total-text">TOTAL BILL : {sumValue}/-</h1>
                        <button onClick={() => toSetAddressSeciton(true)} className="place-order-btn">Place Order</button>
                    </div>

                </div> : ''
            }


        </div> : <Address />}


    </div>
}

export default Cart