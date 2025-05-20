import Cookie from 'js-cookie'

import { Outlet,Navigate } from 'react-router-dom'


function ProtectedRoute(props){

    let cookieData = Cookie.get('jwtToken')

    
    return cookieData !== undefined ? <Outlet/> : <Navigate to='/login' />
}

export default ProtectedRoute