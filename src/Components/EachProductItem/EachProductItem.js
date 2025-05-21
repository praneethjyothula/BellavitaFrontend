
import './EachProductItem.css'

import Header from '../Header/Header'
import { AiFillStar } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";

import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux';

import {Modal,Button} from 'react-bootstrap'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'


import axios from 'axios'

function EachProduct() {

    const { category, id } = useParams()

    const [data, setData] = useState('')

    const [quantity, setQuantity] = useState(1)

    const putData = useDispatch()

    const [cartText, setCartText] = useState('')

    const [toShowPopup, toSetPopup] = useState(false)


    const toIncrementQuantity = () => {
        setQuantity(quantity + 1)

    }





    const toDecrementQuantity = () => {
        if (quantity > 1) {

            setQuantity(quantity - 1)
        }

    }


    useEffect(() => {

        toGetEachData()



    }, [])


    const toGetEachData = async () => {


        const result = await axios.get(`https://bellavitabackend-production.up.railway.app/category/${category}/${id}`)

        setData(result.data)



    }






    const onClickBtn = () => {
        toPostCartData()

    }

    const toPostCartData = async () => {

        let token = Cookies.get('jwtToken')



        const name = localStorage.getItem('name')
        const headers = { Authorization: `Bearer ${token}` }


        let MainResult = await axios.post('https://bellavitabackend-production.up.railway.app/postCart', { data: { ...data, quantity: quantity,Username:name } }, { headers: headers })

        let resultData = MainResult.data

        if (resultData === 'ITEM ALREADY ADDED TO CART') {
            setCartText('CART ITEM EXIST')
            toSetPopup(true)



        } else {
            setCartText('ITEM ADDED TO CART')
            toSetPopup(true)

        }



    }



    const { title, price, description, reviews, name, rating, image_url } = data


    return <div className='eachProduct-container'>

        <nav className='eachproduct-nav'>

            <Header />

        </nav>
        <div className='eachproduct-content-container'>
            <div className='eachproduct-image-container'>
                <img src={image_url} className='eachproduct-image' />
            </div>
            <div className='eachproduct-text-container'>
                <h1 className='product-title'>{title}</h1>
                <h1 className='product-name'>{name}</h1>

                <div className='rating-reviews-container'>

                    <p className="rating-p"><AiFillStar className="star" /> &nbsp; {rating}&nbsp;</p>
                    <p> &nbsp; | &nbsp; </p>
                    <p className="reviews-p"><span> <BsFillPatchCheckFill className="check" /> </span> &nbsp;   {reviews} Reviews</p>

                </div>
                <div className='quantity-container'>
                    <div className='price-container'>

                        <p className="price"> <BiRupee /> {price}.00</p>
                        <p className='tax'>Inclusive of all taxes</p>
                    </div>
                    <div className='quantity-btn-container'>
                        <button onClick={toDecrementQuantity}>-</button>
                        <p>{quantity}</p>
                        <button onClick={toIncrementQuantity}>+</button>
                    </div>
                </div>
                <Button onClick={onClickBtn} className="cart-btn">ADD TO CART</Button>
                <Modal className="popup" show={toShowPopup}>

                    <Modal.Body>{cartText}</Modal.Body>
                    <Button className="ok-btn" onClick={() => toSetPopup(false)}>OK</Button>
                </Modal>
                <div className='des-container'>
                    <p className='des-p'>{description}</p>
                </div>
            </div>

        </div>

    </div>
}

export default EachProduct