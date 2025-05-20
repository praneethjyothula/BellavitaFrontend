import { AiFillCheckCircle } from "react-icons/ai"; 
 
import { AiFillCaretDown } from "react-icons/ai"; 

import './Home.css'


import { useSelector } from "react-redux";

import { useState, useEffect } from 'react'



import Header from '../Header/Header'


import {Link} from 'react-router-dom'

import axios from 'axios'

import LandingImage from '../Images/BellavitaLanding.png'


import EachItem from "../EachItem/EachItem";

import Logo from '../Images/BellavitaLogo.png'


import Footer from "../Footer/Footer";

function Home() {

    

    const [apiData,toGetData] = useState([])

    const [arrivalData,setArrivalData] = useState([])


    const [categoryData,setCategory] = useState([])

    useEffect(() => {
        toGetApiData()
    }, [])



   
    
    const toGetApiData = async () =>{
        const url = 'http://localhost:4000/toGetData'
        const result = await axios.get(url)
        toGetData([result.data])
        setArrivalData([result.data[7],result.data[17],result.data[27],result.data[37]])

        setCategory([result.data[3],result.data[14],result.data[23],result.data[34]])
    }



   
    return <div className="main-home-container">



     <div className='home-container'>
        <Header />
     

        <div className='content-container'>
            <div className='landing-container'>
              

            <div className='first-image-container'>
                <img src={LandingImage} className='landing-image'/>

            </div>
            <div className="scroll-container">
                <p className="scroll-down">Scroll Down <span><AiFillCaretDown className="down" /></span> </p>
                

            </div>


            </div>

        </div>

    </div>
    <div className="new-arrival-container">
                <h1 className="new-arrival-heading">NEW ARRIVALS</h1>

                <ul className="arrival-items-ul">
                    {arrivalData.map((eachData) =>{
                        return <EachItem eachData={eachData}/>
                    })}
                </ul>
               

    </div>
    <div className="why-choose-us">
        <div className="choose-image-container"><img className="contact-img" src="https://bellavitaorganic.com/cdn/shop/files/download_5bea8eae-fa1f-45d3-95bc-81ced6860f9d.jpg?v=1732892381&width=500" /></div>
        <div className="choose-text-container">
            <h1 className="choose-heading">Why Choose Us</h1>
            <p className="choose-p">Lorem ipsum dolor sit amet consectetur. Scelerisque amet cursus eget amet sit ut. In imperdiet suspendisse adipiscing eu purus. Eget nisl cursus quis nibh. Sed sit amet facilisi viverra.</p>
            <ul className="details-ul">
                <li><AiFillCheckCircle className="home-check" /> <p className="detail-p">Unique Variants</p></li>
                <li><AiFillCheckCircle className="home-check" /> <p className="detail-p">Fast Delivery</p></li>
                <li><AiFillCheckCircle className="home-check" /> <p className="detail-p">Excellent Service</p></li>
            </ul>
        </div>
    </div>

    <div className="category-container">
        <h1 className="category-heading">LUXURY CATEGORIES</h1>

        <ul className="category-ul">
            {
                categoryData.map((data) =>{

                    return <Link className="Link" to={`/category/${data.category}`}>
                    <li className="category-li">
                        <img className="category-image" src={data.image_url}/>
                        <h1 className="category-text">{data.category}</h1>
                    </li>
                    </Link> 

                })
            }

        </ul>

    </div>

    <div className="multi-image-container">
        <img src='https://bellavitaorganic.com/cdn/shop/files/1_e3a8356d-1e07-4f9e-b006-463aee598ee0.webp?v=1725617784&width=400'/>
        <img src='https://bellavitaorganic.com/cdn/shop/files/2_2453e5e3-fecb-46e3-ad9e-00bea4baa4622.webp?v=1725617784&width=400'/>
        <img src='https://bellavitaorganic.com/cdn/shop/files/4_68a3c022-75df-4304-8d47-6a1671886316.webp?v=1725617784&width=400'/>
        <img src='https://bellavitaorganic.com/cdn/shop/files/3_1_49a17cdc-b7a0-4ae1-a20d-5c3d8eee7bc1.webp?v=1725617816&width=400'/>
        <img src='https://bellavitaorganic.com/cdn/shop/files/5_b43e7ec7-8e4b-464f-b5a4-78854aa116d82.webp?v=1725617784&width=400'/>
    </div>

    <Footer/>
    </div>
}

export default Home