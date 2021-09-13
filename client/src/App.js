/* eslint-disable no-unused-vars */
import React from 'react'
import Register from './Screens/Register.js';
import Homepage from './Screens/Homepage.js';
import Test from './Screens/Test.js'
import AdminRegister from "./Screens/AdminRegister.js";
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


const App = () => {


  return (

<BrowserRouter>
    <Switch>
      <Route path="/" component={Register} exact/>
      <Route path="/homepage" component={Test}/> 
      <Route path="/admin" component={AdminRegister}/> 
    </Switch>
    <ToastContainer/>
</BrowserRouter>

  )
}

export default App
