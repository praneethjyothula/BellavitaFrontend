import './Login.css'
import { CgProfile } from "react-icons/cg";
import BgVideo from '../Images/BgVideo.mp4'

import { useState, useEffect } from 'react';

// import BgImage from '../Images/BgImage.png'

import Cookies from 'js-cookie'



import { Link,useNavigate,Navigate } from 'react-router-dom'
import axios from 'axios'

import LogoImage from '../Images/BellavitaLogo.png'

function Login() {

    const navigate = useNavigate()


    const [errorMsg, setErrorMsg] = useState('___')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    


    const toGetApiData = async () => {

        const data = {
             username,
             password
        }


        let options = {
            body: data
        };

        const getResult = await axios.post('http://localhost:4000/login', options)

        const mainData = await getResult.data

        
        if(mainData.jwtToken === undefined){

            setErrorMsg(mainData)
        }else{
           await Cookies.set('jwtToken', mainData.jwtToken, { expires: 30 })
            navigate('/',{replace:true})
           
            
        }

    }

    const toSetData = () => {

        if (username === '' || password === '') {
            setErrorMsg('ENTER USERNAME AND PASSWORD ')

        } else {

            toGetApiData()

        }

    }

    const onClickSubmitBtn = (event) => {
        event.preventDefault()
        toSetData()

    }

    const MainCookie = Cookies.get('jwtToken')

   return MainCookie !== undefined ?

        <Navigate to='/' /> :

    

    <div className='login-container'>
        <video autoPlay loop muted >
            <source src={BgVideo} type="video/mp4" />
        </video>

        <div className='header-container'>
            <nav className='login-nav'>

                <div className='logo-container'>
                    <img src={LogoImage} className="logo-image" />

                </div>
                
            </nav>

        </div>
        <div className='login-content-container'>

            <div className='form-container'>
                <div className='form-logo-container'>
                    <img src={LogoImage} className='form-logo' />
                    <h1 className='login-h1'>Welcome back!</h1>
                    <h2 className='login-secondary-text'>Enter your Credentials to access your account</h2>
                </div>
                <form>
                    <p>Enter Username</p>
                    <input placeholder='Enter Your Username' onChange={(event) => setUsername(event.target.value)} value={username} id='text' type='text' />
                    <p>Enter Password</p>
                    <input placeholder='Enter Your Password' onChange={(event) => setPassword(event.target.value)} value={password} type='password' />
                    <p id='password-error-msg'>{errorMsg}</p>
                    <button onClick={onClickSubmitBtn} className='btn  login-btn'>Sign In</button>
                   
                   <p className='register-text'>Don't Have Account  <Link className='register-link' to='/Register'><span className='main-register-link'>Sign Up</span></Link></p>
                    
                </form>


            </div>

            
        </div>


    </div>
}

export default Login