import { BiLogIn } from "react-icons/bi"; 
import './Register.css'

import BgVideo from '../Images/BgVideo.mp4'

import LogoImage from '../Images/BellavitaLogo.png'

import {v4 as uuidv4} from 'uuid'

import { Link,Navigate,replace,useNavigate } from 'react-router-dom'
import  axios from 'axios'

import Cookies from 'js-cookie'

import { useState } from 'react'



function Register() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState('___ ')

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')

    const [toShowPopup,toSetPopup] = useState(false)

   




    const toGetApiData = async () =>{

      

        const data = {
            id:uuidv4(),
            name:name,
            username:username,
            password:password,
            email:email
        }
        let options = {
            body:data

        }

        const mainResult = await axios.post('http://localhost:4000/register',options)
       
        const result = mainResult.data

        if(result === 'USER REGISTERED SUCCESSFULLY'){

            toSetPopup(true)
             localStorage.setItem('name',name)

        }else{
            setErrorMsg(result)
        }

        
    }

    const toSetValues = () =>{
        if(username === ''|| password === '' || name === '' || email === ''){
            setErrorMsg('FILL REQUIRED DETAILS')
           

        }else if (password !== '' && password.length < 8){

            setErrorMsg('PASSWORD MUST BE 8 LETTERS')

        }
        
        else{
            toGetApiData()

        }
    }


    const onClickBtn  = (event) =>{

        event.preventDefault()
        toSetValues()

    }

    const onClickLastBtn = () =>{
        navigate('/login',{replace:true})
    }


    const mainCookies =  Cookies.get('jwtToken')

    return mainCookies !== undefined ? <Navigate to='/'/>:

     <div className='registration-container'>

        <video className='register-video' autoPlay loop muted >
            <source src={BgVideo} type="video/mp4" />
        </video>
        <div className='register-nav'>

            <div className='registration-logo-container'>
                <img src={LogoImage} className="logo-image" />
                <Link to='/login'>
                <BiLogIn className="login-logo" />
                </Link>


            </div>
        </div>
        <div className='registration-content-container'>

            

            { toShowPopup ? <div className="popup-container">

                <div className="main-popup-container">

                <h1 className="successs-msg">User Registered Successfully</h1>
               <button onClick={onClickLastBtn} className="success-btn">Login Page</button> 
                </div>


            </div> : <div className='form-container register-form-container'>


<div className='form-logo-container'>
    <img src={LogoImage} className='form-logo' />
    <h1 className='login-h1'>Get Started Now</h1>
</div>
<form>
    <p>Enter Name</p>
    <input placeholder="Enter name" onChange={(event) => setName(event.target.value)} value={name} id='text' type='text' />
    <p>Enter Username</p>
    <input placeholder="Enter Username" onChange={(event) => setUsername(event.target.value)} value={username} id='text' type='text' />
    <p>Enter Password</p>
    <input placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)} value={password} type='password' />
    <p>Enter Email</p>
    <input placeholder="Enter Email" onChange={(event) => setEmail(event.target.value) } value={email} type='text' />
    <p id='password-error-msg'>{errorMsg}</p>
    <button onClick={onClickBtn} className='btn  login-btn'>Sign Up</button>
    {/* <Link className='register-link' to='/login'>
        <p className='register-text'>Login</p>
    </Link> */}
</form>




</div>}

        </div>
    </div>
}

export default Register