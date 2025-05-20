import { BiLogOutCircle } from "react-icons/bi"; 
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
import { BiShoppingBag } from "react-icons/bi";

import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cookies from 'js-cookie'
import Logo from '../Images/BellavitaLogo.png'
import './Header.css'
import { Link, useNavigate,Navigate } from "react-router-dom";



function Header() {


    const navigate = useNavigate()

    

    const [showMenu, toSetMenu] = useState(false)





    const onclickMenu = () => {

        toSetMenu(!showMenu)

    }

    const toLogout = () =>{
        Cookies.remove('jwtToken')
        navigate(0)
       
        
    }


    return  <nav className='header-nav'>
        <div className='logo-container'>
            <span className="logout-span" onClick={toLogout} ><BiLogOutCircle className="logout-logo" />Logout</span>
            <Link to={'/'}>
                <img src={Logo} className='main-header-logo' />
            </Link>

            <Link className="cart-link" to={'/cart'}><BiShoppingBag className="cart-image" /> Cart</Link>



            <AiOutlineMenuUnfold onClick={onclickMenu} className="menu" />


        </div>
        <ul className='header-ul-class'>

            <Link className="link" to={'/category/perfume'}><li>PERFUMES</li></Link>
            <Link className="link" to={'/category/Bath&Body'}><li>BATH & BODY</li></Link>
            <Link className="link" to={'/category/cosmetics'}><li>COSMETICS</li></Link>
            <Link className="link" to={'/category/skincare'}><li>SKIN CARE</li></Link>

        </ul>

<div className="small-ul-container">
        {showMenu ? <ul className='small-header-ul-class'>

            <Link className="link" to={'/category/perfume'}><li>PERFUMES</li></Link>
            <Link className="link" to={'/category/Bath&Body'}><li>BATH & BODY</li></Link>
            <Link className="link" to={'/category/cosmetics'}><li>COSMETICS</li></Link>
            <Link className="link" to={'/category/skincare'}><li>SKIN CARE</li></Link>
            <Link className="link" to={'/cart'}><li>CART</li></Link>
            <p onClick={toLogout} className="logout-small-logo" ><BiLogOutCircle  /></p>

        </ul> : ''}

</div>

    </nav>
}


export default Header