import { AiOutlineFileUnknown } from "react-icons/ai"; 
import './NotFound.css'

import Header from "../Header/Header"

function NotFound(){
    return <div className="not-found-container">
        <nav className="not-found-header">
            <Header/>
        </nav>
        <div className="not-found">

            <AiOutlineFileUnknown className="not-logo" />

            <h1 className="not-h1">NOT FOUND</h1>

        </div>
    </div>
}

export default NotFound