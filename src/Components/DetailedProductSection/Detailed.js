import { AiOutlineSearch } from "react-icons/ai"; 
import './Detailed.css'

import { useParams } from 'react-router-dom'
import Header from '../Header/Header'

import { useSelector } from "react-redux";
import EachItem from '../EachItem/EachItem'

import { useState } from 'react'
import { useEffect } from 'react'


import axios from 'axios'

function Detailed(){

    const {category} = useParams()

    const [detailedData,setDetailedData] = useState([])

    const [selectValue,setSelectValue] = useState('ASC')


    const [searchInput,setSearchInput] = useState('')

    useEffect(() =>{
        toGetDEtailedData()
    },[category,selectValue])


    const data = useSelector((state) =>{
        return state
    })


    

    

    const toGetDEtailedData = async () =>{
        const url = `http://localhost:4000/category/${category}?order=${selectValue}`

        const result = await axios.get(url)

        setDetailedData(result.data)
    }

    const modifiedData = detailedData.filter((each) =>{


        return each.title.toLowerCase().includes(searchInput.toLocaleLowerCase())

        
    })




    

    return <div className='detailed-section-container'>
        <nav className='detailed-nav'>

        <Header className='detailed-section-header'/>
        </nav>

            <div className='detailed-heading-container'>
                <h1 className='detailed-heading'>{category.toLocaleUpperCase()} SECTION</h1>
            </div>
        <div className='detailed-content-container'>

            <div className='filter-container'>
                <div className="search-container">


                <AiOutlineSearch className="search" />
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder={`Search ${category}s`} type='search'/>
                </div>
                <div className="select-container">
                    <p className="filter-p">FILTER</p>

                <select onChange={(event) => setSelectValue(event.target.value)} >
                    <option disabled selected value=''>SORT BY</option>
                    <option value='DESC'>PRICE HIGH TO LOW</option>
                    <option value='ASC'>PRICE LOW TO HIGH</option>
                </select>
                </div>
            </div>
            <div className="main-detail-container">

            
            <div className='detailed-product-container'>
                {
                    modifiedData.map((eachData) =>{
                        return <EachItem eachData={eachData}/>

                    })
                }

            </div>
            </div>


        </div>


    </div>
}

export default Detailed