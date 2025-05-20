import logo from './logo.svg';
import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

import EachProduct from './Components/EachProductItem/EachProductItem';

import Login from './Components/Login/Login';

import Register from './Components/Register/Register';

import Home from './Components/Home/Home';

import NotFound from './Components/NotFound';

import store from './Components/store';
import Detailed from './Components/DetailedProductSection/Detailed';


import Cart from './Components/Cart/Cart';

import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/category/:category' element={<Detailed/>}/>
        <Route path ='/category/:category/:id' element={<EachProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
        
      </Routes>
      
      </BrowserRouter>
      
      
    </div>
    </Provider>
  );
}

export default App;
