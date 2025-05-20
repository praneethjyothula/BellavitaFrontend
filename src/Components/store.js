
import {createStore} from 'redux'


const initialValue = {
    username:''
}


function accountReducer(state = initialValue,action){

    //return [...state,action.payload]

    return {...state,username:action.payload}
    



}

const store = createStore(accountReducer)
export default store