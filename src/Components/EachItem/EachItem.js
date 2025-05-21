import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiMessageSquareCheck } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";

import { BiRupee } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import {Button,Modal} from 'react-bootstrap' 

import Cookies from 'js-cookie'


import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import './EachItem.css'
import { useState } from "react";

function EachItem(props) {

    const { eachData } = props



    const postData = useDispatch()


    const [cartText,setCartText] = useState('')

    const [toShowPopup,toSetPopup] = useState(false)




    const onClickBtn = () => {
        toPostCartData()

    }

    

    const toPostCartData = async () => {

        let token = Cookies.get('jwtToken')

        const name  = localStorage.getItem('name')

        const headers = { Authorization: `Bearer ${token}` }


        let MainResult = await axios.post('https://bellavitabackend-production.up.railway.app/postCart', { data: { ...eachData, quantity: 1,Username:name } }, { headers: headers })

        let resultData = await MainResult.data

        console.log(resultData)

        if (resultData === 'ITEM ALREADY ADDED TO CART') {
            setCartText('CART ITEM EXIST')
            toSetPopup(true)



        }else{
            setCartText('ITEM ADDED TO CART')
            toSetPopup(true)

        }



    }

    const { id, title, price, reviews, category, name, rating, image_url } = eachData
    return <div className='each-container'>
        <Link className="link" to={`/category/${category}/${id}`} >

            <div className='image-container'>
                <img src={image_url} className='product-image' />
            </div>
            <div className='data-container'>
                <p className="name">{name}</p>
                <p className="title">{title}</p>
                <div className='rating-reviews-container'>

                    <p className="rating-p"><AiFillStar className="star" /> &nbsp; {rating}&nbsp;</p>
                    <p> &nbsp; | &nbsp; </p>
                    <p className="reviews-p"><span> <BsFillPatchCheckFill className="check" /> </span> &nbsp;   {reviews} Reviews</p>

                </div>
                <p className="price"> <BiRupee /> {price}.00</p>

            </div>
        </Link>
        <Button onClick={onClickBtn} className="cart-btn">ADD TO CART</Button>
        <Modal className="popup" show={toShowPopup}>
            
            <Modal.Body>{cartText}</Modal.Body>
        <Button className="ok-btn" onClick={() => toSetPopup(false)}>OK</Button>
        </Modal>

       




    </div>
}

export default EachItem